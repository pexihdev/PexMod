import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set body parser limits for base64 image uploads
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));

  // In-memory store for pending authentication sessions
  // Map key: phone_number -> { client: TelegramClient, phoneCodeHash: string, apiId: number, apiHash: string }
  const pendingSessions = new Map<string, {
    client: TelegramClient;
    phoneCodeHash: string;
    apiId: number;
    apiHash: string;
  }>();

  // API Route: Request OTP Code
  app.post("/api/telegram/send-code", async (req, res) => {
    try {
      const { apiId, apiHash, phone } = req.body;

      if (!apiId || !apiHash || !phone) {
         res.status(400).json({ error: "apiId, apiHash, and phone are required." });
         return;
      }

      const numApiId = parseInt(apiId, 10);
      if (isNaN(numApiId)) {
         res.status(400).json({ error: "apiId must be a number." });
         return;
      }

      const stringSession = new StringSession("");
      const client = new TelegramClient(stringSession, numApiId, apiHash, {
        connectionRetries: 3,
        useWSS: false,
      });

      await client.connect();

      const result = await client.sendCode(
        {
          apiId: numApiId,
          apiHash: apiHash,
        },
        phone
      );

      // Store client and phoneCodeHash for the next step (signing in)
      pendingSessions.set(phone, {
        client,
        phoneCodeHash: result.phoneCodeHash,
        apiId: numApiId,
        apiHash,
      });

       res.json({ success: true, message: "Verification code sent successfully." });
    } catch (err: any) {
      console.error("Error in send-code:", err);
       res.status(500).json({ error: err.message || "Failed to send verification code." });
    }
  });

  // API Route: Verify OTP and Sign-In
  app.post("/api/telegram/sign-in", async (req, res) => {
    try {
      const { phone, code, password } = req.body;

      if (!phone || !code) {
         res.status(400).json({ error: "phone and code are required." });
         return;
      }

      const pending = pendingSessions.get(phone);
      if (!pending) {
         res.status(400).json({ error: "No active session found for this phone number. Please request code again." });
         return;
      }

      const { client, phoneCodeHash, apiId, apiHash } = pending;

      try {
        await client.signIn({
          phoneNumber: phone,
          phoneCodeHash: phoneCodeHash,
          phoneCode: code,
          onError: (err) => {
            throw err;
          }
        });
      } catch (signInErr: any) {
        // Handle 2FA passwords if needed
        if (signInErr.message?.includes("SESSION_PASSWORD_NEEDED") && password) {
          await client.signIn({
            phoneNumber: phone,
            phoneCodeHash: phoneCodeHash,
            phoneCode: code,
            password: async () => password,
          });
        } else {
          throw signInErr;
        }
      }

      const sessionString = client.session.save();
      pendingSessions.delete(phone);

      // Clean disconnect since we are going to use session string from now on
      await client.disconnect();

       res.json({
        success: true,
        sessionString,
        apiId,
        apiHash,
        message: "Successfully authenticated with Telegram MTProto!",
      });
    } catch (err: any) {
      console.error("Error in sign-in:", err);
       res.status(500).json({ error: err.message || "Authentication failed." });
    }
  });

  // API Route: Upload Image to Telegram Channel using session string
  app.post("/api/telegram/upload", async (req, res) => {
    let client: TelegramClient | null = null;
    try {
      const { sessionString, apiId, apiHash, channel, fileBase64, fileName, caption } = req.body;

      if (!sessionString || !apiId || !apiHash || !channel || !fileBase64) {
         res.status(400).json({ error: "Missing required parameters: sessionString, apiId, apiHash, channel, fileBase64" });
         return;
      }

      const numApiId = parseInt(apiId, 10);
      const stringSession = new StringSession(sessionString);
      client = new TelegramClient(stringSession, numApiId, apiHash, {
        connectionRetries: 3,
      });

      await client.connect();

      // Check if authorized
      const authorized = await client.checkAuthorization();
      if (!authorized) {
         res.status(401).json({ error: "Invalid or expired session. Please log in again." });
         return;
      }

      // Convert base64 to Buffer
      const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Set custom filename/attributes in GramJS
      // In GramJS we can pass raw buffer as a file with name inside Api.InputFile
      // Or we can construct a simple custom file wrapper
      const fileAttr = {
        file: buffer,
        name: fileName || "image.png",
      };

      // Upload file
      const result = await client.sendFile(channel, {
        file: fileAttr.file,
        caption: caption || "Uploaded via PaperMod Web Hub",
        workers: 1,
      });

      // Formulate the direct Telegram link if possible
      // Public channels: username is like '@my_channel_username' or channel_username
      // GramJS client.sendFile returns Message object
      let messageId = 0;
      let peerIdStr = "";
      if (result && typeof result === "object") {
        messageId = (result as any).id || 0;
        const peer = (result as any).peerId;
        if (peer) {
          peerIdStr = peer.channelId ? peer.channelId.toString() : (peer.userId ? peer.userId.toString() : "");
        }
      }

      let directLink = "";
      const cleanedChannel = channel.replace("@", "");
      // If channel is alphanumeric, it is likely a public channel username
      const isUsername = /^[a-zA-Z0-9_]+$/.test(cleanedChannel);

      if (isUsername) {
        directLink = `https://t.me/${cleanedChannel}/${messageId}`;
      } else {
        // Private channels or numerical IDs
        directLink = `tg://privatepost?channel=${cleanedChannel}&post=${messageId}`;
      }

       res.json({
        success: true,
        messageId,
        directLink,
        message: "Successfully uploaded photo to Telegram!",
      });
    } catch (err: any) {
      console.error("Error in upload:", err);
       res.status(500).json({ error: err.message || "Failed to upload photo to Telegram." });
    } finally {
      if (client) {
        try {
          await client.disconnect();
        } catch (e) {}
      }
    }
  });

  // API Route: Test if existing session is working
  app.post("/api/telegram/test-session", async (req, res) => {
    let client: TelegramClient | null = null;
    try {
      const { sessionString, apiId, apiHash } = req.body;
      if (!sessionString || !apiId || !apiHash) {
         res.status(400).json({ error: "Missing parameters" });
         return;
      }

      const numApiId = parseInt(apiId, 10);
      client = new TelegramClient(new StringSession(sessionString), numApiId, apiHash, {
        connectionRetries: 2,
      });

      await client.connect();
      const authorized = await client.checkAuthorization();

       res.json({ success: true, authorized });
    } catch (err: any) {
       res.json({ success: false, error: err.message });
    } finally {
      if (client) {
        try {
          await client.disconnect();
        } catch (e) {}
      }
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
