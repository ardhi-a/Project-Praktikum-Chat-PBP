# 💬 Chat App — Pemrograman Berbasis Platform

Aplikasi komunikasi berbasis web yang dikembangkan sebagai bagian dari pemenuhan tugas mata kuliah **Pemrograman Berbasis Platform (PBP)**.

Chat App dirancang untuk menyediakan layanan komunikasi antar pengguna melalui sistem pesan online dengan frontend berbasis teknologi web native dan backend menggunakan PHP Native.

---

## 📌 Tentang Project

Chat App merupakan aplikasi pesan sederhana yang memungkinkan pengguna untuk membuat akun, melakukan autentikasi, mengelola kontak, serta berkomunikasi dengan pengguna lain.

Project ini dikembangkan dengan menerapkan konsep pemrograman berbasis platform, komunikasi client-server, REST API, pengelolaan database, dan autentikasi pengguna.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman web |
| CSS3 | Tampilan dan desain antarmuka |
| JavaScript Native | Interaksi dan komunikasi dengan API |
| PHP Native | Pengembangan backend dan REST API |
| MariaDB | Penyimpanan dan pengelolaan data |
| JSON | Format pertukaran data |
| JWT | Autentikasi dan verifikasi pengguna |
| Apache | Web server melalui XAMPP |
| Postman | Pengujian endpoint API |
| Git & GitHub | Version control dan kolaborasi kode |

## ✨ Fitur dan Progress Pengembangan

### Backend
- [x] Koneksi database MariaDB.
- [x] Registrasi pengguna.
- [x] Validasi nomor telepon.
- [x] Pencegahan nomor telepon duplikat.
- [x] Password hashing menggunakan `password_hash()`.
- [x] Login pengguna.
- [x] Generate JSON Web Token (JWT).
- [x] Verifikasi JWT.
- [x] Endpoint pengecekan identitas pengguna (`GET /api/me`).
- [ ] Proteksi seluruh endpoint yang membutuhkan autentikasi.
- [ ] CRUD kontak.
- [ ] Pengiriman dan penerimaan pesan.
- [ ] Penghapusan akun.
- [ ] Upload dan validasi foto profil.

### Frontend
- [ ] Halaman registrasi.
- [ ] Halaman login.
- [ ] Halaman utama aplikasi chat.
- [ ] Pengelolaan kontak.
- [ ] Antarmuka percakapan.

*Checklist akan diperbarui seiring perkembangan project.*

## 📁 Struktur Project

```text
Chat-App-PHP-HTML-Javascript/
│
├── backend/
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   └── UserController.php
│   │
│   ├── bootstrap/
│   │   ├── index.php
│   │   ├── loadEnv.php
│   │   └── response.php
│   │
│   ├── lib/
│   │   ├── DB.php
│   │   ├── Router.php
│   │   ├── JWTAuth.php
│   │   └── php-jwt/
│   │
│   ├── models/
│   │   └── User.php
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   ├── .env.example
│   ├── .htaccess
│   └── index.php
│
├── frontend/
│
├── .gitignore
└── README.md
```

## ⚙️ Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/ardhi-a/Project-Praktikum-Chat-PBP.git
```

### 2. Pindahkan Project

Letakkan folder project di dalam direktori `htdocs` XAMPP.

### 3. Buat Database

Buat database MariaDB dengan nama:

```sql
CREATE DATABASE `chat-app`;
```

Pastikan struktur tabel database sudah disiapkan sesuai kebutuhan aplikasi.

### 4. Konfigurasi Environment

Salin file `backend/.env.example` menjadi `backend/.env`, kemudian sesuaikan konfigurasi database dan JWT Secret.

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=chat-app
DB_USER=root
DB_PASS=

JWT_SECRET=your_own_random_secret
JWT_EXPIRE=3600
```

**Catatan:** Gunakan secret acak milik sendiri. Jangan mengunggah file `.env` ke repository publik.

### 5. Jalankan XAMPP

Aktifkan Apache dan MySQL melalui XAMPP Control Panel.

### 6. Akses Aplikasi

Frontend:

```text
http://localhost/Project-Praktikum-PBP/Chat-App-PHP-HTML-Javascript/frontend/
```

Backend Health Check:

```text
http://localhost/Project-Praktikum-PBP/Chat-App-PHP-HTML-Javascript/backend/api/health
```

## 🧪 Pengujian API

Pengujian endpoint backend dilakukan menggunakan Postman.

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/users` | Registrasi pengguna |
| POST | `/api/login` | Login pengguna |
| GET | `/api/me` | Verifikasi JWT dan identitas pengguna |
| GET | `/api/health` | Pemeriksaan API dan database |

## 🎯 Tujuan Pengembangan

Project ini bertujuan untuk menerapkan konsep-konsep berikut:

- Pemisahan frontend dan backend.
- Komunikasi client-server menggunakan HTTP.
- Pengembangan REST API dengan format JSON.
- Pengelolaan database relasional.
- Autentikasi dan otorisasi menggunakan JWT.
- Pengelolaan data pengguna, kontak, dan pesan.
- Penerapan praktik pengembangan perangkat lunak menggunakan Git.

## 👩‍💻 Pengembang

**Ardhia Rahma Narulita**

- Program Studi: Teknik Informatika
- Mata Kuliah: Pemrograman Berbasis Platform
- Repository: [Project-Praktikum-Chat-PBP](https://github.com/ardhi-a/Project-Praktikum-Chat-PBP)

---

*Developed as part of the Pemrograman Berbasis Platform course project.*
