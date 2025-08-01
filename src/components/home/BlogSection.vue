<template>
  <section class="blog-section">
    <div class="section-header">
      <h2 class="section-title">Blogs</h2>
      <button class="see-more-button top-right" @click="$router.push('/blogs')">Lihat Semua Blogs <i class="fas fa-chevron-right"></i></button>
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
  padding: 2rem 1rem 4rem;
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
    padding-left: 2px;
  }

  .see-more-button.top-right {
    white-space: nowrap; /* Prevent button text from wrapping */
    font-size: 0.75rem; /* Slightly reduce font size */
    padding: 0.25rem 0.8rem;
    margin-top: 5px;
  }
  .blog-section {
    padding: 1rem 1rem 2rem;
  }
}
</style>
