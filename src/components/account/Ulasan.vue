<template>
  <div class="ulasan-container">
    <div class="header">
      <div class="title-info">
        <h2>Ulasan Produk</h2>
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

const sortedUlasan = computed(() => {
  return [...ulasanList.value].sort((a, b) => {
    return sortBy.value === "terbaru" ? new Date(b.tanggal) - new Date(a.tanggal) : new Date(a.tanggal) - new Date(b.tanggal);
  });
});

function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>

<style scoped>
.ulasan-container {
  padding: 45px 20px 20px 20px;
  background: #fff;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.title-info h2 {
  margin: 8px 0 0;
  font-size: 20px;
  color: #333;
}

.title-info p {
  font-size: 13px;
  color: #888;
}

.sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort label {
  font-size: 13px;
  color: #444;
}

/* ⬇️ Modern Dropdown Style */
.custom-select-wrapper {
  position: relative;
  width: 140px;
}

.custom-select {
  width: 100%;
  appearance: none;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
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
/* ⬆️ End Dropdown */

.ulasan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ulasan-card {
  border: 1px solid #e5e5e5;
  padding: 12px;
  border-radius: 6px;
  background-color: #fafafa;
}

.ulasan-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.ulasan-card h3 {
  font-size: 15px;
  margin: 0;
  color: #222;
}

.rating {
  font-size: 14px;
  font-weight: bold;
  color: #e85423;
}

.komentar {
  font-size: 13px;
  color: #444;
  margin: 4px 0;
}

.tanggal {
  font-size: 11px;
  color: #999;
}

.empty {
  text-align: center;
  padding: 40px 10px;
  color: #777;
}

.ulasan-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 6px;
  transition: box-shadow 0.2s ease;
}

.ulasan-card-link:hover .ulasan-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background-color: #f3b661;
  cursor: pointer;
}
</style>
