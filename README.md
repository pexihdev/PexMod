# PexMod Web - Clean & Hyper-Minimalist Blog, Portfolio & Media Client

**PexMod Web** adalah template web modern, super cepat, dan hyper-minimalist yang dirancang untuk kebutuhan blog, portfolio, dan Telegram MTProto media storage client. Mengambil inspirasi estetika dari Hugo PaperMod yang bersih dan berfokus pada konten, template ini dibangun menggunakan **React 18**, **Vite**, dan **Tailwind CSS** untuk menghadirkan performa Single Page Application (SPA) yang luar biasa.

Template ini sangat cocok digunakan oleh developer, penulis, atau kreator konten yang menginginkan situs web berkelas tinggi tanpa polusi elemen visual atau "AI Slop" (fitur-fitur tidak perlu).

---

## 🎨 Filosofi Desain (Anti-AI Slop)

1. **Hiper-Minimalisme & Negative Space**: Mengutamakan kelegaan visual dengan latar belakang solid (`#1d1e20` untuk mode gelap, `#ffffff` untuk mode terang), garis pembatas ultra-tipis, dan menghindari gradasi warna mencolok atau bayangan 3D tebal.
2. **Fokus pada Tipografi**: Struktur teks yang rapi, rasio kontras warna tinggi yang memenuhi standar PageSpeed, serta penggunaan font monospace (`JetBrains Mono`) untuk data teknis dan metadata.
3. **Tanpa Distraksi Sistem**: Tidak ada widget indikator uptime berlebihan, status log tiruan, atau elemen hiasan yang tidak memberikan fungsi nyata.

---

## 🚀 Fitur Unggulan

*   **Garis Gulir Bacaan Super Tipis (Reading Progress Bar)**: Garis horizontal presisi berukuran 2px di bagian paling atas layar yang bergerak secara mulus mengikuti posisi gulir halaman pembaca secara real-time.
*   **Estimasi Waktu Membaca**: Teks estimasi waktu baca (misal: `3 mnt membaca`) otomatis dihitung dari jumlah kata artikel, ditampilkan dengan font `JetBrains Mono` berukuran kecil di bawah judul artikel.
*   **Pencarian Pintar dengan Sorotan Dinamis (Smart Search Highlight)**: Setiap kata kunci yang diketik pembaca pada kolom pencarian akan otomatis disorot dengan warna latar belakang pudar yang lembut (`rgba(234, 179, 8, 0.22)`) langsung pada ringkasan deskripsi artikel di hasil pencarian.
*   **Lokalisasi Multibahasa Lengkap**:
    *   Mendukung 3 bahasa: **Bahasa Indonesia (`id`)** [Bawaan/Default], **Bahasa Inggris (`en`)**, dan **Bahasa Spanyol (`es`)**.
    *   Pengalih bahasa (language switcher) minimalis berupa tombol pill teks (`ID | EN | ES`) di sebelah pengalih tema.
*   **Telegram MTProto Media Client**: Antarmuka terintegrasi yang dioptimalkan untuk menelusuri, memfilter, mencari, dan membagikan koleksi media secara responsif.
*   **Dual Tema Instan**: Mode gelap (`Dark`) sebagai setelan bawaan dengan tombol pengalih yang mulus ke mode terang (`Light`).
*   **Performa PageSpeed Maksimal**: Sangat ringan dengan dependensi minimal untuk memastikan loading instan dan skor audit performa 100.
*   **Persistensi Lokal (localStorage)**: Preferensi bahasa, tema, pencarian, dan artikel yang disimpan otomatis tersimpan dengan aman di browser pengguna.

---

## 📁 Struktur Direktori Proyek

```bash
pexmod-web/
├── public/                 # Aset statis publik (logo, favicon, dll.)
├── src/
│   ├── data/
│   │   └── posts.js        # File basis data artikel / postingan blog
│   ├── locales/
│   │   ├── id.json         # File lokalisasi Bahasa Indonesia
│   │   ├── en.json         # File lokalisasi Bahasa Inggris
│   │   └── es.json         # File lokalisasi Bahasa Spanyol
│   ├── App.jsx             # Logika utama aplikasi React, routing, dan state
│   ├── index.css           # Konfigurasi Tailwind CSS dan variabel tema global
│   └── main.jsx            # Entry point React
├── index.html              # Template HTML utama
├── package.json            # Daftar dependensi dan skrip proyek
└── vite.config.js          # Konfigurasi bundler Vite
```

---

## ⚙️ Panduan Instalasi & Penggunaan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di mesin lokal Anda atau mendeploy-nya ke server hosting statis.

