<template>
  <div class="blog-detail-container">
    <div v-if="blog" class="blog-detail">
      <div class="blog-header">
        <button @click="$router.go(-1)" class="back-button"><i class="fas fa-arrow-left"></i> Kembali</button>
        <h1 class="blog-title">{{ blog.title }}</h1>
        <div class="blog-meta">
          <span class="blog-category">{{ blog.category }}</span>
          <span class="blog-date">{{ blog.date }}</span>
          <span class="blog-read-time">{{ blog.readTime }}</span>
        </div>
      </div>

      <div class="blog-image">
        <img :src="blog.image" :alt="blog.title" />
      </div>

      <div class="blog-content">
        <p class="blog-snippet">{{ blog.snippet }}</p>
        <p class="blog-full-content">
          {{ blog.snippet }} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Blog tidak ditemukan</h2>
      <p>Blog dengan slug "{{ $route.params.slug }}" tidak ditemukan.</p>
      <button @click="$router.push('/')" class="home-button">Kembali ke Beranda</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import blogs from "@/data/blogs.json";

const route = useRoute();

const blog = computed(() => {
  return blogs.find((blog) => blog.slug === route.params.slug);
});
</script>

<style scoped>
.blog-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 4rem;
}

.blog-detail {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.blog-header {
  padding: 2rem 2rem 1rem;
}

.back-button {
  background: none;
  border: none;
  color: #e85423;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  text-decoration: underline;
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.blog-category {
  background: #e85423;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.blog-date,
.blog-read-time {
  color: #666;
  font-size: 0.875rem;
}

.blog-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-content {
  padding: 2rem;
}

.blog-snippet {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.blog-full-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.7;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h2 {
  color: #333;
  margin-bottom: 1rem;
}

.not-found p {
  color: #666;
  margin-bottom: 2rem;
}

.home-button {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.home-button:hover {
  background: #c6481d;
}

@media (max-width: 768px) {
  .blog-detail-container {
    padding: 1rem;
  }

  .blog-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .blog-title {
    font-size: 1.5rem;
  }

  .blog-image {
    height: 250px;
  }

  .blog-content {
    padding: 1.5rem;
  }
}
</style>
