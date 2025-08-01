<template>
  <div class="search-results-skeleton">
    <!-- Search Header Skeleton -->
    <div class="search-header">
      <div class="search-title shimmer"></div>
      <div class="search-count shimmer"></div>
    </div>

    <!-- Search Results Grid -->
    <div class="search-grid">
      <div v-for="n in 6" :key="n" class="search-item">
        <div class="item-image shimmer"></div>
        <div class="item-info">
          <div class="item-title shimmer"></div>
          <div class="item-price shimmer"></div>
          <div class="item-rating shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultsSkeleton",
};
</script>

<style scoped>
.search-results-skeleton {
  max-width: 1220px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.search-header {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-title {
  height: 28px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 60%;
  position: relative;
  overflow: hidden;
}

.search-count {
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 40%;
  position: relative;
  overflow: hidden;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.search-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.item-image {
  height: 200px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.item-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-title {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.item-price {
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 60%;
  position: relative;
  overflow: hidden;
}

.item-rating {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  width: 40%;
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
  .search-results-skeleton {
    padding: 1rem;
  }

  .search-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }

  .item-image {
    height: 160px;
  }

  .item-info {
    padding: 0.75rem;
  }
}
</style>
