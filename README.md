# PexMod Web

<div align="center">

**A Hyper-Minimalist Blog, Portfolio, and Telegram MTProto Media storage client.**  
*Inspired by the clean aesthetics of Hugo PaperMod. Built with React, Vite, and Tailwind CSS.*

[![Repository](https://img.shields.io/badge/github-pexihdev%2FPexMod-181717?style=flat-get&logo=github)](https://github.com/pexihdev/PexMod)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=flat&logo=vite)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

---

### [English](#-english) | [Bahasa Indonesia](#-bahasa-indonesia) | [Español](#-español)

---

</div>

---

## 🇺🇸 English

### 🌟 Introduction
**PexMod Web** is a clean, hyper-minimalist, and high-performance blog, portfolio, and Telegram MTProto media storage client. It prioritizes pure content, exquisite typography, and spacious negative space, fully preventing unnecessary UI distractions ("AI Slop" or visual clutter). 

It features instant client-side rendering as a single-page application (SPA) with automatic local state persistence, ensuring a frictionless user experience.

### 🚀 Key Features
*   **Reading Progress Bar**: A sleek, ultra-thin `2px` horizontal progress bar at the top of the viewport tracking your scroll position in real-time.
*   **Smart Search Highlight**: Typing search queries automatically highlights matched words with a beautiful, soft faded background (`rgba(234, 179, 8, 0.22)`) inside the article description summaries.
*   **Estimated Reading Time**: Accurately calculates reading time (e.g., `3 min read`) based on word count, styled with a clean `JetBrains Mono` monospace typography.
*   **Minimalist Multilingual Engine**: Built-in support for **Indonesian (`id`)** [Default], **English (`en`)**, and **Spanish (`es`)**, selectable via a tiny, elegant pill selector (`ID | EN | ES`).
*   **Telegram Media Hub Integration**: A custom UI designed to let users explore, search, filter, and share media securely and responsively.
*   **Offline-First & Local Storage Persistence**: Saves reading history, language options, theme modes, and custom data securely inside your browser's local storage.
*   **Pure Aesthetic Integrity**: Clean solid backgrounds (`#1d1e20` for dark, `#ffffff` for light), fine borders (`1px solid var(--border)`), and zero unsolicited telemetry metrics.

---

### 📦 Installation & Getting Started

#### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   NPM, Yarn, or [Bun](https://bun.sh/)

#### 1. Clone the Repository
```bash
git clone https://github.com/pexihdev/PexMod.git
cd PexMod
```

#### 2. Install Dependencies
```bash
npm install
# or using Bun:
bun install
```

#### 3. Run the Development Server
```bash
npm run dev
# or using Bun:
bun dev
```
Open your browser at the local port provided in your terminal (usually `http://localhost:3000`).

#### 4. Build for Production
```bash
npm run build
# or using Bun:
bun build
```
This will compile and output optimized, static assets in the `dist/` directory, ready to be hosted on any static hosting provider.

---

### 🔧 Configuration & Customization

#### 1. Adding a Blog Post
All posts are stored in `/src/data/posts.js`. To add a new post, simply append a new object to the `posts` array:
```javascript
{
  id: "my-first-awesome-post",
  title: "My First Awesome Post",
  description: "A short and sweet description of your post which appears in search results and the main homepage.",
  content: `## Markdown Heading
This is the main markdown content of your blog post.`,
  date: "2026-07-15",
  formattedDate: "July 15, 2026",
  author: "Your Name",
  tags: ["Tech", "Minimalism"],
  lang: "en" // 'en' | 'id' | 'es'
}
```

#### 2. Theme & Custom Styles
Tailwind CSS styles and CSS variables are configured inside `/src/index.css`. You can change layout widths, margins, or background color tokens directly:
```css
:root {
  --main-width: 780px;      /* Maximum container width for readable content */
  --nav-width: 1024px;      /* Maximum navbar container width */
  --theme: rgb(255, 255, 255); /* Light theme background */
  --primary: rgb(30, 30, 30);  /* Light theme primary text */
}

.dark {
  --theme: rgb(29, 30, 32);    /* Dark theme background */
  --primary: rgb(218, 218, 219); /* Dark theme primary text */
}
```

---

## 🇮🇩 Bahasa Indonesia

### 🌟 Pendahuluan
**PexMod Web** adalah template blog, portofolio, dan media penyimpanan Telegram MTProto yang bersih, hiper-minimalis, dan berkinerja tinggi. Template ini mengutamakan konten murni, tipografi indah, serta ruang kosong (*negative space*) yang lega, guna menghindari distraksi visual atau tumpukan fitur tidak perlu (*AI Slop*).

Dibuat sebagai Single Page Application (SPA) berbasis React dengan persistensi status lokal otomatis untuk kenyamanan maksimal pengguna.

### 🚀 Fitur Utama
*   **Reading Progress Bar**: Garis horizontal super tipis `2px` di bagian paling atas layar yang bergerak mengikuti posisi gulir halaman pembaca secara real-time.
*   **Pencarian Pintar dengan Sorotan Dinamis**: Setiap kata kunci pencarian yang diketik pembaca akan otomatis disorot dengan warna latar belakang lembut (`rgba(234, 179, 8, 0.22)`) di bagian ringkasan deskripsi artikel pada hasil pencarian.
*   **Estimasi Waktu Membaca**: Otomatis menghitung estimasi durasi membaca (misal: `3 mnt membaca`) berdasarkan jumlah kata artikel, ditampilkan dengan tipografi monospace `JetBrains Mono`.
*   **Mesin Multibahasa Minimalis**: Dukungan bawaan untuk **Bahasa Indonesia (`id`)** [Bawaan], **Bahasa Inggris (`en`)**, dan **Bahasa Spanyol (`es`)** lewat pengalih minimalis (`ID | EN | ES`).
*   **Media Hub Telegram**: Antarmuka responsif untuk mencari, memfilter, dan membagikan koleksi media secara instan dan aman.
*   **Persistensi Lokal (localStorage)**: Riwayat membaca, opsi bahasa, mode tema gelap/terang, dan data kustom tersimpan aman di browser pengguna.
*   **Integritas Desain Murni**: Warna solid (`#1d1e20` untuk gelap, `#ffffff` untuk terang), garis pembatas ultra-tipis, serta tanpa adanya metrik telemetri palsu yang mengganggu estetika.

---

### 📦 Panduan Instalasi & Penggunaan

#### Persyaratan Sistem
*   [Node.js](https://nodejs.org/) (versi 18 ke atas)
*   NPM, Yarn, atau [Bun](https://bun.sh/)

#### 1. Kloning Repositori
```bash
git clone https://github.com/pexihdev/PexMod.git
cd PexMod
```

#### 2. Instal Dependensi
```bash
npm install
# atau menggunakan Bun:
bun install
```

#### 3. Jalankan Server Pengembangan
```bash
npm run dev
# atau menggunakan Bun:
bun dev
```
Buka peramban (browser) Anda dan akses alamat lokal yang tertera (biasanya `http://localhost:3000`).

#### 4. Paketkan untuk Produksi
```bash
npm run build
# atau menggunakan Bun:
bun build
```
Perintah ini akan menyusun file statis yang telah dioptimalkan secara penuh ke dalam direktori `dist/`.

---

### 🔧 Kustomisasi Konten & Layout

#### 1. Menambahkan Artikel Baru
Seluruh data artikel disimpan dalam file `/src/data/posts.js`. Anda cukup menambahkan objek baru ke dalam array `posts`:
```javascript
{
  id: "artikel-pertama-saya",
  title: "Artikel Pertama Saya",
  description: "Ringkasan pendek tulisan Anda yang akan ditampilkan di halaman utama dan hasil pencarian.",
  content: `## Judul Bagian
Tulis isi tulisan Anda di sini menggunakan format markdown.`,
  date: "2026-07-15",
  formattedDate: "15 Juli 2026",
  author: "Nama Anda",
  tags: ["Teknologi", "Minimalis"],
  lang: "id" // 'id' | 'en' | 'es'
}
```

---

## 🇪🇸 Español

### 🌟 Introducción
**PexMod Web** es un cliente de blog, portafolio y almacenamiento de medios de Telegram MTProto limpio, hiperminimalista y de alto rendimiento. Prioriza el contenido puro, una tipografía exquisita y un espacio negativo espacioso, evitando por completo las distracciones visuales innecesarias ("AI Slop" o desorden visual).

Ofrece renderizado instantáneo en el cliente como una aplicación de página única (SPA) con persistencia de estado local automática para brindar una experiencia de usuario perfecta.

### 🚀 Características Clave
*   **Barra de Progreso de Lectura**: Una barra horizontal ultra delgada de `2px` en la parte superior del navegador que rastrea la posición de desplazamiento del usuario en tiempo real.
*   **Búsqueda Inteligente con Resaltado Dinámico**: Al escribir palabras clave en el buscador, estas se resaltan automáticamente con un fondo suave (`rgba(234, 179, 8, 0.22)`) en el resumen de la descripción del artículo en los resultados.
*   **Tiempo Estimado de Lectura**: Calcula automáticamente el tiempo de lectura (ej. `3 min de lectura`) según la cantidad de palabras del artículo, con tipografía mono `JetBrains Mono`.
*   **Soporte Multilingüe Minimalista**: Soporte integrado para **Indonesio (`id`)** [Predeterminado], **Inglés (`en`)** y **Español (`es`)**, seleccionable a través de un elegante selector (`ID | EN | ES`).
*   **Integración de Centro de Medios de Telegram**: Interfaz limpia diseñada para explorar, buscar, filtrar y compartir recursos de medios de forma receptiva y segura.
*   **Persistencia Local**: Guarda el historial de lectura, idioma, tema oscuro/claro y datos personalizados de forma segura en el almacenamiento local del navegador.
*   **Estética Pura e Íntegra**: Fondos sólidos y limpios (`#1d1e20` para oscuro, `#ffffff` para claro), bordes finos de `1px` y sin telemetrías innecesarias de estado.

---

### 📦 Instalación y Uso Rápido

#### Requisitos Previos
*   [Node.js](https://nodejs.org/) (v18 o superior)
*   NPM, Yarn o [Bun](https://bun.sh/)

#### 1. Clonar el Repositorio
```bash
git clone https://github.com/pexihdev/PexMod.git
cd PexMod
```

#### 2. Instalar Dependencias
```bash
npm install
# o con Bun:
bun install
```

#### 3. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
# o con Bun:
bun dev
```
Abra su navegador en la dirección local provista por la consola (usualmente `http://localhost:3000`).

#### 4. Compilar para Producción
```bash
npm run build
# o con Bun:
bun build
```
Esto creará archivos estáticos optimizados en el directorio `dist/` listos para ser desplegados en cualquier servidor de hosting estático.

---

### 🔧 Personalización de Contenido

#### 1. Agregar un Artículo
Todos los artículos se almacenan en `/src/data/posts.js`. Para agregar uno nuevo, añada un objeto al arreglo `posts`:
```javascript
{
  id: "mi-primer-articulo",
  title: "Mi Primer Artículo Genial",
  description: "Una descripción breve que aparecerá en los resultados de búsqueda y en la página de inicio.",
  content: `## Título en Markdown
Escriba el cuerpo del artículo aquí en formato Markdown.`,
  date: "2026-07-15",
  formattedDate: "15 de julio de 2026",
  author: "Su Nombre",
  tags: ["Tecnología", "Minimalismo"],
  lang: "es" // 'es' | 'id' | 'en'
}
```

---

## 🚀 Deployment (All Languages / Todos los idiomas)

Since **PexMod Web** compiles into pure static HTML/JS/CSS assets (`dist/`), you can host it for free on any platform:

| Platform | Build Command | Publish Directory |
| :--- | :--- | :--- |
| **Vercel** | `npm run build` | `dist` |
| **Netlify** | `npm run build` | `dist` |
| **Cloudflare Pages** | `npm run build` | `dist` |
| **GitHub Pages** | `npm run build` | `dist` |

---

## 📄 License / Lisensi / Licencia
Distributed under the **MIT License**. Feel free to use, modify, and distribute for personal or commercial projects.

*Crafted with absolute dedication to performance, minimal aesthetics, and flawless reading experiences.*
