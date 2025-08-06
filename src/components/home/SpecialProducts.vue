<template>
  <section class="special-products">
    <div class="section-header">
      <h2 class="section-title">Special Products</h2>
      <button class="see-more-button top-right" @click="$router.push('/produk')">Lihat Semua Produk <i class="fas fa-chevron-right"></i></button>
    </div>

    <!-- suma.png is now outside the swiper-container -->
    <div class="suma-background" :class="{ 'slide-out': activeIndex > 0, 'slide-in': activeIndex === 0 }"></div>

    <div v-if="!isMobile" class="swiper-container">
      <swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="6.2"
        :space-between="-230"
        :navigation="{
          nextEl: '.swiper-button-next-special-products',
          prevEl: '.swiper-button-prev-special-products',
        }"
        class="desktop-product-swiper"
        :pagination="false"
        @slideChange="handleSlideChange"
      >
        <swiper-slide v-for="(product, index) in products" :key="product.id" class="product-slide">
          <router-link :to="`/product/${slugify(product.name)}`" class="product-card">
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
      <!-- Custom Navigation Buttons -->
      <button class="swiper-button-prev-special-products">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="swiper-button-next-special-products">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div v-else class="mobile-swiper-container">
      <swiper :slides-per-view="2.4" :space-between="1" :modules="[Pagination]" :pagination="false" class="mobile-product-swiper" @slideChange="handleSlideChangeMobile">
        <swiper-slide v-for="product in products" :key="product.id">
          <router-link :to="`/product/${slugify(product.name)}`" class="product-card">
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
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bgSuma from "@/assets/suma.png";
import { ref } from "vue";

import { specialProducts } from "@/data/specialProducts.js";

const products = specialProducts;

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});

const activeIndex = ref(0);

function handleSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
}

