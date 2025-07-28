<template>
  <div>
    <!-- Toggle Button -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <!-- Sidebar -->
    <aside class="custom-sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <button class="close-btn" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <button v-for="item in menuItems" :key="item.path" class="sidebar-btn" @click="navigateTo(item.path)" :class="{ active: isActive(item.path) }">
          {{ item.title }}
        </button>
      </nav>

      <hr />
      <p class="sidebar-text">
        Pikiran, cerita, dan gagasan<br />
        tentang buku dengan cara yang<br />
        berbeda.
      </p>
    </aside>

    <!-- Overlay -->
    <div class="sidebar-overlay" :class="{ 'overlay-open': isSidebarOpen }" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isSidebarOpen = ref(false);

const menuItems = [
  { path: "/", title: "Home" },
  { path: "/rekomendasi", title: "Rekomendasi" },
  { path: "/review", title: "Review" },
  { path: "/promo", title: "Promo" },
  { path: "/best-seller", title: "Best Seller" },
  { path: "/literasi", title: "Literasi" },
  { path: "/info-gramedia", title: "Info TokoSuma" },
  { path: "/back-to-school-gramedia", title: "Back to School TokoSuma" },
  { path: "/gramedia-school-holiday", title: "TokoSuma School Holiday" },
  { path: "/semesta-buku", title: "Semesta Buku" },
  { path: "/gempar-12-12", title: "Gempar 12.12" },
  { path: "/mei-2025", title: "Mei 2025" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navigateTo = (path) => {
  router.push(path);
  isSidebarOpen.value = false;
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-sidebar {
  width: 250px;
  padding: 20px;
  background-color: white;
  position: fixed;
  top: 0;
  left: -300px;
  height: 100vh;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1001;
  transition: left 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sidebar-btn {
  background: none;
  border: none;
  padding: 10px 15px;
  text-align: left;
  font-size: 15px;
  color: #111;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.sidebar-btn:hover {
  background-color: #f0f0f0;
}

.sidebar-btn.active {
  background-color: #e0e0e0;
  color: #000;
  font-weight: 600;
  pointer-events: none;
}

.sidebar-text {
  margin-top: auto;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.3;
  white-space: pre-line;
  user-select: none;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.overlay-open {
  opacity: 1;
  pointer-events: all;
}
</style>
