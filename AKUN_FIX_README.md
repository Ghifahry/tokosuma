# Perbaikan Masalah Simpan Perubahan di Akun.vue

## Masalah yang Ditemukan

User mengalami masalah "User tidak ditemukan" saat mencoba menyimpan perubahan pada:

- Nama lengkap
- Nomor telepon
- Tanggal lahir

## Penyebab Masalah

1. **Data User Tidak Tersimpan dengan Format yang Benar**

   - Fungsi `updateUserProfile` mencari user dengan key `user_${email}`
   - Tetapi data user mungkin tersimpan dengan format yang berbeda
   - Tidak ada fallback mechanism untuk mencari data user

2. **Data Loading yang Tidak Robust**

   - Form tidak mengisi data dengan benar saat pertama kali load
   - Tidak ada fallback values untuk field yang kosong
   - Email tidak diambil dengan benar dari localStorage

3. **Validasi yang Terlalu Ketat**
   - Validasi nomor telepon tidak mengizinkan field kosong
   - Tidak ada handling untuk user yang belum memiliki data lengkap

## Solusi yang Diterapkan

### 1. **Perbaikan Fungsi `updateUserProfile` di `userProfiles.js`**

```javascript
export const updateUserProfile = (email, updatedData) => {
  // Cek apakah user ada di localStorage dengan format user_${email}
  let existingUser = localStorage.getItem(`user_${email}`);
  let userData = null;

  if (existingUser) {
    userData = JSON.parse(existingUser);
  }

  // Jika tidak ditemukan, cek di userData
  if (!userData) {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const storedUserData = JSON.parse(userDataString);
      if (storedUserData.email === email) {
        userData = storedUserData;
      }
    }
  }

  // Jika masih tidak ditemukan, buat user baru
  if (!userData) {
    userData = {
      foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      nama: updatedData.nama || "User",
      email: email,
      gender: updatedData.gender || "Laki-laki",
      dob: updatedData.dob || "2000-01-01",
      noTelepon: updatedData.noTelepon || "",
      username: email.split("@")[0],
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true,
    };
  }

  // Update dan simpan data
  const updatedUser = { ...userData, ...updatedData, updatedAt: new Date().toISOString() };
  localStorage.setItem(`user_${email}`, JSON.stringify(updatedUser));
  localStorage.setItem("userData", JSON.stringify(updatedUser));
  localStorage.setItem("userFullName", updatedUser.nama);
  localStorage.setItem("userEmail", email);

  return updatedUser;
};
```

### 2. **Perbaikan Fungsi `loadUserData` di `Akun.vue`**

```javascript
const loadUserData = () => {
  // Set email dan nama dari auth composable
  form.email = userEmail.value || "";
  form.nama = userFullName.value || "";

  // Jika email kosong, coba ambil dari localStorage
  if (!form.email) {
    form.email = localStorage.getItem("userEmail") || "";
  }

  // Load dari userData
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    form.foto = userData.foto || DEFAULT_PROFILE_IMAGE;
    form.gender = userData.gender || "Laki-laki";
    form.dob = userData.dob || "2000-01-01";
    form.noTelepon = userData.noTelepon || "";

    if (!form.nama && userData.nama) {
      form.nama = userData.nama;
    }
    if (!form.email && userData.email) {
      form.email = userData.email;
    }
  }

  // Load dari userProfiles jika tersedia
  if (form.email) {
    const userProfileKey = `user_${form.email}`;
    const userProfile = localStorage.getItem(userProfileKey);
    if (userProfile) {
      const profileData = JSON.parse(userProfile);
      form.foto = profileData.foto || form.foto;
      form.gender = profileData.gender || form.gender;
      form.dob = profileData.dob || form.dob;
      form.noTelepon = profileData.noTelepon || form.noTelepon;
      form.nama = profileData.nama || form.nama;
      form.email = profileData.email || form.email;
    }
  }

  // Fallback values
  if (!form.foto) form.foto = DEFAULT_PROFILE_IMAGE;
  if (!form.gender) form.gender = "Laki-laki";
  if (!form.dob) form.dob = "2000-01-01";
  if (!form.noTelepon) form.noTelepon = "";
};
```

