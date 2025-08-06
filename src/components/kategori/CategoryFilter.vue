<template>
  <div class="filter-sidebar" :class="{ 'filter-active': showFilter }">
    <div class="filter-header">
      <h3>Filter</h3>
      <button class="close-filter" @click="$emit('toggle-filter')">×</button>
    </div>

    <div class="filter-section">
      <h3>Promo</h3>
      <div class="promo-filter">
        <label class="checkbox-label">
          <input type="checkbox" :checked="showPromoOnly" @change="$emit('apply-filters')" />
          <span class="checkmark"></span>
          Tampilkan produk promo saja
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h3>Harga</h3>
      <div class="price-range">
        <div class="price-inputs">
          <div class="price-input">
            <label>Min</label>
            <input type="number" :value="minPrice" @input="$emit('apply-filters')" placeholder="0" />
          </div>
          <div class="price-input">
            <label>Max</label>
            <input type="number" :value="maxPrice" @input="$emit('apply-filters')" placeholder="1000000" />
          </div>
        </div>
        <button class="apply-price" @click="$emit('apply-filters')">Terapkan</button>
      </div>
    </div>

    <button class="reset-filter" @click="$emit('reset-filters')">Reset Filter</button>
  </div>
</template>

<script>
export default {
  name: "CategoryFilter",
  props: {
    showFilter: {
      type: Boolean,
      default: false,
    },
    showPromoOnly: {
      type: Boolean,
      default: false,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
  },
  emits: ["toggle-filter", "apply-filters", "reset-filters"],
};
</script>

<style scoped>
.filter-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.filter-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e1e5e9;
  padding-bottom: 1rem;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.close-filter {
  background: #f8f9fa;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-filter:hover {
  background: #e85423;
  color: white;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #333;
  font-weight: 600;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-inputs {
  display: flex;
  gap: 0.75rem;
}

.price-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.price-input label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
}

.price-input input {
  padding: 0.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.price-input input:focus {
  outline: none;
  border-color: #e85423;
}

.apply-price {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s ease;
}

.apply-price:hover {
  background: #d1451a;
}

.reset-filter {
  width: 100%;
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #666;
  transition: all 0.2s ease;
}

.reset-filter:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

/* Promo Filter */
.promo-filter {
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
  background: white;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #e85423;
  border-color: #e85423;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .filter-sidebar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    max-height: 100%;
    border-radius: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 1.5rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .filter-sidebar.filter-active {
    transform: translateX(0);
  }

  .filter-header {
    display: flex;
    padding: 0.75rem;
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 10;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
}
</style>
