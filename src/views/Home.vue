<template>
  <section class="promo-slider">
    <swiper :modules="[Pagination, Autoplay]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 3000 }" pagination class="promo-swiper">
      <swiper-slide v-for="promo in promos" :key="promo.id">
        <!-- 🔗 tautan -->
        <a :href="promo.link">
          <img :src="promo.image" :alt="'Promo ' + promo.id" class="promo-img" />
        </a>
      </swiper-slide>
    </swiper>
  </section>

  <section class="special-products">
    <h2 class="section-title">Special Products</h2>

    <!-- ✅ Desktop: Grid -->
    <div v-if="!isMobile">
      <div class="product-grid">
        <router-link v-for="product in products" :key="product.id" :to="`/produk/${product.id}`" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-img" />
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ product.price }}</p>
        </router-link>

        <!-- Tombol lihat semua -->
        <router-link to="/produk" class="product-card see-more-card">
          <div class="see-more-button">Lihat Semua Produk <i class="fas fa-chevron-right"></i></div>
        </router-link>
      </div>
    </div>

    <swiper v-else :slides-per-view="2.2" :space-between="12" :modules="[Pagination]" pagination class="mobile-product-swiper">
      <swiper-slide v-for="product in products" :key="product.id">
        <router-link :to="`/produk/${product.id}`" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-img" />
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ product.price }}</p>
        </router-link>
      </swiper-slide>

      <!-- ✅ Slide terakhir: Tombol -->
      <swiper-slide>
        <div class="see-more-slide">
          <button class="see-more-button" @click="$router.push('/produk')">Lihat Semua Produk <i class="fas fa-chevron-right"></i></button>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
/* ----------------- import Swiper dan modul ----------------- */
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ----------------- reaktif: deteksi layar mobile ----------------- */
import { ref, onMounted, onUnmounted } from "vue";

const isMobile = ref(false);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

/* ----------------- data slider promo ----------------- */
const promos = [
  { id: 1, image: "https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png", link: "/promo/diskon-50" },
  { id: 2, image: "https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png", link: "/promo/beli-2-gratis-1" },
  { id: 3, image: "https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png", link: "/promo/free-ongkir" },
];

/* ----------------- data produk ----------------- */
const products = [
  { id: 1, name: "Buku Premium Tahan Air Dan Api", price: "Rp 25.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/24042025082812-50660.png" },
  { id: 2, name: "Calender Bisa Di Taruh Di Dinding", price: "Rp 30.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/23082023145505-90668.jpg" },
  { id: 3, name: "Gelas Gambar K‑pop Bisa Di Custom", price: "Rp 40.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/09092021084017-31752.jpeg" },
  { id: 4, name: "New Normal", price: "Rp 50.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/02092021160002-80908.jpeg" },
  { id: 5, name: "Buku Tulis Campus", price: "Rp 15.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/29062022094902-28336.jpeg" },
];

/* ------ export variabel yang dipakai di template ------ */
defineExpose({ isMobile, promos, products });
</script>

<style scoped>
.promo-slider {
  width: 100%;
  max-width: 1000px; /* tetap besar di desktop */
  margin: 2rem auto;
  padding: 6rem 1rem 0 1rem; /* added top padding to avoid navbar overlap */
  box-sizing: border-box;
}

.promo-swiper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.promo-img {
  width: 100%;
  max-width: 100%; /* ✅ Biar nggak keluar dari parent */
  height: auto; /* ✅ Supaya tinggi menyesuaikan lebar */
  object-fit: cover; /* ✅ Tambahan opsional jika ingin crop */
  display: block;
}

/* Indikator bullet */
:deep(.swiper-pagination-bullet) {
  background: #e85423;
  opacity: 0.5;
  transition: opacity 0.3s;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

@media (max-width: 768px) {
  .promo-img {
    height: auto; /* bisa disesuaikan, atau biarkan auto */
    max-height: 250px;
  }
}

.special-products {
  padding: 2rem 1rem 4rem;
  max-width: 1000px; /* ❗ Sama seperti .promo-slider */
  margin: 0 auto;
  text-align: left;
}

.section-title {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Increased min width from 160px to 200px */
  gap: 0.4rem;
  justify-content: center;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 200px; /* Increased max-width from 140px to 200px */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  cursor: pointer;
  min-height: 220px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-card router-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-img {
  width: 100%;
  height: 160px; /* ⬆️ Dulu 140px, sekarang sedikit lebih tinggi */
  object-fit: cover;
  display: block;
}

.product-name {
  padding: 0.8rem; /* ⬆️ Dulu 0.6rem */
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
  min-height: 50px;
}

.product-price {
  font-size: 0.9rem;
  color: #e85423;
  font-weight: 600;
  margin-top: -0.3rem;
  padding-bottom: 0.6rem;
}

.see-more-button {
  margin: 0rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #e85423;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 320px; /* Biar tetap proporsional */
}

.see-more-button:hover {
  background-color: #c5481e;
}

.see-more-button i {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); /* lebih ramping di HP */
  }
}

@media (max-width: 768px) {
  .see-more-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 5rem 2rem;
  }

  .see-more-button {
    width: 100%;
    max-width: 140px; /* Match product card max-width */
    margin: -48px;
    font-size: 0.85rem; /* optional, to match */
    padding: 0.8rem 1rem; /* Adjust padding to better match card height */
    min-height: 220px; /* Match product card min-height */
  }

  /* Hide swiper pagination dots on mobile */
  :deep(.swiper-pagination) {
    display: none;
  }
}

@media (min-width: 769px) {
  .see-more-desktop {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>
