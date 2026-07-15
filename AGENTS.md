# PexMod Web Developer & Agent Guidelines

PexMod Web is a clean, hyper-minimalist, high-performance blog, portfolio, and Telegram MTProto media storage client. To keep the site looking highly professional, distinct, and polished, all future agents and developers must strictly adhere to the guidelines below.

---

## 🎨 Core Design Philosophies (Anti-AI Slop)

1. **Strict Minimalism & Negative Space**
   - No gratuitous cards inside cards, heavy gradients, glow effects, or deep 3D shadows.
   - Use clean, solid backgrounds (`#1d1e20` for dark mode, `#f5f5f5` or `#ffffff` for light mode).
   - Keep borders extremely subtle (`1px solid var(--border)`).
   - Ensure spacious, organic margins and line-heights. Let text breathe.

2. **No Technical Larping or UI Clutter**
   - **DO NOT** add unsolicited system metrics, uptime dots, active state pills, mock log terminals, fake statistics, or visual noise.
   - Keep status labels simple and natural. For example, show "Connected" or "Disconnected", never "SYSTEM_NODE_ONLINE: 100%".
   - The card elements should look like a classic Hugo theme (PaperMod), focusing on pure content and typography.

3. **Typography-First Priority**
   - Primary heading font must be clean, letter-spaced displays.
   - Reading/body text should use clean system sans-serif or carefully paired fonts with generous line height (`line-height: 1.6` or `1.8`) to guarantee maximum readability.
   - Suffixes and technical metadata (like date, reading time) must use a subtle mono font like `JetBrains Mono` or equivalent system monospace, keeping sizes small (`12px` to `13px`) and gray.

---

## 📱 Sizing & Responsive Integrity

- **Desktop-First Precision, Mobile-First Code**
  - **Main Container Width**: Constrain the main area to `var(--main-width)` (default `780px`) or `--nav-width` (`1024px`). Never let text lines expand infinitely on wide screens, as this breaks readability.
  - **Mobile Padding & Touch Targets**: On screens narrower than `sm` (768px), reduce margins and paddings dynamically (`padding: 0 var(--gap)` where `--gap` is responsive) to maximize readable real-estate. Touch elements (buttons, inputs, language selector switches) must have at least `44px` height or clear padding.
  - **Horizontal Wrapping**: Avoid fixed heights on flex headers or nav containers. Ensure nav links can gracefully wrap, or convert them into scrollable lines on small screens.

---

## 🌐 Localization & Multilingual Support

- **Supported Languages**: Indonesian (`id`), English (`en`), and Spanish (`es`).
- **Default Language**: Indonesian (`id`).
- Always keep all interactive strings in translation maps. Do not hardcode new UI strings; declare them in a global `translations` object or resource.
- Make the language selector a tiny, clean list of uppercase pills (`ID`, `EN`, `ES`) next to the theme toggle. Avoid bulky select dropdowns, flags, or floating widget boxes.

---

## ⚙️ Core Technical Rules

- **Theme Default**: Dark mode (`dark`) must be default on fresh sessions unless specifically customized by the user.
- **Vite & React Setup**:
  - Keep state localized, stable, and persistent. Save configuration data, custom posts, theme settings, and language preference to `localStorage`.
  - Use `lucide-react` for any icon requirements.
  - Do not introduce bloated custom libraries. Keep external dependencies light to maintain Pagespeed score at 100.
