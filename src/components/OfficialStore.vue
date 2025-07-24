<template>
  <section class="official-store">
    <div class="section-header">
      <h2 class="section-title">Official Store</h2>
    </div>

    <div v-if="!isMobile" class="swiper-container">
      <swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="5.2"
        :space-between="20"
        :navigation="{
          nextEl: '.swiper-button-next-official-store',
          prevEl: '.swiper-button-prev-official-store',
        }"
        class="desktop-store-swiper"
        :pagination="false"
        @slideChange="handleSlideChange"
      >
        <swiper-slide v-for="(store, index) in stores" :key="index" class="store-slide">
          <div class="store-card">
            <img :src="store.logo" :alt="store.name" class="store-logo" />
            <p class="store-name">{{ store.name }}</p>
          </div>
        </swiper-slide>
      </swiper>
      <!-- Custom Navigation Buttons -->
      <button class="swiper-button-prev-official-store">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="swiper-button-next-official-store">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <swiper v-else :slides-per-view="2.2" :space-between="10" :modules="[Pagination]" :pagination="false" class="mobile-store-swiper" @slideChange="handleSlideChangeMobile">
      <swiper-slide v-for="(store, index) in stores" :key="index">
        <div class="store-card">
          <img :src="store.logo" :alt="store.name" class="store-logo" />
          <p class="store-name">{{ store.name }}</p>
        </div>
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
import { ref } from "vue";

const props = defineProps({
  stores: {
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
.official-store {
  padding: 4rem 0.5rem 4rem;
  max-width: 1220px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  margin-left: -0.2rem;
}

.store-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
  transition: transform 0.2s ease;
  cursor: pointer;
  height: 180px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 1rem;
}

.store-card:hover {
  transform: translateY(-5px);
}

.store-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
  background-color: #f5f5f5;
  border-radius: 50%;
  padding: 0.5rem;
}

.store-name {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  margin: 0;
  text-align: center;
  line-height: 1.2rem;
  word-wrap: break-word;
}

.swiper-container {
  position: relative;
}

.swiper-button-prev-official-store,
.swiper-button-next-official-store {
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

.swiper-container:hover .swiper-button-prev-official-store,
.swiper-container:hover .swiper-button-next-official-store {
  opacity: 1;
  visibility: visible;
}

.swiper-button-prev-official-store {
  left: -20px;
}

.swiper-button-next-official-store {
  right: -20px;
}

@media (max-width: 768px) {
  .official-store {
    padding: 0 1rem 4rem;
  }

  .section-header {
    padding: 0 0.5rem;
    flex-wrap: nowrap;
    align-items: center;
  }

  .section-title {
    white-space: nowrap;
    font-size: 1.2rem;
  }
}

/* For very narrow screens like Samsung Fold */
@media (max-width: 480px) {
  .mobile-store-swiper {
    --swiper-slides-per-view: 1.5;
    --swiper-space-between: 12;
  }

  .mobile-store-swiper .swiper-slide {
    width: calc((100% - var(--swiper-space-between) * (var(--swiper-slides-per-view) - 1)) / var(--swiper-slides-per-view));
  }
}
</style>
