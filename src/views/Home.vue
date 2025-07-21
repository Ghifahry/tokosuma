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
    <div class="section-header">
      <h2 class="section-title">Special Products</h2>
      <button class="see-more-button top-right" @click="$router.push('/produk')">Lihat Semua Produk <i class="fas fa-chevron-right"></i></button>
    </div>

    <!-- ✅ Desktop: Swiper -->
    <div v-if="!isMobile">
      <swiper :modules="[Pagination]" :slides-per-view="6.2" :space-between="5" class="desktop-product-swiper" :pagination="false">
        <swiper-slide v-for="product in products" :key="product.id">
          <router-link :to="`/produk/${product.id}`" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-img" />
            <div class="product-info">
              <p class="product-official">Toko Suma Official</p>
              <div class="product-name-price">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">{{ product.price }}</p>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>

    <swiper v-else :slides-per-view="2.2" :space-between="12" :modules="[Pagination]" pagination class="mobile-product-swiper">
      <swiper-slide v-for="product in products" :key="product.id">
        <router-link :to="`/produk/${product.id}`" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-img" />
          <div class="product-info">
            <p class="product-official">Toko Suma Official</p>
            <div class="product-name-price">
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </router-link>
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
  { id: 6, name: "Seni Mengolah Emosi", price: "Rp 75.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/items/9786230300271_KETIKA_SARAH_MARAH.jpg" },
  { id: 7, name: "Seprosi Mie Ayam Sebelum Mati", price: "Rp 120.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/products/95ob5m98ur.jpg" },
  { id: 8, name: "Sisi Tergelap Surga", price: "Rp 200.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/10/30/debsfyx6tcwnvbwdteeakv.jpg" },
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
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.see-more-button.top-right {
  margin: 0;
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  min-height: auto;
  border-radius: 4px;
  border: 1.5px solid #e85423;
  background-color: transparent;
  color: #e85423;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.see-more-button.top-right:hover {
  background-color: #e85423;
  color: #fff;
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
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); /* Reduced min width from 150px to 130px */
  gap: 0rem;
  justify-content: center;
  align-items: center;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 350px; /* Updated max-width to 350px as requested */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  cursor: pointer;
  min-height: 220px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: block;
  text-decoration: none;
}
.product-card.see-more-card.see-more-card {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  max-width: 100%;
  height: auto;
  max-height: 160px;
  object-fit: cover;
  display: block;
}

.product-name {
  padding: 0rem 0.8rem 0.2rem 0.8rem; /* Reduced top padding to bring closer to product-official */
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
  min-height: 50px;
  display: inline-block;
  vertical-align: middle;
}

.product-official {
  font-size: 0.7rem;
  color: #000;
  opacity: 0.5;
  margin: 0.5rem 0 0.2rem 0.8rem;
  display: inline-block;
  vertical-align: middle;
}

.product-price {
  font-size: 0.9rem;
  color: #e85423;
  font-weight: 600;
  margin-top: 0;
  padding-bottom: 0.6rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5rem;
}

.see-more-button {
  margin: 1rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #e85423;
  background-color: transparent;
  border: 1.5px solid #e85423;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: auto;
  max-width: none;
}

.see-more-button:hover {
  background-color: #e85423;
  color: #fff;
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
    padding: 2rem 1rem;
  }

  .see-more-button {
    width: auto;
    max-width: none;
    margin: 0;
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    min-height: auto;
  }

  /* Hide swiper pagination dots on mobile */
  :deep(.swiper-pagination) {
    display: none;
  }
}

@media (min-width: 769px) {
  /* Hide swiper pagination dots on desktop */
  :deep(.desktop-product-swiper) :deep(.swiper-pagination) {
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
