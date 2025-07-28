<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from "@/components/Header.vue";
import BottomBarHome from "@/components/home/BottomBarHome.vue";

const route = useRoute();
const isMobile = ref(false);

const shouldShowHeader = computed(() => !route.meta.hideHeader);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <Header v-if="shouldShowHeader" />
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
  <BottomBarHome v-if="isMobile" />
</template>

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
