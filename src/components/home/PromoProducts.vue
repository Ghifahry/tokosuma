<template>
  <section class="promo-products">
    <div class="section-header">
      <h2 class="section-title">Back To School</h2>
      <button class="see-more-button top-right" @click="$router.push('/produk')">Lihat Semua Produk <i class="fas fa-chevron-right"></i></button>
    </div>

    <!-- backtoschool.png is now outside the swiper-container -->
    <div class="backtoschool-background" :class="{ 'slide-out': activeIndex > 0, 'slide-in': activeIndex === 0 }"></div>

    <div v-if="!isMobile" class="swiper-container">
      <swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="6.2"
        :space-between="-230"
        :navigation="{
          nextEl: '.swiper-button-next-promo-products',
          prevEl: '.swiper-button-prev-promo-products',
        }"
        class="desktop-product-swiper"
        :pagination="false"
        @slideChange="handleSlideChange"
      >
        <swiper-slide v-for="(product, index) in products" :key="product.id" class="product-slide">
          <router-link :to="`/product/${slugify(product.name)}`" class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-img" />
            </div>
            <div class="product-info">
              <p class="product-official">Toko Suma Official</p>
              <div class="product-name-price">
                <p class="product-name">{{ product.name }}</p>
                <div class="price-container">
                  <div class="price-row">
                    <span class="original-price">{{ product.originalPrice }}</span>
                    <div class="discount-badge">
                      <span class="discount-text">{{ product.discount }}%</span>
                      <span class="discount-label">OFF</span>
                    </div>
                  </div>
                  <span class="product-price">{{ product.promoPrice }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
      <!-- Custom Navigation Buttons -->
      <button class="swiper-button-prev-promo-products">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="swiper-button-next-promo-products">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div v-else class="mobile-swiper-container">
      <swiper :slides-per-view="2.4" :space-between="1" :modules="[Pagination]" :pagination="false" class="mobile-product-swiper" @slideChange="handleSlideChangeMobile">
        <swiper-slide v-for="product in products" :key="product.id">
          <router-link :to="`/product/${slugify(product.name)}`" class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-img" />
            </div>
            <div class="product-info">
              <p class="product-official">Toko Suma Official</p>
              <div class="product-name-price">
                <p class="product-name">{{ product.name }}</p>
                <div class="price-container">
                  <div class="price-row">
                    <span class="original-price">{{ product.originalPrice }}</span>
                    <div class="discount-badge">
                      <span class="discount-text">{{ product.discount }}%</span>
                      <span class="discount-label">OFF</span>
                    </div>
                  </div>
                  <span class="product-price">{{ product.promoPrice }}</span>
                </div>
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
import bgBacktoschool from "@/assets/backtoschool.png";
import { ref } from "vue";

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});

const products = [
  {
    id: 1,
    name: "Buku Novel Terpopuler",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/items/9786024249939_FLOATING-IN-S.jpg",
    originalPrice: "Rp 150.000",
    promoPrice: "Rp 120.000",
    discount: 20,
  },
  {
    id: 2,
    name: "Tas Sekolah Premium",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/HAPPY_BLACK_vZ3ATpc.png",
    originalPrice: "Rp 250.000",
    promoPrice: "Rp 200.000",
    discount: 20,
  },
  {
    id: 3,
    name: "Buku Untuk Di Baca",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786028508377_Buku-Untuk-Dibaca--All-About-Love-Life-And-Hope-Edisi-Terbaru.jpg",
    originalPrice: "Rp 80.000",
    promoPrice: "Rp 60.000",
    discount: 25,
  },
  {
    id: 4,
    name: "Kalender 2030",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/Kalender_Bip_2021.png",
    originalPrice: "Rp 120.000",
    promoPrice: "Rp 90.000",
    discount: 25,
  },
  {
    id: 5,
    name: "Alat Tulis Set Lengkap",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/product-metas/3i-9ate9ea.png",
    originalPrice: "Rp 100.000",
    promoPrice: "Rp 75.000",
    discount: 25,
  },
  {
    id: 6,
    name: "Sesungguhnya Kita Sudah Tidak Kuat Lagi untuk ",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786232447912.jpg",
    originalPrice: "Rp 180.000",
    promoPrice: "Rp 135.000",
    discount: 25,
  },
  {
    id: 7,
    name: "Tas Gelori",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/BUSQUETS-SHOULDER-BAG_depan.jpg",
    originalPrice: "Rp 300.000",
    promoPrice: "Rp 225.000",
    discount: 25,
  },
  {
    id: 8,
    name: "Tas Aksara",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/207967874.jpg",
    originalPrice: "Rp 120.000",
    promoPrice: "Rp 96.000",
    discount: 20,
  },
  {
    id: 9,
    name: "Buku Hipnotis",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/products/nnirper8--.jpg",
    originalPrice: "Rp 200.000",
    promoPrice: "Rp 160.000",
    discount: 20,
  },
];

const activeIndex = ref(0);

function handleSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
}

