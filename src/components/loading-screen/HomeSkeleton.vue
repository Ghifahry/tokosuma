<template>
  <div class="home-skeleton">
    <!-- Banner Skeleton -->
    <div class="banner-skeleton shimmer"></div>

    <!-- Promo Slider Skeleton -->
    <div class="section-skeleton">
      <div class="section-title shimmer"></div>
      <div class="promo-grid">
        <div v-for="n in 3" :key="n" class="promo-item shimmer"></div>
      </div>
    </div>

    <!-- Products Skeleton -->
    <div class="section-skeleton">
      <div class="section-title shimmer"></div>
      <div class="products-grid">
        <div v-for="n in 6" :key="n" class="product-item">
          <div class="product-image shimmer"></div>
          <div class="product-info">
            <div class="product-title shimmer"></div>
            <div class="product-price shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSkeleton",
};
</script>

<style scoped>
.home-skeleton {
  max-width: 1220px;
  margin: 0 auto;
  padding: 1rem;
}

.banner-skeleton {
  height: 300px;
  background: #f0f0f0;
  border-radius: 12px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.section-skeleton {
  margin-bottom: 2rem;
}

.section-title {
  height: 24px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 200px;
  position: relative;
  overflow: hidden;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.promo-item {
  height: 120px;
  background: #f0f0f0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 150px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.product-info {
  padding: 0.75rem;
}

.product-title {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.product-price {
  height: 18px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 60%;
  position: relative;
  overflow: hidden;
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
  .home-skeleton {
    padding: 0.5rem;
  }

  .banner-skeleton {
    height: 200px;
  }

  .promo-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .product-image {
    height: 120px;
  }
}
</style>
