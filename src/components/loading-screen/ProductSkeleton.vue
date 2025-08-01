<template>
  <div class="product-skeleton">
    <div class="skeleton-image shimmer"></div>
    <div class="skeleton-content">
      <div class="skeleton-title shimmer"></div>
      <div class="skeleton-price shimmer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductSkeleton",
};
</script>

<style scoped>
.product-skeleton {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  height: 100%;
}

.skeleton-image {
  height: 200px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.skeleton-content {
  padding: 1rem;
}

.skeleton-title {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  width: 100%;
}

.skeleton-price {
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 60%;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .skeleton-image {
    height: 160px;
  }

  .skeleton-content {
    padding: 0.75rem;
  }

  .skeleton-title {
    height: 14px;
  }

  .skeleton-price {
    height: 18px;
  }
}

@media (max-width: 480px) {
  .skeleton-image {
    height: 140px;
  }
}
</style>
