<template>
  <section class="promo-container">
    <section class="promo-slider">
      <swiper :modules="[Pagination, Autoplay]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 3000 }" :pagination="!isMobile" class="promo-swiper">
        <swiper-slide v-for="promo in promos" :key="promo.id">
          <a :href="promo.link">
            <img :src="promo.image" :alt="'Promo ' + promo.id" class="promo-img" />
          </a>
        </swiper-slide>
      </swiper>
    </section>

    <section class="promo-boards" v-if="!isMobile">
      <div v-for="promo in promos.slice(0, 2)" :key="'board-' + promo.id" class="promo-board-item">
        <a :href="promo.link">
          <img :src="promo.image" :alt="'Promo ' + promo.id" class="promo-board-img" />
        </a>
      </div>
    </section>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted } from "vue";
import "swiper/css";
import "swiper/css/pagination";

const promos = [
  { id: 1, image: "https://tokosuma.co.id/../toko-suma/storage/app/public/banner/24042025085051-70568.jpg", link: "/promo/diskon-50" },
  { id: 2, image: "https://tokosuma.co.id/../toko-suma/storage/app/public/banner/03082023193040-29660.webp", link: "/promo/beli-2-gratis-1" },
  { id: 3, image: "https://tokosuma.co.id/../toko-suma/storage/app/public/banner/01092021110229-94965.png", link: "/promo/free-ongkir" },
];

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.promo-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-width: 1220px;
  margin: 7rem auto 2rem;
}
.promo-slider {
  flex: -1;
  height: 422px;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.promo-swiper {
  height: 100%;
}

.promo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.promo-boards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 320px;
}

.promo-board-item {
  width: 100%;
  height: 202px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.promo-board-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  background-color: #fff;
}

@media (max-width: 768px) {
  .promo-container {
    /* Go full-width, remove padding and horizontal margin */
    padding: 0;
    margin: 4rem 0 2rem 0;
    width: 100%;
  }
  .promo-slider {
    width: 100%;
    height: auto;
    border-radius: 0; /* Remove radius for edge-to-edge */
    box-shadow: none; /* Remove shadow for a cleaner look */
  }
  .promo-img {
    height: auto;
    max-height: 250px;
    border-radius: 0; /* Remove radius for edge-to-edge */
  }
  .promo-boards {
    display: none;
  }
  /* Hide pagination dots on mobile */
  .swiper-pagination {
    display: none !important;
  }
}
</style>
