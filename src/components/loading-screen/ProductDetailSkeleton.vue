<template>
  <div class="product-detail-skeleton">
    <div class="container">
      <!-- Product Image Skeleton -->
      <div class="image-section">
        <div class="main-image shimmer"></div>
        <div class="thumbnail-images">
          <div v-for="n in 4" :key="n" class="thumbnail shimmer"></div>
        </div>
      </div>

      <!-- Product Info Skeleton -->
      <div class="info-section">
        <div class="product-title shimmer"></div>
        <div class="product-price shimmer"></div>
        <div class="product-description">
          <div v-for="n in 3" :key="n" class="description-line shimmer"></div>
        </div>
        <div class="product-actions">
          <div class="quantity-selector shimmer"></div>
          <div class="add-to-cart shimmer"></div>
        </div>
        <div class="product-meta">
          <div v-for="n in 2" :key="n" class="meta-item shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailSkeleton",
};
</script>

<style scoped>
.product-detail-skeleton {
  max-width: 1220px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.thumbnail-images {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  height: 32px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 80%;
  position: relative;
  overflow: hidden;
}

.product-price {
  height: 28px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 40%;
  position: relative;
  overflow: hidden;
}

.product-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description-line {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.description-line:nth-child(2) {
  width: 90%;
}

.description-line:nth-child(3) {
  width: 70%;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.quantity-selector {
  height: 48px;
  background: #f0f0f0;
  border-radius: 8px;
  width: 120px;
  position: relative;
  overflow: hidden;
}

.add-to-cart {
  height: 48px;
  background: #f0f0f0;
  border-radius: 8px;
  flex: 1;
  position: relative;
  overflow: hidden;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.meta-item {
  height: 20px;
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
  .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .main-image {
    height: 300px;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }

  .product-actions {
    flex-direction: column;
  }

  .quantity-selector {
    width: 100%;
  }
}
</style>
