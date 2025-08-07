# Sistem Deteksi Login untuk Cart

## Deskripsi

Sistem telah diimplementasikan untuk mendeteksi status login user sebelum melakukan operasi cart seperti "Tambah ke Cart" dan "Beli". Jika user belum login, sistem akan redirect ke halaman login dengan pesan yang sesuai.

## Fitur yang Diimplementasikan

### 1. **Deteksi Status Login**

- Mengecek apakah user sudah login melalui localStorage
- Validasi sebelum operasi cart
- Redirect otomatis ke halaman login jika belum login

### 2. **Fungsi Cart dengan Autentikasi**

- `addToCartWithAuth()`: Menambah ke cart dengan validasi login
- `buyNowWithAuth()`: Beli sekarang dengan validasi login
- `checkoutWithAuth()`: Checkout dengan validasi login

### 3. **Pesan Redirect yang Informatif**

- Pesan spesifik untuk setiap operasi cart
- Tampilan pesan di halaman login
- Auto-clear pesan setelah ditampilkan

## Cara Kerja

### 1. **Tambah ke Cart**

```javascript
// User klik "Tambah ke Cart"
if (!checkLoginStatus()) {
  redirectToLogin("Silakan login terlebih dahulu untuk menambahkan produk ke keranjang");
  return false;
}
// Proses add to cart jika sudah login
```

### 2. **Beli Sekarang**

```javascript
// User klik "Beli Sekarang"
if (!checkLoginStatus()) {
  redirectToLogin("Silakan login terlebih dahulu untuk membeli produk");
  return false;
}
// Proses beli sekarang jika sudah login
```

### 3. **Checkout**

```javascript
// User klik "Checkout"
if (!checkLoginStatus()) {
  redirectToLogin("Silakan login terlebih dahulu untuk melakukan checkout");
  return false;
}
// Proses checkout jika sudah login
```

## File yang Dimodifikasi

### 1. **`src/composables/useCart.js`**

- ✅ Menambahkan `checkLoginStatus()`
- ✅ Menambahkan `redirectToLogin()`
- ✅ Menambahkan `addToCartWithAuth()`
- ✅ Menambahkan `buyNowWithAuth()`
- ✅ Menambahkan `checkoutWithAuth()`

### 2. **`src/views/products/ProductDetails.vue`**

- ✅ Import `useCart` composable
- ✅ Update fungsi `addToCart()` untuk menggunakan `addToCartWithAuth()`
- ✅ Update fungsi `buyNow()` untuk menggunakan `buyNowWithAuth()`

### 3. **`src/views/Cart.vue`**

- ✅ Import `useCart` composable
- ✅ Update fungsi `checkout()` untuk menggunakan `checkoutWithAuth()`

### 4. **`src/views/auth/Login.vue`**

- ✅ Menambahkan tampilan pesan redirect
- ✅ Menambahkan method `checkRedirectMessage()`
- ✅ Menambahkan style untuk pesan redirect

## Fungsi yang Tersedia

### 1. **checkLoginStatus()**

```javascript
const isLoggedIn = checkLoginStatus();
// Returns: true/false
```

### 2. **redirectToLogin(message)**

```javascript
redirectToLogin("Pesan kustom untuk user");
// Redirect ke halaman login dengan pesan
```

### 3. **addToCartWithAuth(product, quantity)**

```javascript
const success = addToCartWithAuth(productData, 2);
// Returns: true jika berhasil, false jika belum login
```

### 4. **buyNowWithAuth(product, quantity)**

```javascript
const success = buyNowWithAuth(productData, 1);
// Returns: true jika berhasil, false jika belum login
```

### 5. **checkoutWithAuth()**

```javascript
const success = checkoutWithAuth();
// Returns: true jika berhasil, false jika belum login
```

## Pesan Redirect yang Tersedia

1. **Tambah ke Cart**: "Silakan login terlebih dahulu untuk menambahkan produk ke keranjang"
2. **Beli Sekarang**: "Silakan login terlebih dahulu untuk membeli produk"
3. **Checkout**: "Silakan login terlebih dahulu untuk melakukan checkout"

## Testing

### 1. **Test tanpa Login**

1. Buka produk detail
2. Klik "Tambah ke Cart" atau "Beli Sekarang"
3. Sistem akan redirect ke halaman login
4. Pesan akan muncul di halaman login

### 2. **Test dengan Login**

1. Login terlebih dahulu
2. Buka produk detail
3. Klik "Tambah ke Cart" atau "Beli Sekarang"
4. Operasi akan berhasil tanpa redirect

### 3. **Test Checkout**

1. Buka halaman Cart
2. Pilih produk
3. Klik "Checkout"
4. Jika belum login, akan redirect ke login
5. Jika sudah login, akan ke halaman payment

## Keuntungan

1. **User Experience yang Lebih Baik**

   - Pesan yang jelas mengapa perlu login
   - Redirect otomatis ke halaman login
   - Tidak ada kebingungan user

2. **Keamanan**

   - Validasi login sebelum operasi cart
   - Mencegah operasi cart tanpa autentikasi
   - Data cart terproteksi

3. **Maintenance yang Mudah**
   - Fungsi terpusat di composable
   - Reusable di seluruh aplikasi
   - Mudah untuk diupdate

## Catatan Penting

1. **Pesan Redirect**: Disimpan di localStorage dan auto-clear setelah ditampilkan
2. **Cart Data**: Tetap tersimpan di localStorage meskipun belum login
3. **Session Management**: Menggunakan localStorage untuk status login
4. **Error Handling**: Setiap fungsi memiliki error handling yang proper
