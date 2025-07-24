<template>
  <section class="blog-section">
    <div class="section-header">
      <h2 class="section-title">Blogs</h2>
    </div>

    <div class="blog-button-prev"><i class="fas fa-chevron-left"></i></div>
    <div class="blog-button-next"><i class="fas fa-chevron-right"></i></div>

    <swiper
      ref="blogSwiper"
      :modules="[Navigation]"
      :slides-per-view="isMobile ? 1.2 : 3.1"
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});

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
.blog-section {
  padding: 4rem 0.5rem 4rem;
  max-width: 1220px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 1;
}

.blog-swiper {
  position: relative;
}

.blog-slide {
  display: flex;
  height: 100%;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #333;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
}

.blog-snippet {
  font-family: "Roboto", sans-serif;
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
  left: 1px;
  top: 50%;
}
.blog-button-next {
  right: 1px;
  top: 50%;
}

@media (max-width: 768px) {
  .blog-button-prev,
  .blog-button-next {
    display: none;
  }
}

/* For very narrow screens like Samsung Fold */
@media (max-width: 480px) {
  .blog-swiper {
    --swiper-slides-per-view: 1.1;
    --swiper-space-between: 12;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
  }
}
</style>