function handleSlideChangeMobile(swiper) {
  activeIndex.value = swiper.activeIndex;
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
.promo-products {
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

.product-image-container {
  position: relative;
  width: 100%;
  height: 160px;
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
  margin-bottom: 0.5rem;
}

.price-container {
  position: absolute;
  bottom: 0;
  left: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: calc(100% - 1.6rem);
}

.price-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.original-price {
  font-size: 0.7rem;
  color: #999;
  text-decoration: line-through;
  font-weight: 400;
  margin: 0;
  padding: 0;
}

.discount-badge {
  color: #fa4d64;
  padding: 1px 1px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  font-size: 0.45rem;
  font-weight: 700;
  line-height: 1;
  min-width: 20px;
}

.discount-text {
  font-size: 0.55rem;
  font-weight: 700;
}

.discount-label {
  font-size: 0.35rem;
  font-weight: 600;
  opacity: 0.9;
}

.product-price {
  font-size: 0.8rem;
  color: #060606;
  font-weight: 600;
  margin: 0;
  padding: 0;
  display: block;
  text-align: left;
}

.product-official {
  font-size: 0.7rem;
  color: #000;
  opacity: 0.5;
  margin: 0.3rem 0 0.1rem 0.8rem;
  display: block;
  text-align: left;
}

.backtoschool-background {
  position: absolute;
  left: 18px;
  top: 100px;
  width: 230px;
  height: 350px;
  background-image: url("@/assets/backtoschool.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  transition: transform 0.5s ease, opacity 0.5s ease;
  z-index: 0;
}

.desktop-product-swiper .swiper-wrapper {
  padding-left: 100px;
}

.desktop-product-swiper .swiper-slide:first-child {
  padding-left: 11rem;
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

.swiper-button-prev-promo-products,
.swiper-button-next-promo-products {
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

.swiper-container:hover .swiper-button-prev-promo-products,
.swiper-container:hover .swiper-button-next-promo-products {
  opacity: 1;
  visibility: visible;
}

.swiper-button-prev-promo-products {
  left: -20px;
}

.swiper-button-next-promo-products {
  right: -20px;
}

/* Responsive navigation buttons */
@media (max-width: 1024px) {
  .swiper-button-prev-promo-products,
  .swiper-button-next-promo-products {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .swiper-button-prev-promo-products {
    left: -15px;
  }

  .swiper-button-next-promo-products {
    right: -15px;
  }
}

@media (max-width: 768px) {
  .swiper-button-prev-promo-products,
  .swiper-button-next-promo-products {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .swiper-button-prev-promo-products {
    left: -10px;
  }

  .swiper-button-next-promo-products {
    right: -10px;
  }
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: #e85423;
  color: white;
}

@media (max-width: 768px) {
  .promo-products {
    padding: 1rem 1rem 2rem;
  }

  .product-name-price {
    height: 5.5rem;
    padding: 0.2rem 0.6rem 0 0.6rem;
  }

  .price-container {
    position: absolute;
    bottom: 0.3rem;
    left: 0.6rem;
    width: calc(100% - 1.2rem);
  }

  .section-header {
    padding: 0 0.5rem;
    flex-wrap: nowrap;
    align-items: center;
  }

  .section-title {
    white-space: nowrap;
    font-size: 1.2rem;
    padding-right: 15px;
  }

  .see-more-button.top-right {
    white-space: nowrap;
    font-size: 0.75rem;
    padding: 0.25rem 0.2rem;
    margin-bottom: 15px;
  }

  .backtoschool-background {
    width: 260px;
    height: 290px;
    top: 93px;
    left: -11px;
  }

  .mobile-swiper-container {
    position: relative;
  }

  .mobile-product-swiper {
    margin-left: 5px;
    bottom: 2px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 10rem;
  }

  /* Improve touch performance */
  .mobile-product-swiper .swiper-slide {
    touch-action: pan-y pinch-zoom;
  }

  .slide-out {
    transform: translateX(-100px);
    opacity: 0;
  }

  .slide-in {
    transform: translateX(0);
    opacity: 1;
  }

  .discount-badge {
    padding: 1px 2px;
    font-size: 0.4rem;
    min-width: 18px;
  }

  .discount-text {
    font-size: 0.45rem;
  }

  .discount-label {
    font-size: 0.3rem;
  }

  .price-row {
    gap: 0.3rem;
  }
}

/* For large desktop screens */
@media (min-width: 1201px) {
  .promo-products {
    padding: 2rem 1rem 4rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .desktop-product-swiper .swiper-slide:first-child {
    padding-left: 11rem;
  }

  .backtoschool-background {
    width: 230px;
    height: 350px;
    top: 100px;
    left: 18px;
  }
}

@media (max-width: 480px) {
  .promo-products {
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

  .price-container {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
  }

  .product-official {
    font-size: 0.6rem;
    margin: -1rem 0 0.1rem 0.5rem;
  }

  .discount-badge {
    padding: 1px 1px;
    min-width: 16px;
  }

  .discount-text {
    font-size: 0.4rem;
  }

  .discount-label {
    font-size: 0.25rem;
  }
  .mobile-product-swiper {
    .price-row {
      gap: 0.2rem;
      margin-bottom: 0.3rem;
    }

    --swiper-slides-per-view: 1.5;
    --swiper-space-between: 12;
  }

  .backtoschool-background {
    width: 200px;
    height: 250px;
    top: 65px;
    left: -5px;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 8rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .promo-products {
    padding: 1.5rem 1rem 3rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .see-more-button.top-right {
    font-size: 0.8rem;
    padding: 0.25rem 0.7rem;
  }

  .product-card {
    --swiper-space-between: 20;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 12rem;
  }

  .mobile-product-swiper {
    margin-left: 8px;
  }

  .backtoschool-background {
    width: 280px;
    height: 320px;
    top: 90px;
    left: -15px;
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .promo-products {
    padding: 1.8rem 1rem 3.5rem;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .product-card {
    --swiper-space-between: 25;
  }

  .mobile-product-swiper .swiper-slide:first-child {
    padding-left: 14rem;
  }

  .mobile-product-swiper {
    margin-left: 10px;
  }

  .backtoschool-background {
    width: 300px;
    height: 350px;
    top: 100px;
    left: -20px;
  }
}
</style>