function handleSlideChangeMobile(swiper) {
  activeIndex.value = swiper.activeIndex; // Use same activeIndex for mobile
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
</script>

<style scoped>
.special-products {
  padding: 2rem 1rem 4rem;
  max-width: 1220px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.see-more-button.top-right {
  margin-bottom: 13px;
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  min-height: auto;
  border-radius: 4px;
  border: 1.5px solid #ffffff;
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
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 2rem;
  margin-left: -0.2rem;
}

.product-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  width: 155px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
  transition: transform 0.2s ease;
  cursor: pointer;
  height: 280px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: block;
  text-decoration: none;
}

/* Responsive product card sizes */
@media (max-width: 768px) {
  .product-card {
    width: 130px;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .product-card {
    width: 130px;
    height: 240px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .product-card {
    width: 145px;
    height: 270px;
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .product-card {
    width: 150px;
    height: 275px;
  }
}

.product-card:hover {
  transform: translateY(-1px);
}

.product-slide {
  position: relative;
}

.product-img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  display: block;
  background-color: #ffffff;
}

.product-name-price {
  position: relative;
  padding: 0 0.8rem;
  height: 4.5rem;
}

.product-name {
  font-size: 0.75rem;
  color: #333;
  font-weight: 500;
  margin: 0;
  padding: 0;
  line-height: 1.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-width: 100%;
  height: 2.2rem;
}

.product-price {
  position: absolute;
  bottom: 0;
  left: 0.8rem;
  font-size: 0.8rem;
  color: #060606;
  font-weight: 600;
  margin: 0;
  padding: 0;
  display: block;
  text-align: left;
  width: calc(100% - 1.6rem);
}

.product-official {
  font-size: 0.7rem;
  color: #000;
  opacity: 0.5;
  margin: 0.3rem 0 0.1rem 0.8rem;
  display: block;
  text-align: left;
}

.suma-background {
  position: absolute;
  left: 18px;
  top: 100px;
  width: 230px;
  height: 350px;
  background-image: url("@/assets/suma.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  transition: transform 0.5s ease, opacity 0.5s ease;
  z-index: 0;
}

.desktop-product-swiper .swiper-wrapper {
  padding-left: 100px; /* shift slides right inside full-width slider */
}

.desktop-product-swiper .swiper-slide:first-child {
  padding-left: 11rem; /* shift first product card slightly right */
}

.slide-out {
  transform: translateX(-220px);
  opacity: 0;
}

.slide-in {
  transform: translateX(0);
  opacity: 1;
}

.swiper-container {
  position: relative;
  overflow: visible;
}

.swiper-button-prev-special-products,
.swiper-button-next-special-products {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e85423;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
}

.swiper-container:hover .swiper-button-prev-special-products,
.swiper-container:hover .swiper-button-next-special-products {
  opacity: 1;
  visibility: visible;
}

.swiper-button-prev-special-products {
  left: -20px;
}

.swiper-button-next-special-products {
  right: -20px;
}

/* Responsive navigation buttons */
@media (max-width: 1024px) {
  .swiper-button-prev-special-products,
  .swiper-button-next-special-products {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .swiper-button-prev-special-products {
    left: -15px;
  }

  .swiper-button-next-special-products {
    right: -15px;
  }
}

@media (max-width: 768px) {
  .swiper-button-prev-special-products,
  .swiper-button-next-special-products {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .swiper-button-prev-special-products {
    left: -10px;
  }

  .swiper-button-next-special-products {
    right: -10px;
  }
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: #e85423;
  color: white;
}

@media (max-width: 768px) {
  .special-products {
    padding: 1rem 1rem 2rem;
  }

  .section-header {
    padding: 0 0.5rem;
    flex-wrap: nowrap; /* Prevent wrapping */
    align-items: center; /* Ensure vertical alignment */
  }

  .section-title {
    white-space: nowrap; /* Prevent title from wrapping */
    font-size: 1.2rem;
    padding-right: 15px; /* Slightly reduce font size */
  }

  .see-more-button.top-right {
    white-space: nowrap; /* Prevent button text from wrapping */
    font-size: 0.75rem; /* Slightly reduce font size */
    padding: 0.25rem 0.2rem; /* Adjust padding */
    margin-bottom: 15px;
  }

  /* Mobile background suma styling */
  .suma-background {
    width: 260px;
    height: 290px;
    top: 90px;
    left: -11px;
  }

  .mobile-swiper-container {
    position: relative; /* Give space for suma background */
  }

  .mobile-product-swiper {
    margin-left: 5px;
    bottom: 20px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 10rem; /* shift first product card to accommodate bigger background */
  }

  /* Improve touch performance */
  .mobile-product-swiper .swiper-slide {
    touch-action: pan-y pinch-zoom;
  }

  /* Mobile slide animations */
  .slide-out {
    transform: translateX(-100px);
    opacity: 0;
  }

  .slide-in {
    transform: translateX(0);
    opacity: 1;
  }
}

/* For large desktop screens */
@media (min-width: 1201px) {
  .special-products {
    padding: 2rem 1rem 4rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .desktop-product-swiper .swiper-slide:first-child {
    padding-left: 11rem;
  }

  .suma-background {
    width: 230px;
    height: 350px;
    top: 100px;
    left: 18px;
  }
}

/* For very narrow screens like Samsung Fold */
@media (max-width: 480px) {
  .special-products {
    padding: 0.5rem 0.5rem 1.5rem;
  }

  .section-header {
    padding: 0 0.25rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .see-more-button.top-right {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    margin-bottom: 10px;
  }

  .product-img {
    height: 130px;
  }

  .product-name {
    font-size: 0.65rem;
    line-height: 0.9rem;
    height: 2rem;
    margin-bottom: 0.8rem;
    margin-top: -0.2rem;
  }

  .product-name-price {
    height: 4.5rem;
    padding: 0.7rem 0.5rem 0 0.5rem;
  }

  .product-price {
    font-size: 0.8rem;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
  }

  .product-official {
    font-size: 0.6rem;
    margin: 1rem 0 0.1rem 0.5rem;
  }

  .mobile-product-swiper {
    --swiper-slides-per-view: 2.4;
    --swiper-space-between: 1;
  }

  .suma-background {
    width: 200px;
    height: 250px;
    top: 50px;
    left: -5px;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 8rem;
  }
}

/* For tablet screens */
@media (min-width: 769px) and (max-width: 1024px) {
  .special-products {
    padding: 1.5rem 1rem 3rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .see-more-button.top-right {
    font-size: 0.8rem;
    padding: 0.25rem 0.7rem;
  }

  .mobile-product-swiper {
    --swiper-space-between: 1;
    --swiper-slides-per-view: 2.4;
  }

  .suma-background {
    width: 280px;
    height: 320px;
    top: 95px;
    left: -15px;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 12rem;
  }
}

/* For larger tablet screens */
@media (min-width: 1025px) and (max-width: 1200px) {
  .special-products {
    padding: 1.8rem 1rem 3.5rem;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .product-card {
    width: 150px;
    height: 265px;
  }

  .mobile-product-swiper {
    --swiper-space-between: 25; /* Even larger gap for larger tablets */
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 14rem; /* Increased padding for larger tablets */
  }

  .mobile-product-swiper {
    margin-left: 10px; /* Increased margin for larger tablets */
  }

  /* Larger tablet background suma styling */
  .suma-background {
    width: 300px;
    height: 350px;
    top: 100px;
    left: -20px;
  }
}
</style>
