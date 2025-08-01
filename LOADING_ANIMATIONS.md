# Loading Animation System

Sistem loading animation yang telah diimplementasikan untuk memberikan pengalaman pengguna yang lebih smooth dan responsif.

## Komponen Loading

### 1. LoadingSpinner.vue

Komponen spinner loading dengan animasi berputar yang dapat digunakan untuk loading global.

**Fitur:**

- Animasi spinner dengan 3 ring yang berputar
- Text loading yang dapat dikustomisasi
- Backdrop blur effect
- Responsive design

**Penggunaan:**

```vue
<LoadingSpinner :show="isLoading" text="Memuat data..." />
```

### 2. LoadingProgress.vue

Progress bar yang muncul di bagian atas halaman saat loading.

**Fitur:**

- Progress bar dengan gradient warna
- Animasi pulse
- Fixed position di bagian atas

**Penggunaan:**

```vue
<LoadingProgress :show="isLoading" />
```

### 3. ProductSkeleton.vue

Skeleton loading untuk komponen produk dengan shimmer effect.

**Fitur:**

- Shimmer animation
- Responsive design
- Meniru struktur produk card

**Penggunaan:**

```vue
<ProductSkeleton v-for="n in 8" :key="n" />
```

### 4. HomeSkeleton.vue

Skeleton loading untuk halaman home.

**Fitur:**

- Banner skeleton
- Promo section skeleton
- Products grid skeleton
- Shimmer effect

### 5. ProductDetailSkeleton.vue

Skeleton loading untuk halaman detail produk.

**Fitur:**

- Image gallery skeleton
- Product info skeleton
- Action buttons skeleton

### 6. SearchResultsSkeleton.vue

Skeleton loading untuk halaman hasil pencarian.

**Fitur:**

- Search header skeleton
- Results grid skeleton
- Filter section skeleton

## Implementasi di Halaman

### CategoryPage.vue

- Loading spinner saat perpindahan kategori
- Skeleton loading untuk produk
- Loading state saat filter dan sorting

### Home.vue

- Skeleton loading saat pertama kali load
- Smooth transition ke konten asli

### ProductDetail.vue

- Skeleton loading untuk detail produk
- Loading state saat navigasi antar produk

### SearchResults.vue

- Skeleton loading untuk hasil pencarian
- Loading state saat query berubah

## CSS Animations

### Global Animations

- `fadeIn`: Animasi fade in dengan translateY
- `slideIn`: Animasi slide dari kiri
- `scaleIn`: Animasi scale dari 0.95 ke 1
- `shimmer`: Animasi shimmer effect
- `pulse`: Animasi pulse untuk text

### Utility Classes

- `.loading-fade`: Menerapkan animasi fadeIn
- `.loading-slide`: Menerapkan animasi slideIn
- `.loading-scale`: Menerapkan animasi scaleIn
- `.shimmer-effect`: Menerapkan shimmer effect
- `.hover-lift`: Hover effect dengan lift

### Page Transitions

- `.page-enter-active`: Transisi masuk halaman
- `.page-leave-active`: Transisi keluar halaman
- `.page-enter-from`: State awal transisi masuk
- `.page-leave-to`: State akhir transisi keluar

## Router Integration

### Global Loading State

Router telah dikonfigurasi untuk menampilkan loading animation saat perpindahan halaman:

```javascript
// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading = true;
    window.dispatchEvent(new CustomEvent("route-loading", { detail: { loading: true } }));
  }
  // ... rest of the logic
});

// Hide loading after route change
router.afterEach((to, from) => {
  if (to.path !== from.path) {
    setTimeout(() => {
      isLoading = false;
      window.dispatchEvent(new CustomEvent("route-loading", { detail: { loading: false } }));
    }, 300);
  }
});
```

### App.vue Integration

App.vue mendengarkan event loading dari router dan menampilkan loading components:

```vue
<template>
  <LoadingProgress :show="isRouteLoading" />
  <LoadingSpinner :show="isRouteLoading" text="Memuat halaman..." />
</template>
```

## Best Practices

### 1. Loading Time

- Gunakan loading time yang cukup untuk memberikan feedback visual
- Jangan terlalu cepat (kurang dari 300ms) atau terlalu lambat (lebih dari 2 detik)

### 2. Skeleton Loading

- Gunakan skeleton yang meniru struktur konten asli
- Berikan shimmer effect untuk menunjukkan loading state
- Responsive design untuk mobile dan desktop

### 3. Progress Indication

- Gunakan progress bar untuk operasi yang memakan waktu lama
- Berikan feedback text yang informatif

### 4. Error Handling

- Pastikan loading state di-reset saat terjadi error
- Berikan fallback UI jika loading gagal

## Customization

### Warna Loading

Untuk mengubah warna loading, edit CSS variables di `style.css`:

```css
:root {
  --loading-primary: #e85423;
  --loading-secondary: #ff6b35;
  --loading-accent: #ff8c42;
}
```

### Durasi Animasi

Untuk mengubah durasi animasi, edit timing di komponen:

```css
.loading-spinner {
  animation-duration: 1.2s; /* Default: 1.2s */
}

.shimmer {
  animation-duration: 1.5s; /* Default: 1.5s */
}
```

## Performance Considerations

1. **Lazy Loading**: Komponen loading di-load secara lazy untuk mengurangi bundle size
2. **CSS Animations**: Menggunakan CSS animations untuk performa yang lebih baik
3. **Debouncing**: Loading state di-debounce untuk menghindari flickering
4. **Memory Management**: Loading state di-cleanup saat komponen di-unmount

## Browser Support

Sistem loading animation mendukung:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Untuk browser yang lebih lama, fallback ke loading spinner sederhana.
