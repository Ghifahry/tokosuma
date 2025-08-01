<template>
  <div v-if="show" class="loading-progress-container">
    <div class="loading-progress-bar" :class="{ active: show }"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingProgress",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  pointer-events: none;
}

.loading-progress-bar {
  height: 3px;
  background: linear-gradient(90deg, #e85423, #ff6b35, #ff8c42);
  width: 0%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(232, 84, 35, 0.5);
}

.loading-progress-bar.active {
  width: 100%;
  animation: progressPulse 2s ease-in-out infinite;
}

@keyframes progressPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .loading-progress-bar {
    height: 2px;
  }
}
</style>