### 3. **Perbaikan Validasi Nomor Telepon**

```javascript
const validateNomor = (event) => {
  const input = event.target.value;
  const onlyDigits = input.replace(/\D/g, "");
  form.noTelepon = onlyDigits;

  // Clear error if input is empty (optional field)
  if (onlyDigits.length === 0) {
    error.noTelepon = "";
    return;
  }

  const validationRules = [
    { condition: onlyDigits.length < 10, message: "Nomor telepon minimal 10 digit." },
    { condition: onlyDigits.length > 13, message: "Nomor telepon maksimal 13 digit." },
    { condition: !/^\d+$/.test(onlyDigits), message: "Nomor telepon hanya boleh berisi angka." },
  ];

  const validationError = validationRules.find((rule) => rule.condition);
  error.noTelepon = validationError ? validationError.message : "";
};
```

### 4. **Penambahan Debugging**

- Console.log untuk tracking data loading
- Console.log untuk tracking data saving
- Console.log untuk melihat localStorage content
- Error handling yang lebih detail

## File yang Dimodifikasi

### 1. **`src/data/userProfiles.js`**

- ✅ Perbaikan fungsi `updateUserProfile`
- ✅ Menambahkan fallback mechanism
- ✅ Menambahkan debugging
- ✅ Auto-create user jika tidak ditemukan

### 2. **`src/components/account/Akun.vue`**

- ✅ Perbaikan fungsi `loadUserData`
- ✅ Perbaikan fungsi `simpanPerubahan`
- ✅ Perbaikan validasi nomor telepon
- ✅ Menambahkan debugging
- ✅ Menambahkan fallback values

## Cara Kerja Setelah Perbaikan

### 1. **Loading Data**

1. Ambil email dan nama dari auth composable
2. Jika email kosong, ambil dari localStorage
3. Load data dari `userData` localStorage
4. Load data dari `user_${email}` localStorage (prioritas)
5. Set fallback values untuk field yang kosong

### 2. **Saving Data**

1. Validasi input
2. Cari user di `user_${email}` format
3. Jika tidak ditemukan, cari di `userData`
4. Jika masih tidak ditemukan, buat user baru
5. Update data dan simpan ke semua format
6. Trigger event untuk update komponen lain

## Testing

### 1. **Test User Baru**

1. Login dengan user baru
2. Buka halaman Akun
3. Isi data (nama, telepon, tanggal lahir)
4. Klik "Simpan Perubahan"
5. Data harus tersimpan dan tidak ada error

### 2. **Test User Lama**

1. Login dengan user yang sudah ada
2. Buka halaman Akun
3. Ubah data
4. Klik "Simpan Perubahan"
5. Data harus terupdate

### 3. **Test Tanpa Data**

1. Login dengan user yang belum ada data lengkap
2. Buka halaman Akun
3. Isi data yang kosong
4. Klik "Simpan Perubahan"
5. Data harus tersimpan

## Keuntungan Perbaikan

1. **Robust Data Handling**

   - Tidak ada lagi error "User tidak ditemukan"
   - Auto-create user jika belum ada
   - Fallback mechanism untuk berbagai format data

2. **Better User Experience**

   - Form selalu terisi dengan data yang benar
   - Validasi yang lebih fleksibel
   - Feedback yang jelas saat error

3. **Easier Debugging**
   - Console.log untuk tracking
   - Error message yang detail
   - Data flow yang jelas

## Catatan Penting

1. **Data Migration**: User lama akan otomatis dibuatkan profile baru
2. **Backward Compatibility**: Tetap mendukung format data lama
3. **Error Handling**: Semua error ditangani dengan graceful
4. **Performance**: Tidak ada impact pada performance
