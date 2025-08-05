<template>
  <nav :class="['bottom-bar-home', { 'home-height': isHomePage }]">
    <router-link to="/" class="bottom-link" active-class="active-link">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/mobile-categories" class="bottom-link" active-class="active-link">
      <i class="fas fa-th-large"></i>
      <span>Kategori</span>
    </router-link>
    <router-link to="/blogs" class="bottom-link" active-class="active-link">
      <i class="fas fa-newspaper"></i>
      <span>Blog</span>
    </router-link>
    <router-link v-if="isLoggedIn" to="/account/akun" class="bottom-link" active-class="active-link">
      <i class="fas fa-user"></i>
      <span>Akun</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const isHomePage = route.path === "/";
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
};

onMounted(() => {
  checkLoginStatus();

  // Listen for login status changes
  window.addEventListener("loginStatusChanged", checkLoginStatus);
  window.addEventListener("storage", checkLoginStatus);
});
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
    justify-content: center;
    text-align: center;
    color: #444;
    text-decoration: none;
    font-size: 12px;
    position: relative;
    padding: 0.5rem 0;
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
