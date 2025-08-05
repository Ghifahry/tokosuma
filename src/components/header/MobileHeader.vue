<template>
  <div v-if="isMobile" class="mobile-header-elements">
    <!-- Back Button for Account Pages -->
    <button v-if="isAccountPage" @click="goBack" class="back-btn">
      <i class="fas fa-arrow-left"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResponsive } from "@/composables/useResponsive";

const route = useRoute();
const router = useRouter();
const { isMobile } = useResponsive();

const isAccountPage = computed(() => {
  return route.path.startsWith("/account");
});

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.mobile-header-elements {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #666;
  flex-shrink: 0;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.back-btn i {
  font-size: 1rem;
}

/* Desktop - Hide mobile elements */
/* Not needed anymore since we use v-if="isMobile" */
</style>
