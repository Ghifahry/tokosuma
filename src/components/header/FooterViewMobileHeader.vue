<template>
  <div v-if="isMobile" class="mobile-header">
    <button @click="goBack" class="back-btn">
      <i class="fas fa-arrow-left"></i>
    </button>
    <h1 class="page-title">{{ title }}</h1>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useResponsive } from "@/composables/useResponsive";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const { isMobile } = useResponsive();

const goBack = () => {
  router.push("/my-account");
};
</script>

<style scoped>
.mobile-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin-right: 12px;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.back-btn i {
  font-size: 1rem;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: center;
  padding-right: 47px; /* Balance the back button space */
}

/* Desktop - Hide mobile elements */
@media (min-width: 769px) {
  .mobile-header {
    display: none;
  }
}
</style>