### Persyaratan Sistem
Pastikan Anda sudah menginstal:
*   [Node.js](https://nodejs.org/) (versi 18 ke atas)
*   NPM (bawaan dari Node.js) atau [Bun](https://bun.sh/) / Yarn.

### 1. Kloning Repositori
```bash
git clone https://github.com/username/pexmod-web.git
cd pexmod-web
```

### 2. Instal Dependensi
```bash
npm install
# atau jika menggunakan Bun:
bun install
```

### 3. Jalankan Server Pengembangan (Development)
```bash
npm run dev
# atau jika menggunakan Bun:
bun dev
```
Buka browser Anda dan akses `http://localhost:3000` (atau port yang ditunjukkan oleh terminal Anda).

### 4. Build untuk Produksi
Gunakan perintah ini untuk memaketkan kode menjadi file statis siap pakai yang telah dioptimalkan di dalam folder `dist/`.
```bash
npm run build
# atau jika menggunakan Bun:
bun build
```

---

## 📝 Panduan Pengelolaan Konten & Kustomisasi

### A. Cara Menambahkan Posting Baru
Semua data artikel disimpan di `/src/data/posts.js`. Anda cukup menambahkan objek baru di dalam array `posts`:

```javascript
{
  id: "judul-artikel-anda",
  title: "Judul Artikel Menarik",
  description: "Ringkasan deskripsi pendek artikel Anda yang akan muncul pada daftar pencarian dan halaman utama.",
  content: `Isi lengkap artikel Anda dalam format Markdown atau HTML mentah.
  
## Subheading
Anda dapat menulis isi posting secara fleksibel menggunakan sintaks standar.`,
  date: "2026-07-15",
  formattedDate: "15 Juli 2026",
  author: "Nama Penulis",
  tags: ["Teknologi", "Web"],
  lang: "id" // Sesuaikan bahasa artikel: 'id' | 'en' | 'es'
}
```

### B. Cara Mengubah Teks Terjemahan (Localization)
Jika Anda ingin menambahkan istilah baru atau memodifikasi terjemahan yang ada, Anda dapat membuka file bahasa masing-masing di `/src/locales/`:
*   `id.json` untuk Bahasa Indonesia
*   `en.json` untuk Bahasa Inggris
*   `es.json` untuk Bahasa Spanyol

Contoh struktur dalam `/src/locales/id.json`:
```json
{
  "home": "Beranda",
  "searchPlaceholder": "Cari artikel...",
  "readTimeSuffix": "mnt membaca"
}
```

### C. Menyesuaikan Variabel Warna & Layout
Warna latar belakang, teks, batas (border), dan ukuran container utama didefinisikan menggunakan CSS Variables di `/src/index.css`. Anda dapat dengan mudah mengubah nilai ini agar sesuai dengan identitas visual Anda:

```css
:root {
  --main-width: 780px;      /* Lebar maksimum area baca artikel */
  --nav-width: 1024px;      /* Lebar maksimum bar navigasi */
  --theme: rgb(255, 255, 255); /* Latar belakang mode terang */
  --primary: rgb(30, 30, 30);  /* Warna teks primer mode terang */
}

.dark {
  --theme: rgb(29, 30, 32);    /* Latar belakang mode gelap */
  --primary: rgb(218, 218, 219); /* Warna teks primer mode gelap */
}
```

---

## 🚀 Panduan Deployment (Hosting)

Karena template ini menghasilkan keluaran berupa web statis murni (SPA), Anda bisa meng-host proyek ini secara gratis di berbagai platform populer:

### 1. Vercel
1. Hubungkan repositori GitHub Anda ke akun Vercel.
2. Tambahkan proyek baru.
3. Setel **Framework Preset** menjadi `Vite`.
4. Klik **Deploy**.

### 2. Netlify
1. Pilih **New site from Git** di Netlify dashboard.
2. Pilih repositori Anda.
3. Atur build command ke `npm run build` dan publish directory ke `dist`.
4. Klik **Deploy site**.

### 3. GitHub Pages
Anda dapat mendeploy langsung menggunakan GitHub Actions atau package `gh-pages` dengan mengatur `base` path pada `vite.config.js` jika nama repo Anda bukan root domain.

---

## 📄 Lisensi
Proyek ini didistribusikan di bawah lisensi **MIT License**. Anda bebas menyalin, memodifikasi, dan menyebarluaskannya baik untuk kepentingan pribadi maupun komersial dengan tetap menyertakan atribusi pembuat aslinya.

---

*Dibuat dengan dedikasi tinggi pada performa, estetika minimalis, dan pengalaman membaca yang sempurna.*
