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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  blogs: {
    type: Array,
    required: true,
  },
  isMobile: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
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

/* For very narrow screens like Samsung Fold */
@media (max-width: 480px) {
  .blog-swiper {
    --swiper-slides-per-view: 1.1;
    --swiper-space-between: 12;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.3rem;
  }
}
</style>
