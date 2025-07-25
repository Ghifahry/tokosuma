<template>
  <Header />
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style>
/* Tambahkan styling global jika perlu */
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
