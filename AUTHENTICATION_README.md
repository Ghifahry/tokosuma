# Sistem Autentikasi Akun.vue

## Deskripsi

Sistem autentikasi telah diimplementasikan untuk `Akun.vue` agar menampilkan nama dan email sesuai dengan user yang login. Ketika user login menggunakan email yang berbeda, data yang ditampilkan di `Akun.vue` akan berubah sesuai dengan profil user tersebut.

## Fitur yang Diimplementasikan

### 1. Data User yang Berbeda-beda

Sistem menyimpan data user yang berbeda-beda berdasarkan email di file `src/data/userProfiles.js`:

- **mhmdgabrielle@gmail.com**: Muhammad Gabrielle
- **john.doe@example.com**: John Doe
- **jane.smith@example.com**: Jane Smith
- **admin@tokosuma.com**: Admin Toko Suma

### 2. Autentikasi Dinamis

- Ketika user login dengan email yang berbeda, data yang ditampilkan di `Akun.vue` akan berubah
- Nama lengkap dan email akan menyesuaikan dengan profil user yang login
- Data disimpan di localStorage dan dapat diakses di seluruh aplikasi

### 3. Penyimpanan Data User

Data user disimpan dalam beberapa tempat:

- `localStorage.userEmail`: Email user
- `localStorage.userFullName`: Nama lengkap user
- `localStorage.userData`: Data lengkap user dalam format JSON
- `localStorage.username`: Username user
- `localStorage.userRole`: Role user

## Cara Kerja

### 1. Login

Ketika user login di `Login.vue`:

1. Email user dimasukkan
2. Sistem mencari profil user berdasarkan email di `userProfiles.js`
3. Jika ditemukan, data profil tersebut disimpan ke localStorage
4. Jika tidak ditemukan, profil default dibuat dengan nama "User Baru"

### 2. Register

Ketika user register di `Register.vue`:

1. Data user baru dibuat berdasarkan input form
2. Data disimpan ke localStorage
3. User langsung login setelah registrasi berhasil

### 3. Akun.vue

Ketika user mengakses `Akun.vue`:

1. Data user diambil dari localStorage
2. Form diisi dengan data user yang sedang login
3. Jika user mengubah data dan menyimpan, data baru disimpan ke localStorage
4. Perubahan akan terlihat di seluruh aplikasi

## File yang Dimodifikasi

### 1. `src/components/account/Akun.vue`

- Menggunakan composable `useAuth` untuk mendapatkan data user
- Menambahkan fungsi `loadUserData()` untuk memuat data user
- Menambahkan watcher untuk mendeteksi perubahan data auth
- Menggunakan data dari localStorage untuk mengisi form

### 2. `src/views/auth/Login.vue`

- Menggunakan `saveUserToLocalStorage()` untuk menyimpan data user
- Data user disimpan berdasarkan email yang dimasukkan

### 3. `src/views/auth/Register.vue`

- Menyimpan data user baru ke localStorage
- Data user dibuat berdasarkan input form registrasi

### 4. `src/data/userProfiles.js` (Baru)

- Berisi data user yang berbeda-beda berdasarkan email
- Fungsi `getUserProfile()` untuk mendapatkan data user
- Fungsi `saveUserToLocalStorage()` untuk menyimpan data user

## Cara Testing

### 1. Login dengan Email Berbeda

1. Buka aplikasi dan login dengan email yang berbeda:

   - `mhmdgabrielle@gmail.com`
   - `john.doe@example.com`
   - `jane.smith@example.com`
   - `admin@tokosuma.com`

2. Setelah login, buka halaman Akun
3. Perhatikan bahwa nama dan email berubah sesuai dengan user yang login

### 2. Register User Baru

1. Register dengan email baru yang tidak ada di `userProfiles.js`
2. Setelah register berhasil, buka halaman Akun
3. Data akan menggunakan profil default dengan nama "User Baru"

### 3. Edit Data User

1. Login dengan salah satu email
2. Buka halaman Akun
3. Edit data user (nama, gender, tanggal lahir, dll)
4. Klik "Simpan Perubahan"
5. Data akan tersimpan dan dapat dilihat di seluruh aplikasi

## Struktur Data User

```javascript
{
  foto: "URL foto profil",
  nama: "Nama Lengkap",
  email: "email@example.com",
  gender: "Laki-laki/Perempuan/Lainnya",
  dob: "YYYY-MM-DD",
  noTelepon: "081234567890",
  username: "username",
  role: "user/admin"
}
```

## Catatan Penting

1. **Data Persisten**: Data user disimpan di localStorage, sehingga akan tetap ada setelah browser ditutup
2. **Real-time Update**: Perubahan data user akan langsung terlihat di seluruh aplikasi
3. **Fallback Data**: Jika email tidak ditemukan di `userProfiles.js`, sistem akan menggunakan data default
4. **Event System**: Sistem menggunakan custom event `loginStatusChanged` untuk update komponen lain

## Troubleshooting

### Jika data tidak berubah:

1. Periksa apakah email yang dimasukkan ada di `userProfiles.js`
2. Periksa localStorage di browser developer tools
3. Pastikan event `loginStatusChanged` ter-trigger dengan benar

### Jika data tidak tersimpan:

1. Periksa apakah localStorage tersedia di browser
2. Periksa console untuk error JavaScript
3. Pastikan format data JSON valid
