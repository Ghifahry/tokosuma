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
      <swiper :modules="[Pagination]" :slides-per-view="6.2" :space-between="5" class="desktop-product-swiper" :pagination="false" @slideChange="handleSlideChange">
        <swiper-slide v-for="(product, index) in products" :key="product.id" class="product-slide">
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
      <div
        class="suma-background"
        :class="{ 'slide-out': activeIndex > 0, 'slide-in': activeIndex === 0 }"
        :style="{
          position: 'absolute',
          left: '0',
          top: '40px' /* moved down further */,
          width: '240px',
          height: '100%',
          backgroundImage: `url(${bgSuma})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease, opacity 0.5s ease',
          transform: activeIndex > 0 ? 'translateX(-220px)' : 'translateX(0)',
          opacity: activeIndex > 0 ? 0 : 1,
        }"
      ></div>
    </div>

    <swiper v-else :slides-per-view="2.2" :space-between="12" :modules="[Pagination]" pagination class="mobile-product-swiper" @slideChange="handleSlideChangeMobile">
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

  <section class="blog-section">
    <div class="section-header">
      <h2 class="section-title">Blogs</h2>
    </div>

    <!-- ⬅️ Tanda panah di luar swiper -->
    <div class="blog-button-prev"><i class="fas fa-chevron-left"></i></div>
    <div class="blog-button-next"><i class="fas fa-chevron-right"></i></div>

    <swiper
      ref="blogSwiper"
      :modules="[Navigation]"
      :slides-per-view="isMobile ? 1.2 : 3"
      :space-between="16"
      :navigation="{
        nextEl: '.blog-button-next',
        prevEl: '.blog-button-prev',
      }"
      class="blog-swiper"
    >
      <swiper-slide v-for="blog in blogs" :key="blog.id" class="blog-slide">
        <router-link :to="`/blog/${blog.id}`" class="blog-card">
          <img :src="blog.image" :alt="blog.title" class="blog-img" />
          <div class="blog-content">
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-snippet">{{ blog.snippet }}</p>
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
import bgSuma from "@/assets/suma.png";

import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const swiperInstance = ref(null);
const activeIndex = ref(0);

function handleSwiper(swiper) {
  swiperInstance.value = swiper;
  activeIndex.value = swiper.activeIndex;
}

function handleSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
}

const activeIndexMobile = ref(0);

function handleSlideChangeMobile(swiper) {
  activeIndexMobile.value = swiper.activeIndex;
}

/* ----------------- reaktif: deteksi layar mobile ----------------- */

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
defineExpose({ isMobile, promos, products, router });

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const blogs = [
  {
    id: 1,
    title: "Cara Membuat Kerajinan Dari Kertas",
    snippet: "Pelajari teknik dasar membuat kerajinan tangan dari bahan sederhana.",
    image: "https://i.pinimg.com/736x/b6/03/f4/b603f46c6ac1fef4302e1c845980250a.jpg",
  },
  {
    id: 2,
    title: "5 Tips Menulis Buku Pertama",
    snippet: "Langkah-langkah mudah untuk mulai menulis buku pertamamu.",
    image: "https://i.pinimg.com/736x/90/03/56/900356e7d4b2e96f22eb94afcd014e76.jpg",
  },
  {
    id: 3,
    title: "Inspirasi Desain Kalender Dinding",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://i.pinimg.com/736x/cf/8e/0e/cf8e0eee48b8279dc940c211b70239ed.jpg",
  },
  {
    id: 4,
    title: "Film Sore Istri Dari Masa Depan Meluap?",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://i.pinimg.com/736x/4b/8b/98/4b8b9824d8d28cf0b35775a7e27ac202.jpg",
  },
  {
    id: 5,
    title: "Codingan Emang Seribet Itu?",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://i.pinimg.com/736x/56/67/93/5667936906181a6fbe0501b471e2b5bd.jpg",
  },
];
</script>

<style scoped>
.promo-slider {
  width: 100%;
  max-width: 1150px; /* tetap besar di desktop */
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
  padding: 4rem 0.5rem 4rem; /* increased top padding to shift product cards down */
  max-width: 1110px; /* ❗ Sama seperti .promo-slider */
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 1;
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
  margin-left: -0.2rem;
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
  height: 300px; /* fixed height for all cards */
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

.product-slide {
  position: relative;
}

.product-slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  border-radius: 12px;
  opacity: 1;
  pointer-events: none;
  background-color: rgba(255, 0, 0, 0.2);
}

.slide-out {
  transform: translateX(-220px); /* hilang ke kiri */
  opacity: 0;
}

.slide-in {
  transform: translateX(0);
  opacity: 1;
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

  :deep(.desktop-product-swiper) {
    padding-left: 180px; /* shift all product cards to the right */
  }
}

@media (min-width: 769px) {
  .see-more-desktop {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
}

.mobile-product-swiper {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (max-width: 768px) {
  .suma-background.mobile {
    position: absolute;
    left: 0;
    top: 60px;
    width: 120px;
    height: 100%;
    z-index: 0;
  }

  .special-products {
    padding: 0 1rem 4rem; /* kasih kiri kanan padding biar sejajar dengan promo-slider */
  }

  .section-header {
    padding: 0 0.5rem; /* opsional, buat tombol dan judul tidak terlalu nempel di pinggir */
  }
}

.blog-section {
  max-width: 1110px;
  margin: 1rem auto 0;
  padding: 0 1rem;
  position: relative;
  overflow: visible;
}

.blog-swiper {
  position: relative;
}

.blog-slide {
  display: flex;
}

.blog-card {
  display: block;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.blog-content {
  padding: 1rem;
}

.blog-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #333;
}

.blog-snippet {
  font-size: 0.85rem;
  color: #555;
}

.blog-button-prev,
.blog-button-next {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  color: #e85423;
}

.blog-button-prev {
  left: -30px;
  top: 50%;
}
.blog-button-next {
  right: -30px;
  top: 50%;
}

@media (max-width: 768px) {
  .blog-button-prev,
  .blog-button-next {
    display: none;
  }
}
</style>
