export const posts = [
  {
    id: "panduan-markdown-lengkap",
    title: {
      id: "Panduan Penulisan Markdown Lengkap",
      en: "Complete Markdown Writing Guide",
      es: "Guía Completa de Escritura en Markdown"
    },
    description: {
      id: "Pelajari cara menulis konten yang indah dan terstruktur menggunakan Markdown di platform PexMod Web.",
      en: "Learn how to write beautiful and structured content using Markdown on the PexMod Web platform.",
      es: "Aprenda a escribir contenido hermoso y estructurado usando Markdown en la plataforma PexMod Web."
    },
    date: "2026-07-14",
    formattedDate: {
      id: "14 Juli 2026",
      en: "July 14, 2026",
      es: "14 de julio de 2026"
    },
    readingTime: "3 min",
    author: "PexihDev",
    tags: ["Markdown", "Guide", "PexMod"],
    content: {
      id: `Markdown adalah bahasa markup ringan dengan sintaksis format teks polos yang dirancang agar dapat dikonversi menjadi HTML terstruktur dengan mudah. Platform **PexMod Web** mendukung penuh penulisan Markdown dengan gaya visual yang sangat elegan dan responsif.

Di bawah ini adalah panduan singkat elemen-elemen Markdown yang sering digunakan:

### 1. Judul (Headings)
Gunakan simbol pagar (\`#\`) di awal baris untuk membuat judul. Jumlah pagar menentukan tingkatan judul:
- \`# Judul Utama (H1)\`
- \`## Sub-judul (H2)\`
- \`### Sub-sub-judul (H3)\`

### 2. Format Teks (Emphasis)
- **Teks Tebal (Bold):** Gunakan bintang ganda (\`**tebal**\`) atau garis bawah ganda (\`__tebal__\`).
- *Teks Miring (Italic):* Gunakan bintang tunggal (\`*miring*\`) atau garis bawah tunggal (\`_miring_\`).
- ~~Teks Dicoret (Strikethrough):~~ Gunakan tilde ganda (\`~~coret~~\`).

### 3. Kutipan (Blockquotes)
Gunakan tanda lebih besar (\`>\`) untuk membuat blok kutipan yang elegan:
> "Kesederhanaan adalah kecanggihan tertinggi." — Leonardo da Vinci

### 4. Daftar (Lists)
#### Daftar Tidak Teratur (Unordered List)
Gunakan tanda minus (\`-\`) atau bintang (\`*\`):
- Item pertama
- Item kedua dengan sub-item:
  - Sub-item A
  - Sub-item B

#### Daftar Teratur (Ordered List)
Gunakan angka diikuti titik:
1. Langkah Pertama
2. Langkah Kedua
3. Langkah Ketiga

### 5. Kode (Code Block)
Gunakan backtick tunggal (\` \` \`) untuk kode inline, seperti \`const name = "PexihDev"\`, atau pasang tiga backtick (\` \`\` \` \` \`) dengan bahasa pemrograman pilihan untuk blok kode berseri:

\`\`\`javascript
// Contoh fungsi sapaan sederhana
function sapaPengguna(nama) {
  console.log(\`Halo, selamat datang di PexMod Web, \${nama}!\`);
}

sapaPengguna("PexihDev");
\`\`\`

Tulis konten Anda dengan bebas menggunakan Markdown yang rapi untuk menghasilkan tampilan blog yang bersih, nyaman dibaca, dan berkinerja tinggi!`,
      en: `Markdown is a lightweight markup language with a plain text formatting syntax designed so that it can be easily converted to structured HTML. The **PexMod Web** platform fully supports writing Markdown with a very elegant and responsive visual style.

Below is a quick guide to frequently used Markdown elements:

### 1. Headings
Use the hash symbol (\`#\`) at the start of a line to create headings. The number of hashes determines the heading level:
- \`# Main Heading (H1)\`
- \`## Sub-heading (H2)\`
- \`### Sub-sub-heading (H3)\`

### 2. Text Formatting (Emphasis)
- **Bold Text:** Use double asterisks (\`**bold**\`) or double underscores (\`__bold__\`).
- *Italic Text:* Use single asterisks (\`*italic*\`) or single underscores (\`_italic_\`).
- ~~Strikethrough:~~ Use double tildes (\`~~strikethrough~~\`).

### 3. Blockquotes
Use the greater-than sign (\`>\`) to create elegant blockquotes:
> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

### 4. Lists
#### Unordered List
Use minus signs (\`-\`) or asterisks (\`*\`):
- First item
- Second item with sub-item:
  - Sub-item A
  - Sub-item B

#### Ordered List
Use numbers followed by a period:
1. First Step
2. Second Step
3. Third Step

### 5. Code Block
Use single backticks (\` \` \`) for inline code, like \`const name = "PexihDev"\`, or use three backticks (\` \`\` \` \` \`) with your language of choice for code blocks:

\`\`\`javascript
// Example of a simple greeting function
function greetUser(name) {
  console.log(\`Hello, welcome to PexMod Web, \${name}!\`);
}

greetUser("PexihDev");
\`\`\`

Write your content freely using neat Markdown to produce a clean, comfortable, and high-performance blog layout!`,
      es: `Markdown es un lenguaje de marcado ligero con una sintaxis de formato de texto plano diseñada para que pueda convertirse fácilmente a HTML estructurado. La plataforma **PexMod Web** es totalmente compatible con la escritura de Markdown con un estilo visual muy elegante y adaptable.

A continuación se presenta una guía rápida de los elementos de Markdown más utilizados:

### 1. Encabezados (Headings)
Use el símbolo de almohadilla (\`#\`) al inicio de una línea para crear encabezados. El número de símbolos determina el nivel del encabezado:
- \`# Encabezado Principal (H1)\`
- \`## Subencabezado (H2)\`
- \`### Sub-subencabezado (H3)\`

### 2. Formato de Texto (Énfasis)
- **Texto en Negrita:** Use asteriscos dobles (\`**negrita**\`) o guiones bajos dobles (\`__negrita__\`).
- *Texto en Cursiva:* Use asteriscos simples (\`*cursiva*\`) o guiones bajos simples (\`_cursiva_\`).
- ~~Texto Tachado:~~ Use tildes dobles (\`~~tachado~~\`).

### 3. Citas (Blockquotes)
Use el signo mayor que (\`>\`) para crear bloques de citas elegantes:
> "La simplicidad es la máxima sofisticación." — Leonardo da Vinci

### 4. Listas (Lists)
#### Lista no ordenada
Use signos menos (\`-\`) o asteriscos (\`*\`):
- Primer elemento
- Segundo elemento con subelementos:
  - Subelemento A
  - Subelemento B

#### Lista ordenada
Use números seguidos de un punto:
1. Primer Paso
2. Segundo Paso
3. Tercer Paso

### 5. Bloques de Código (Code Blocks)
Use comillas invertidas simples (\` \` \`) para código en línea, como \`const name = "PexihDev"\`, o use tres comillas invertidas (\` \`\` \` \` \`) con su lenguaje de programación preferido para bloques de código:

\`\`\`javascript
// Ejemplo de una función de saludo simple
function saludarUsuario(nombre) {
  console.log(\`¡Hola, bienvenido a PexMod Web, \${nombre}!\`);
}

saludarUsuario("PexihDev");
\`\`\`

¡Escriba su contenido libremente usando Markdown ordenado para producir un diseño de blog limpio, cómodo de leer y de alto rendimiento!`
    }
  },
  {
    id: "welcome-to-papermod-web",
    title: {
      id: "Selamat Datang di PexMod (Web Port)",
      en: "Welcome to PexMod (Web Port)",
      es: "Bienvenido a PexMod (Versión Web)"
    },
    description: {
      id: "Ini adalah porting dari tema Hugo populer, PexMod, yang dikonversi menjadi React SPA statis menggunakan Vite.",
      en: "This is a port of the popular Hugo theme, PexMod, converted into a static React SPA using Vite.",
      es: "Esta es una adaptación del popular tema de Hugo, PexMod, convertido en una SPA de React estática usando Vite."
    },
    date: "2026-07-14",
    formattedDate: {
      id: "14 Juli 2026",
      en: "July 14, 2026",
      es: "14 de julio de 2026"
    },
    readingTime: "2 min",
    author: "PexihDev",
    tags: ["React", "Vite", "PexMod"],
    content: {
      id: `Selamat datang di **PexMod Web**, porting aplikasi satu halaman (SPA) yang modern dan sangat teroptimasi dari tema legendaris Hugo PexMod. Porting web ini mempertahankan tipografi yang bersih, kinerja sangat cepat, dan nuansa estetika dari tema aslinya sambil menambahkan transisi responsif yang mulus yang ditenagai oleh React.

### Sorotan Utama
- **Mode Tata Letak Ganda:** Perpindahan mulus antara mode Profil (cocok untuk portofolio/bio) dan mode daftar Blog standar.
- **Pencarian Interaktif:** Pencarian teks lengkap instan dengan penyorotan kueri pencarian.
- **Tipografi Responsif Bersih:** Jarak font, ukuran viewport, dan tata letak cairan adaptif yang dioptimalkan sepenuhnya.
- **Tema Gelap & Terang:** Integrasi mode gelap yang sempurna dengan sinkronisasi status klien.

Baik Anda menjelajah di desktop ultra-lebar atau layar seluler yang sempit, PexMod Web secara otomatis menskalakan dan memposisikan ulang elemen untuk mempertahankan kanvas membaca yang bersih dan mudah dibaca.`,
      en: `Welcome to **PexMod Web**, a modern, highly optimized single-page application port of the legendary Hugo PexMod theme. This web port preserves the clean typography, blazing fast performance, and aesthetic nuances of the original while adding smooth, responsive transitions powered by React.

### Key Highlights
- **Dual Layout Modes:** Seamless switching between Profile mode (perfect for portfolio/bio) and standard Blog list mode.
- **Interactive Search:** Instant full-text search with highlighting of search queries.
- **Clean Responsive Typography:** Fully optimized font spacing, viewport sizing, and adaptive fluid layouts.
- **Dark & Light Theme:** Perfect dark mode integration with client state synchronization.

Whether you are browsing on an ultra-wide desktop or a narrow mobile screen, PexMod Web automatically scales and repositions elements to maintain a pristine, readable reading canvas.`,
      es: `Bienvenido a **PexMod Web**, una aplicación de una sola página (SPA) moderna y altamente optimizada basada en el legendario tema de Hugo PexMod. Esta adaptación web conserva la tipografía limpia, el rendimiento ultrarrápido y los matices estéticos del original, al tiempo que añade transiciones suaves y responsivas impulsadas por React.

### Características Destacadas
- **Modos de Diseño Doble:** Cambio fluido entre el modo Perfil (perfecto para portafolio/biografía) y el modo de lista de Blog estándar.
- **Búsqueda Interactiva:** Búsqueda instantánea en texto completo con resaltado de términos de búsqueda.
- **Tipografía Limpia y Responsiva:** Espaciado de fuentes, tamaño de pantalla y diseños fluidos adaptables completamente optimizados.
- **Tema Oscuro y Claro:** Integración perfecta del modo oscuro con sincronización del estado del cliente.

Ya sea que esté navegando en una pantalla de escritorio ultraancha o en una pantalla móvil estrecha, PexMod Web escala y reposiciona automáticamente los elementos para mantener un lienzo de lectura impecable y legible.`
    }
  },
  {
    id: "installation-and-features",
    title: {
      id: "Instalasi & Fitur PexMod",
      en: "Installation & Features of PexMod",
      es: "Instalación y Características de PexMod"
    },
    description: {
      id: "Fitur termasuk mode Gelap/Terang, tipografi bersih, desain responsif, dan pencarian instan.",
      en: "Features include Dark/Light mode, clean typography, responsive design, and instant search.",
      es: "Las características incluyen modo Oscuro/Claro, tipografía limpia, diseño responsivo y búsqueda instantánea."
    },
    date: "2026-07-13",
    formattedDate: {
      id: "13 Juli 2026",
      en: "July 13, 2026",
      es: "13 de julio de 2026"
    },
    readingTime: "3 min",
    author: "PexihDev",
    tags: ["Installation", "Guide", "Features"],
    content: {
      id: `Menyiapkan dan menyesuaikan situs PexMod Anda sangatlah mudah. Dalam porting ini, kami telah menyatukan konfigurasi menjadi variabel state React dan komponen struktural yang sederhana, menghilangkan kebutuhan akan file TOML/YAML yang rumit.

### Prinsip Desain Responsif
PexMod dibangun dengan filosofi *presisi desktop-first, kode mobile-first*. Pada layar yang lebih kecil:
- Padding tata letak utama menyusut dari 24px ke 14px untuk memaksimalkan ruang membaca teks.
- Tautan header akan otomatis membungkus (wrap) dan bergulir secara horizontal jika melebihi lebar layar horizontal.
- Kisi gambar berubah dari struktur flex seperti bento menjadi tumpukan vertikal sederhana.

### Menambahkan Gaya Kustom
Anda dapat menyesuaikan warna, jarak, dan ukuran font menggunakan variabel CSS standar di dalam \`index.css\` atau dengan menerapkan kelas utilitas Tailwind. Sebagai contoh, variabel tema menyesuaikan secara dinamis dengan preferensi sistem atau pemilihan manual pengguna:

\`\`\`css
:root {
  --theme: rgb(255, 255, 255);
  --primary: rgb(30, 30, 30);
  --secondary: rgb(108, 108, 108);
}

.dark {
  --theme: rgb(29, 30, 32);
  --primary: rgb(218, 218, 219);
}
\`\`\``,
      en: `Setting up and tailoring your PexMod site is extremely straightforward. In this port, we've consolidated configuration into simple React state variables and structural components, eliminating the need for complex TOML/YAML files.

### Responsive Design Principles
PexMod is built with a *desktop-first precision, mobile-first code* philosophy. On smaller screens:
- The main layout padding shrinks from 24px to 14px to maximize text reading space.
- Header links auto-wrap and scroll horizontally if they exceed the horizontal screen width.
- Image grids collapse from bento-like flex structures into simple vertical stacks.

### Adding Custom Styles
You can customize colors, spacing, and font sizes using standard CSS variables inside \`index.css\` or by applying Tailwind utility classes. For instance, the theme variables adapt dynamically to the system preference or user manual selection:

\`\`\`css
:root {
  --theme: rgb(255, 255, 255);
  --primary: rgb(30, 30, 30);
  --secondary: rgb(108, 108, 108);
}

.dark {
  --theme: rgb(29, 30, 32);
  --primary: rgb(218, 218, 219);
}
\`\`\``,
      es: `Configurar y adaptar su sitio PexMod es extremadamente sencillo. En esta versión, hemos consolidado la configuración en variables de estado de React simples y componentes estructurales, eliminando la necesidad de archivos TOML/YAML complejos.

### Principios de Diseño Responsivo
PexMod se basa en una filosofía de *precisión de escritorio primero, código móvil primero*. En pantallas más pequeñas:
- El espaciado (padding) del diseño principal se reduce de 24px a 14px para maximizar el espacio de lectura.
- Los enlaces del encabezado se ajustan automáticamente y se desplazan horizontalmente si superan el ancho de la pantalla.
- Las cuadrículas de imágenes pasan de ser estructuras flexibles tipo bento a simples columnas verticales.

### Añadir Estilos Personalizados
Puede personalizar los colores, el espaciado y los tamaños de fuente utilizando variables CSS estándar dentro de \`index.css\` o aplicando clases de utilidad de Tailwind. Por ejemplo, las variables del tema se adaptan dinámicamente a la preferencia del sistema o a la selección manual del usuario:

\`\`\`css
:root {
  --theme: rgb(255, 255, 255);
  --primary: rgb(30, 30, 30);
  --secondary: rgb(108, 108, 108);
}

.dark {
  --theme: rgb(29, 30, 32);
  --primary: rgb(218, 218, 219);
}
\`\`\``
    }
  },
  {
    id: "minimalist-web-design",
    title: {
      id: "Seni Desain Web Minimalis",
      en: "The Art of Minimalist Web Design",
      es: "El Arte del Diseño Web Minimalista"
    },
    description: {
      id: "Pembahasan mendalam mengapa tata letak minimalis bekerja dengan sangat baik, berfokus pada tipografi, ruang kosong, dan beban kognitif.",
      en: "Deep dive into why minimalist layouts work so well, focusing on typography, whitespace, and cognitive load.",
      es: "Profundice en por qué los diseños minimalistas funcionan tan bien, centrándose en la tipografía, el espacio en blanco y la carga cognitiva."
    },
    date: "2026-07-10",
    formattedDate: {
      id: "10 Juli 2026",
      en: "July 10, 2026",
      es: "10 de julio de 2026"
    },
    readingTime: "4 min",
    author: "PexihDev",
    tags: ["Design", "Minimalism", "Aesthetics"],
    content: {
      id: `Minimalisme bukan sekadar tidak adanya kekacauan; melainkan adanya kejelasan. Saat mendesain situs web, setiap elemen harus memiliki fungsi struktural atau informasional. Jika aset tata letak tidak memperkuat pemahaman atau memandu navigasi, itu adalah kebisingan visual.

> "Kesederhanaan adalah kecanggihan tertinggi." — Leonardo da Vinci

### Mengapa Tipografi Sangat Penting
Dalam desain minimalis, tipografi adalah komponen visual utama. Karena tidak ada aset grafis yang berat atau gradien yang rumit, pilihan font, tinggi baris, jarak huruf, dan warna teks secara langsung membentuk karakter situs. Kontras tinggi sangat penting: teks tubuh harus mudah dibaca pada variabel latar belakang terang atau gelap, dan tautan harus memiliki indikator yang halus namun mudah dikenali.

### Ruang Kosong sebagai Elemen Desain Utama
Ruang kosong (atau ruang negatif) bukanlah ruang kosong tak berguna; ini adalah elemen struktural yang membantu mengelompokkan item terkait dan memisahkan topik yang berbeda. Dengan memanfaatkan jarak yang luas antara artikel dan paragraf, Anda membiarkan mata pembaca beristirahat, mengurangi kelelahan kognitif selama sesi membaca yang lama.`,
      en: `Minimalism isn't just the absence of clutter; it's the presence of clarity. When designing websites, every element should serve a structural or informational purpose. If a layout asset does not reinforce comprehension or guide navigation, it is noise.

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

### Why Typography Matters
In minimalist designs, typography is the core visual component. Since there are no heavy graphic assets or complex gradients, the choice of font, line height, letter-spacing, and text color directly establishes the site's voice. High contrast is vital: body text must be easily readable on light or dark background variables, and links must have subtle but recognizable indicators.

### Whitespace as a Core Design Element
Whitespace (or negative space) is not empty space; it is a structural element that helps group related items and separates distinct topics. By utilizing generous spacing between articles and paragraphs, you allow the reader's eyes to rest, reducing cognitive fatigue during extended reading sessions.`,
      es: `El minimalismo no es solo la ausencia de desorden; es la presencia de claridad. Al diseñar sitios web, cada elemento debe tener un propósito estructural o informativo. Si un elemento de diseño no refuerza la comprensión o no guía la navegación, es ruido visual.

> "La simplicidad es la máxima sofisticación." — Leonardo da Vinci

### Por qué es Importante la Tipografía
En los diseños minimalistas, la tipografía es el componente visual central. Dado que no hay elementos gráficos pesados ni degradados complejos, la elección de la fuente, la altura de línea, el espaciado de letras y el color del texto establecen directamente la voz del sitio. El alto contraste es vital: el texto principal debe ser fácil de leer en variables de fondo claro u oscuro, y los enlaces deben tener indicadores sutiles pero reconocibles.

### El Espacio en Blanco como Elemento de Diseño Central
El espacio en blanco (o espacio negativo) no es espacio vacío; es un elemento estructural que ayuda a agrupar elementos relacionados y separa temas distintos. Al utilizar un espaciado generoso entre artículos y párrafos, permite que los ojos del lector descansen, reduciendo la fatiga cognitiva durante las sesiones de lectura prolongadas.`
    }
  },
  {
    id: "getting-started-react-vite",
    title: {
      id: "Build Sangat Cepat dengan React + Vite",
      en: "Blazing Fast Builds with React + Vite",
      es: "Construcciones Ultrarrápidas con React + Vite"
    },
    description: {
      id: "Panduan membangun Aplikasi Satu Halaman (SPA) yang sangat cepat dengan Vite, React, dan penataan modular.",
      en: "A guide to building lightning fast Single Page Applications with Vite, React, and modular styling.",
      es: "Una guía para crear aplicaciones de una sola página ultrarrápidas con Vite, React y estilos modulares."
    },
    date: "2026-07-08",
    formattedDate: {
      id: "8 Juli 2026",
      en: "July 8, 2026",
      es: "8 de julio de 2026"
    },
    readingTime: "5 min",
    author: "PexihDev",
    tags: ["React", "Vite", "Development"],
    content: {
      id: `Vite adalah alat build frontend generasi berikutnya yang sangat cepat. Vite memanfaatkan modul ES asli di browser untuk menghadirkan penggantian modul panas (HMR) yang hampir instan dan bundel produksi yang sangat cepat melalui Rollup.

### Cara Kerja Vite
Tidak seperti bundler tradisional seperti Webpack, yang membundel seluruh aplikasi sebelum memulai server pengembangan, Vite membagi modul menjadi **dependensi** dan **kode sumber**:

- **Dependensi:** Dibundel terlebih dahulu menggunakan esbuild (yang ditulis dalam bahasa Go dan 10-100x lebih cepat daripada bundler berbasis JavaScript).
- **Kode Sumber:** Disajikan sesuai permintaan menggunakan ES Modules asli browser, artinya hanya file yang diminta yang dimuat.

### Contoh Komponen React Sederhana
Berikut adalah contoh komponen tombol sakelar responsif sederhana di React:

\`\`\`jsx
import React, { useState } from 'react';

export default function Toggle() {
  const [active, setActive] = useState(false);
  
  return (
    <button 
      className="px-4 py-2 rounded bg-primary text-theme"
      onClick={() => setActive(!active)}
    >
      {active ? 'Aktif' : 'Nonaktif'}
    </button>
  );
}
\`\`\`

Blok sederhana ini dieksekusi dengan bersih dan merender status interaktif modular dengan mulus tanpa memuat ulang jendela browser.`,
      en: `Vite is a next-generation frontend build tool that is fast. It leverages native ES modules in the browser to deliver near-instantaneous hot module replacement (HMR) and extremely fast production bundles via Rollup.

### How Vite Works
Unlike traditional bundlers like Webpack, which bundle the entire application before starting the development server, Vite divides modules into **dependencies** and **source code**:

- **Dependencies:** Pre-bundled with esbuild (which is written in Go and is 10-100x faster than JavaScript-based bundlers).
- **Source Code:** Served on-demand using browser native ES Modules, meaning only the requested files are loaded.

### Simple React Component Example
Here is an example of a simple responsive toggle component in React:

\`\`\`jsx
import React, { useState } from 'react';

export default function Toggle() {
  const [active, setActive] = useState(false);
  
  return (
    <button 
      className="px-4 py-2 rounded bg-primary text-theme"
      onClick={() => setActive(!active)}
    >
      {active ? 'Active' : 'Inactive'}
    </button>
  );
}
\`\`\`

This simple block executes cleanly and renders modular interactive states seamlessly without reloading the window frame.`,
      es: `Vite es una herramienta de compilación frontend de próxima generación que es increíblemente rápida. Aprovecha los módulos ES nativos del navegador para ofrecer un reemplazo de módulos en caliente (HMR) casi instantáneo y compilaciones de producción extremadamente rápidas a través de Rollup.

### Cómo Funciona Vite
A diferencia de los empaquetadores tradicionales como Webpack, que empaquetan toda la aplicación antes de iniciar el servidor de desarrollo, Vite divide los módulos en **dependencias** y **código fuente**:

- **Dependencias:** Se preempaquetan con esbuild (que está escrito en Go y es entre 10 y 100 veces más rápido que los empaquetadores basados en JavaScript).
- **Código fuente:** Se sirve bajo demanda utilizando módulos ES nativos del navegador, lo que significa que solo se cargan los archivos solicitados.

### Ejemplo de Componente React Simple
Aquí hay un ejemplo de un componente de alternancia simple y responsivo en React:

\`\`\`jsx
import React, { useState } from 'react';

export default function Toggle() {
  const [active, setActive] = useState(false);
  
  return (
    <button 
      className="px-4 py-2 rounded bg-primary text-theme"
      onClick={() => setActive(!active)}
    >
      {active ? 'Activo' : 'Inactivo'}
    </button>
  );
}
\`\`\`

Este bloque simple se ejecuta limpiamente y representa estados interactivos modulares sin recargar la página.`
    }
  },
  {
    id: "mtproto-telegram-storage-hub",
    title: {
      id: "Mengintegrasikan Telegram MTProto sebagai Media Storage dari AI Studio",
      en: "Integrating Telegram MTProto as Media Storage from AI Studio",
      es: "Integración de Telegram MTProto como Almacenamiento de Medios desde AI Studio"
    },
    description: {
      id: "Panduan lengkap bagaimana PexihDev mengonfigurasi kredensial dan melakukan deployment GramJS MTProto langsung menggunakan lingkungan kerja Google AI Studio.",
      en: "A comprehensive guide on how PexihDev configures credentials and deploys GramJS MTProto directly using the Google AI Studio environment.",
      es: "Una guía completa sobre cómo PexihDev configura las credenciales y despliega GramJS MTProto directamente usando el entorno de Google AI Studio."
    },
    date: "2026-07-14",
    formattedDate: {
      id: "14 Juli 2026",
      en: "July 14, 2026",
      es: "14 de julio de 2026"
    },
    readingTime: "4 min",
    author: "PexihDev",
    tags: ["Telegram", "MTProto", "AI Studio", "Storage"],
    content: {
      id: `Integrasi media storage modern menggunakan Telegram MTProto dapat dikembangkan dengan sangat mudah melalui platform **Google AI Studio**. Kita tidak perlu lagi menulis kode secara manual dari nol atau mengonfigurasi server lokal yang rumit.

Dalam artikel ini, **PexihDev** akan membahas panduan praktis mengonfigurasi Telegram MTProto API di dalam **Google AI Studio**.

### 1. Konfigurasi Kredensial di AI Studio Settings
Semua API Key dan variabel lingkungan sensitif untuk Telegram MTProto dikelola dengan aman melalui menu **Settings** di Google AI Studio. Anda tidak boleh menaruh kredensial ini langsung di dalam kode sumber:
- **TELEGRAM_API_ID:** Dapatkan dari \`my.telegram.org\` dan masukkan ke Settings AI Studio.
- **TELEGRAM_API_HASH:** Masukkan hash API Telegram Anda ke Settings AI Studio.
- **TELEGRAM_STRING_SESSION:** String sesi autentikasi akun Telegram untuk menjaga koneksi tetap persisten tanpa perlu memasukkan kode OTP berulang kali.

Dengan menaruhnya di Settings AI Studio, kredensial Anda akan aman dan disuntikkan secara otomatis sebagai variabel lingkungan (\`process.env\`) saat server dijalankan.

### 2. Mengunggah Sesi dan Berkas via AI Studio Explorer
Google AI Studio menyediakan **File Explorer** langsung di panel editornya. Anda dapat mengunggah berkas konfigurasi, gambar aset, atau berkas sesi (\`.session\`) langsung ke dalam struktur direktori workspace:
- Seret dan lepas (drag-and-drop) berkas sesi Anda langsung ke root direktori.
- AI Studio akan mendeteksi perubahan berkas dan melakukan hot-reload secara otomatis tanpa merusak state backend yang sedang berjalan.

### 3. Alur Kerja Unggah Media (Upload Pipeline)
Ketika pengembangan dilakukan di Google AI Studio:
1. Developer menulis API Endpoint \`/api/telegram/upload\` di file \`server.ts\` dalam editor AI Studio.
2. Saat pengujian dilakukan pada frame preview AI Studio di port 3000, request file dikonversi menjadi format buffer.
3. Server Express di AI Studio akan membaca variabel lingkungan dari Settings, menginisialisasi klien GramJS secara asinkron, dan langsung mengunggah media ke saluran Telegram target Anda.
4. Tautan media Telegram langsung dikembalikan ke halaman preview aplikasi Anda secara instan.`,
      en: `Modern media storage integration using Telegram MTProto can be developed easily through the **Google AI Studio** platform. There is no need to manually write code from scratch or configure complex local servers.

In this article, **PexihDev** will cover a practical guide to configuring the Telegram MTProto API inside **Google AI Studio**.

### 1. Credentials Configuration in AI Studio Settings
All API Keys and sensitive environment variables for Telegram MTProto are managed securely through the **Settings** menu in Google AI Studio. You should never place these credentials directly in the source code:
- **TELEGRAM_API_ID:** Obtain from \`my.telegram.org\` and enter into AI Studio Settings.
- **TELEGRAM_API_HASH:** Enter your Telegram API hash into AI Studio Settings.
- **TELEGRAM_STRING_SESSION:** Telegram account authentication session string to keep the connection persistent without needing to enter the OTP code repeatedly.

By placing them in AI Studio Settings, your credentials will be safe and automatically injected as environment variables (\`process.env\`) when the server runs.

### 2. Uploading Sessions and Files via AI Studio Explorer
Google AI Studio provides a **File Explorer** directly in its editor panel. You can upload configuration files, asset images, or session files (\`.session\`) directly into the workspace directory structure:
- Drag and drop your session file directly to the root directory.
- AI Studio will detect file changes and perform hot-reload automatically without breaking the running backend state.

### 3. Media Upload Pipeline
When development is performed in Google AI Studio:
1. The developer writes the API Endpoint \`/api/telegram/upload\` in the \`server.ts\` file within the AI Studio editor.
2. During testing on the AI Studio preview frame at port 3000, file requests are converted into a buffer format.
3. The Express server in AI Studio reads the environment variables from Settings, initializes the GramJS client asynchronously, and immediately uploads the media to your target Telegram channel.
4. The Telegram media link is returned back to your application preview page instantly.`,
      es: `La integración moderna de almacenamiento de medios utilizando Telegram MTProto se puede desarrollar fácilmente a través de la plataforma **Google AI Studio**. Ya no es necesario escribir código manualmente desde cero o configurar complejos servidores locales.

En este artículo, **PexihDev** abordará una guía práctica para configurar la API de Telegram MTProto dentro de **Google AI Studio**.

### 1. Configuración de Credenciales en la Configuración de AI Studio
Todas las claves de API y variables de entorno sensibles para Telegram MTProto se gestionan de forma segura a través del menú **Settings** (Configuración) en Google AI Studio. Nunca debe colocar estas credenciales directamente en el código fuente:
- **TELEGRAM_API_ID:** Obtenga desde \`my.telegram.org\` e ingréselo en la configuración de AI Studio.
- **TELEGRAM_API_HASH:** Ingrese el hash de la API de Telegram en la configuración de AI Studio.
- **TELEGRAM_STRING_SESSION:** Cadena de sesión de autenticación de la cuenta de Telegram para mantener la conexión persistente sin necesidad de ingresar el código OTP repetidamente.

Al colocarlos en la configuración de AI Studio, sus credenciales estarán seguras y se inyectarán automáticamente como variables de entorno (\`process.env\`) al ejecutar el servidor.

### 2. Carga de Sesiones y Archivos a través del Explorador de AI Studio
Google AI Studio proporciona un **File Explorer** directamente en su panel de editor. Puede cargar archivos de configuración, imágenes de activos o archivos de sesión (\`.session\`) directamente en la estructura de directorios del espacio de trabajo:
- Arrastre y suelte su archivo de sesión directamente en el directorio raíz.
- AI Studio detectará los cambios de archivos y realizará una recarga automática en caliente sin alterar el estado del backend en ejecución.

### 3. Pipeline de Carga de Medios (Upload Pipeline)
Cuando el desarrollo se realiza en Google AI Studio:
1. El desarrollador escribe el punto de acceso de la API \`/api/telegram/upload\` en el archivo \`server.ts\` dentro del editor de AI Studio.
2. Durante las pruebas en el marco de vista previa de AI Studio en el puerto 3000, las solicitudes de archivos se convierten a formato de búfer.
3. El servidor Express en AI Studio lee las variables de entorno de la configuración, inicializa el cliente GramJS de forma asíncrona y carga directamente el medio a su canal de Telegram de destino.
4. El enlace del medio de Telegram se devuelve a la página de vista previa de su aplicación al instante.`
    }
  }
];
