<template>
  <aside class="filter-sort">
    <h4>Filter</h4>
    <label><input type="checkbox" v-model="filter.terbaru" @change="$emit('filter-change', filter)" /> Terbaru</label>
    <label><input type="checkbox" v-model="filter.diskon" @change="$emit('filter-change', filter)" /> Diskon</label>

    <h4 class="mt-3">Sort</h4>
    <select v-model="sortBy" @change="$emit('sort-change', sortBy)">
      <option value="termurah">Termurah</option>
      <option value="termahal">Termahal</option>
      <option value="terlaris">Terlaris</option>
    </select>
  </aside>
</template>

<script>
export default {
  name: "MobileCategoryFilter",
  data() {
    return {
      filter: {
        terbaru: false,
        diskon: false,
      },
      sortBy: "termurah",
    };
  },
  emits: ["filter-change", "sort-change"],
};
</script>

<style scoped>
.filter-sort {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.filter-sort h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
}

.filter-sort h4.mt-3 {
  margin-top: 1.5rem;
}

.filter-sort label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
}

.filter-sort input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #e85423;
}

.filter-sort select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
}

.filter-sort select:focus {
  outline: none;
  border-color: #e85423;
}
</style>
