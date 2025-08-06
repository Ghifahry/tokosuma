<template>
  <div class="ulasan-container">
    <div class="header">
      <div class="title-info">
        <p>Total Ulasan: {{ sortedUlasan.length }}</p>
      </div>

      <div class="sort">
        <label for="sortBy">Urutkan:</label>
        <div class="custom-select-wrapper">
          <select id="sortBy" v-model="sortBy" class="custom-select">
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
          </select>
          <span class="arrow">&#9662;</span>
        </div>
      </div>
    </div>

    <div v-if="sortedUlasan.length" class="ulasan-list">
      <router-link v-for="ulasan in sortedUlasan" :key="ulasan.id" :to="`/produk/${ulasan.id}`" class="ulasan-card-link">
        <div class="ulasan-card">
          <div class="ulasan-top">
            <h3>{{ ulasan.produk }}</h3>
            <span class="rating">{{ ulasan.rating }}/5</span>
          </div>
          <p class="komentar">{{ ulasan.komentar }}</p>
          <small class="tanggal">{{ formatTanggal(ulasan.tanggal) }}</small>
        </div>
      </router-link>
    </div>

    <div v-else class="empty">
      <h4>Belum ada ulasan 😕</h4>
      <p>Kamu belum menulis ulasan untuk produk apa pun.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Reactive data
const sortBy = ref("terbaru");

const ulasanList = ref([
  {
    id: 1,
    produk: "Tas Jansport",
    rating: 4,
    komentar: "Tasnya bagus dan kuat, cocok untuk kuliah.",
    tanggal: "2025-07-15",
  },
  {
    id: 2,
    produk: "Botol Minum Hydro",
    rating: 5,
    komentar: "Desain elegan dan tahan panas!",
    tanggal: "2025-06-28",
  },
]);

// Computed properties
const sortedUlasan = computed(() => {
  const sorted = [...ulasanList.value];
  return sorted.sort((a, b) => {
    const dateA = new Date(a.tanggal);
    const dateB = new Date(b.tanggal);
    return sortBy.value === "terbaru" ? dateB - dateA : dateA - dateB;
  });
});

// Methods
const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scoped>
/* Layout */
.ulasan-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 10px;
}

.title-info h2 {
  margin: 0 0 5px 0;
  font-size: 20px;
  color: #333;
}

.title-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Sort Controls */
.sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort label {
  font-size: 14px;
  color: #444;
}

.custom-select-wrapper {
  position: relative;
  width: 140px;
}

.custom-select {
  width: 100%;
  appearance: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.custom-select:focus {
  outline: none;
  border-color: #e85423;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: #888;
}

/* Review List */
.ulasan-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ulasan-card {
  border: 1px solid #e5e5e5;
  padding: 15px;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.2s ease;
}

.ulasan-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.ulasan-card h3 {
  font-size: 16px;
  margin: 0;
  color: #222;
  font-weight: 500;
}

.rating {
  font-size: 14px;
  font-weight: 600;
  color: #e85423;
}

.komentar {
  font-size: 14px;
  color: #444;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.tanggal {
  font-size: 12px;
  color: #999;
}

/* Empty State */
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty h4 {
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #333;
}

.empty p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

/* Links */
.ulasan-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.ulasan-card-link:hover {
  transform: translateY(-2px);
}

.ulasan-card-link:hover .ulasan-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .ulasan-container {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .custom-select-wrapper {
    width: 120px;
  }

  .ulasan-card {
    padding: 12px;
  }

  .ulasan-card h3 {
    font-size: 15px;
  }

  .komentar {
    font-size: 13px;
  }
}
</style>
