<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import BottomBarHome from "@/components/home/BottomBarHome.vue";
import LoadingSpinner from "@/components/loading-screen/LoadingSpinner.vue";
import LoadingProgress from "@/components/loading-screen/LoadingProgress.vue";

const route = useRoute();
const isMobile = ref(false);
const isRouteLoading = ref(false);

const shouldShowHeader = computed(() => !route.meta.hideHeader);

const shouldShowBottomBar = computed(() => {
  const restrictedRoutes = ["/account", "/login", "/register"];
  return isMobile.value && !restrictedRoutes.some((path) => route.path.startsWith(path));
});

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleRouteLoading = (event) => {
  // Check if current route should disable global loading
  if (route.meta.disableGlobalLoading) {
    isRouteLoading.value = false;
  } else {
    isRouteLoading.value = event.detail.loading;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  window.addEventListener("route-loading", handleRouteLoading);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  window.removeEventListener("route-loading", handleRouteLoading);
});
</script>

<template>
  <div :style="{ paddingBottom: shouldShowBottomBar ? '100px' : '0' }">
    <!-- Global Loading Progress Bar -->
    <LoadingProgress :show="isRouteLoading" />

    <!-- Global Loading Spinner for Route Changes -->
    <LoadingSpinner :show="isRouteLoading" text="Memuat halaman..." />

    <Header v-if="shouldShowHeader" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <BottomBarHome v-if="shouldShowBottomBar" />
  </div>
</template>

<style>
/* Tambahkan styling global jika perlu */
body {
  margin: 0;
  font-family: "Inter", sans-serif;
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
