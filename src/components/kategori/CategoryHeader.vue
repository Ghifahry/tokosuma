<template>
  <div class="category-header">
    <div class="category-summary">
      <div class="total-products">
        <span class="total-count">{{ totalProducts }}</span>
        <span class="total-label">Produk</span>
      </div>
      <div class="category-info">
        <p class="category-query-text">kategori</p>
        <h1 class="category-query">{{ categoryName }}</h1>
      </div>
    </div>

    <!-- Sorting Options -->
    <div class="sorting-section">
      <label class="sort-label">Urutkan:</label>
      <div class="sort-dropdown">
        <button @click="$emit('toggle-sort-dropdown')" class="sort-button">
          {{ currentSortLabel }}
          <i class="fas fa-chevron-down" :class="{ rotate: showSortDropdown }"></i>
        </button>
        <div class="sort-options" v-if="showSortDropdown">
          <div v-for="option in sortOptions" :key="option.value" @click="$emit('select-sort', option.value)" class="sort-option" :class="{ active: sortBy === option.value }">
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryHeader",
  props: {
    totalProducts: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      default: "",
    },
    currentSortLabel: {
      type: String,
      default: "Terbaru",
    },
    showSortDropdown: {
      type: Boolean,
      default: false,
    },
    sortOptions: {
      type: Array,
      default: () => [],
    },
    sortBy: {
      type: String,
      default: "newest",
    },
  },
  emits: ["toggle-sort-dropdown", "select-sort"],
};
</script>

<style scoped>
.category-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-summary {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.total-products {
  text-align: center;
}

.total-count {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #e85423;
}

.total-label {
  font-size: 0.9rem;
  color: #666;
}

.category-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category-query-text {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-query {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.sorting-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.sort-dropdown {
  position: relative;
}

.sort-button {
  background: white;
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 150px;
  justify-content: space-between;
}

.sort-button:hover {
  border-color: #e85423;
}

.sort-button i {
  transition: transform 0.3s ease;
}

.sort-button i.rotate {
  transform: rotate(180deg);
}

.sort-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.25rem;
}

.sort-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.sort-option:last-child {
  border-bottom: none;
}

.sort-option:hover {
  background: #f8f9fa;
}

.sort-option.active {
  background: #fff5f2;
  color: #e85423;
  font-weight: 500;
}

@media (max-width: 768px) {
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .category-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .sorting-section {
    width: 100%;
  }

  .sort-button {
    width: 100%;
  }
}
</style>
