<template>
  <nav :class="['bottom-bar-home', { 'home-height': isHomePage }]">
    <router-link to="/" class="bottom-link" active-class="active-link">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/kategori" class="bottom-link" active-class="active-link">
      <i class="fas fa-th-large"></i>
      <span>Kategori</span>
    </router-link>
    <router-link to="/design-online" class="bottom-link" active-class="active-link">
      <i class="fas fa-pencil-ruler"></i>
      <span>Design Online</span>
    </router-link>
    <router-link to="/pricelist" class="bottom-link" active-class="active-link">
      <i class="fas fa-list-alt"></i>
      <span>Pricelist Digital</span>
    </router-link>
    <router-link v-if="!isHomePage" to="/blog" class="bottom-link" active-class="active-link">
      <i class="fas fa-blog"></i>
      <span>Blog</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const isHomePage = route.path === "/";
</script>

<style scoped>
.bottom-bar-home {
  display: none;
}

@media (max-width: 768px) {
  .bottom-bar-home {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    z-index: 1000;
  }

  .home-height {
    height: 70px; /* increased height for home page */
  }

  .bottom-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #444;
    text-decoration: none;
    font-size: 12px;
    position: relative;
    padding-bottom: 4px;
  }

  .bottom-link i {
    font-size: 18px;
  }

  .active-link {
    color: #e85423;
  }

  .active-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px;
    background-color: #e85423;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
}
</style>
