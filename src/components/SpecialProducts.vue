<template>
  <section class="special-products">
    <div class="section-header">
      <h2 class="section-title">Special Products</h2>
      <button class="see-more-button top-right" @click="$router.push('/produk')">Lihat Semua Produk <i class="fas fa-chevron-right"></i></button>
    </div>

    <!-- suma.png is now outside the swiper-container -->
    <div v-if="!isMobile" class="suma-background" :class="{ 'slide-out': activeIndex > 0, 'slide-in': activeIndex === 0 }"></div>

    <div v-if="!isMobile" class="swiper-container">
      <swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="6.2"
        :space-between="5"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        class="desktop-product-swiper"
        :pagination="false"
        @slideChange="handleSlideChange"
      >
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
      <!-- Custom Navigation Buttons -->
      <button class="swiper-button-prev-custom">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="swiper-button-next-custom">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <swiper v-else :slides-per-view="2.2" :space-between="12" :modules="[Pagination]" :pagination="false" class="mobile-product-swiper" @slideChange="handleSlideChangeMobile">
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bgSuma from "@/assets/suma.png";
import { ref } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  isMobile: {
    type: Boolean,
    required: true,
  },
});

const activeIndex = ref(0);
const activeIndexMobile = ref(0);

function handleSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
}

function handleSlideChangeMobile(swiper) {
  activeIndexMobile.value = swiper.activeIndex;
}
</script>

<style scoped>
.special-products {
  padding: 4rem 0.5rem 4rem;
  max-width: 1110px;
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
  margin-bottom: 13px;
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

.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 158px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
  transition: transform 0.2s ease;
  cursor: pointer;
  height: 290px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: block;
  text-decoration: none;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-slide {
  position: relative;
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  display: block;
  background-color: #f5f5f5;
}

.product-name-price {
  position: relative;
  padding: 0 0.8rem;
  height: 5rem;
}

.product-name {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
  display: block;
  height: auto;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
}

.product-price {
  position: absolute;
  bottom: 0;
  left: 0.8rem;
  font-size: 0.9rem;
  color: #e85423;
  font-weight: 600;
  margin: 0;
  padding: 0;
  display: block;
  text-align: left;
  width: calc(100% - 1.6rem);
}

.product-price {
  margin-top: 0.1rem;
}

.product-official {
  font-size: 0.7rem;
  color: #000;
  opacity: 0.5;
  margin: 0.5rem 0 0.2rem 0.8rem;
  display: block;
  text-align: left;
}

.suma-background {
  position: absolute;
  left: 0;
  top: 120px;
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
}

.swiper-button-prev-custom,
.swiper-button-next-custom {
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

.swiper-container:hover .swiper-button-prev-custom,
.swiper-container:hover .swiper-button-next-custom {
  opacity: 1;
  visibility: visible;
}

.swiper-button-prev-custom {
  left: -20px;
}

.swiper-button-next-custom {
  right: -20px;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: #e85423;
  color: white;
}

@media (max-width: 768px) {
  .special-products {
    padding: 0 1rem 4rem;
  }

  .section-header {
    padding: 0 0.5rem;
    flex-wrap: nowrap; /* Prevent wrapping */
    align-items: center; /* Ensure vertical alignment */
  }

  .section-title {
    white-space: nowrap; /* Prevent title from wrapping */
    font-size: 1.2rem; /* Slightly reduce font size */
  }

  .see-more-button.top-right {
    white-space: nowrap; /* Prevent button text from wrapping */
    font-size: 0.75rem; /* Slightly reduce font size */
    padding: 0.25rem 0.2rem; /* Adjust padding */
    margin-bottom: 15px;
  }
}

/* For very narrow screens like Samsung Fold */
@media (max-width: 480px) {
  .mobile-product-swiper {
    --swiper-slides-per-view: 1.5;
    --swiper-space-between: 10;
  }
}
</style>
