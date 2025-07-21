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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
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
