<template>
  <div class="official-store-wrapper">
    <h2 class="section-title">Official Store</h2>
    <div v-if="isMobile" class="official-store-swiper">
      <swiper :slides-per-view="2" :space-between="10">
        <swiper-slide v-for="(store, index) in stores" :key="index">
          <router-link :to="'/store/' + index" class="store-card">
            <img :src="store.logo" alt="Official Store Logo" class="store-logo" />
            <div class="store-name">{{ store.name }}</div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <div v-else class="official-store-container">
      <router-link v-for="(store, index) in stores" :key="index" :to="'/store/' + index" class="store-card">
        <img :src="store.logo" alt="Official Store Logo" class="store-logo" />
        <div class="store-name">{{ store.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import storeLogo from "../assets/suma.png";

const stores = [
  { name: "Sidu", logo: storeLogo },
  { name: "Campus", logo: storeLogo },
  { name: "Erlangga", logo: storeLogo },
  { name: "Suma", logo: storeLogo },
  { name: "Gramedia", logo: storeLogo },
  { name: "Bhuana Ilmu Populer", logo: storeLogo },
  { name: "New Store", logo: storeLogo },
];

const isMobile = ref(false);

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIsMobile);
});
</script>

<style scoped>
.official-store-wrapper {
  max-width: 1110px;
  margin: 5rem auto 2rem;
}

.section-title {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  margin-left: 0;
  margin-bottom: 1rem;
}

.official-store-container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.store-card {
  width: 160px;
  height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s ease;
}

.store-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.store-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.store-name {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.official-store-swiper {
  width: 100%;
  max-width: 400px;
  margin: 3rem auto 2rem;
}
</style>
