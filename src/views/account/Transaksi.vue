<template>
  <div class="transaksi-container">
    <div class="header">
      <h2 class="title">Transaksi</h2>

      <div class="submenu-row">
        <div class="submenu-inline">
          <button v-for="menu in menus" :key="menu.value" :class="['submenu-button', { active: selectedMenu === menu.value }]" @click="selectedMenu = menu.value" type="button">
            {{ menu.label }}
          </button>
        </div>

        <div class="sort-inline">
          <label for="sortBy">Urutkan:</label>
          <select id="sortBy" v-model="sortBy">
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="filteredTransaksi.length" class="transaksi-list">
      <router-link v-for="item in filteredTransaksi" :key="item.id" :to="`/detailpayment/${item.id}`" class="transaksi-card-link">
        <div class="transaksi-card">
          <div class="top-row">
            <h3>{{ item.namaBarang }}</h3>
            <span class="status">{{ item.status }}</span>
          </div>
          <p class="harga">Rp{{ formatHarga(item.harga) }}</p>
          <small class="tanggal">Dipesan: {{ formatTanggal(item.tanggal) }}</small>
          <p class="alamat"><strong>Dikirim ke:</strong> {{ item.alamatPengiriman }}</p>
        </div>
      </router-link>
    </div>

    <div v-else class="empty">
      <p>Belum ada transaksi yang tercatat.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const sortBy = ref("terbaru");
const selectedMenu = ref("semua");

const menus = [
  { label: "Semua", value: "semua" },
  { label: "Di Proses", value: "diproses" },
  { label: "Di Antar", value: "dikirim" },
  { label: "Sudah Tiba", value: "sudahtiba" },
  { label: "Cancel", value: "cancel" },
];

const daftarTransaksi = ref([
  {
    id: 1,
    namaBarang: "Buku SIDU",
    harga: 75000,
    status: "Sedang Dikirim",
    tanggal: "2025-07-12",
    alamatPengiriman: "Jalan Melati No. 123, Jakarta Selatan",
  },
  {
    id: 2,
    namaBarang: "Buku Campus",
    harga: 125000,
    status: "Dikemas",
    tanggal: "2025-07-10",
    alamatPengiriman: "Jl. Jendral Sudirman Kav. 45, Jakarta Pusat",
  },
  {
    id: 3,
    namaBarang: "New Normal",
    harga: 299000,
    status: "Sampai",
    tanggal: "2025-07-08",
    alamatPengiriman: "Desa Sukamaju RT 01/02, Kabupaten Bandung",
  },
  {
    id: 4,
    namaBarang: "Ladang Sawah",
    harga: 29229000,
    status: "Sampai",
    tanggal: "2025-07-08",
    alamatPengiriman: "Desa Sukamaju RT 01/02, Kabupaten Bandung",
  },
]);

const sortedTransaksi = computed(() => {
  return [...daftarTransaksi.value].sort((a, b) => {
    return sortBy.value === "terbaru" ? new Date(b.tanggal) - new Date(a.tanggal) : new Date(a.tanggal) - new Date(b.tanggal);
  });
});

const filteredTransaksi = computed(() => {
  const status = selectedMenu.value;

  if (status === "semua") return sortedTransaksi.value;

  return sortedTransaksi.value.filter((item) => {
    const s = item.status.toLowerCase();
    if (status === "diproses") return s.includes("kemas") || s.includes("proses");
    if (status === "dikirim") return s.includes("kirim");
    if (status === "sudahtiba") return s.includes("sampai") || s.includes("tiba");
    if (status === "cancel") return s.includes("cancel");
    return true;
  });
});

function formatHarga(nilai) {
  return nilai.toLocaleString("id-ID");
}

function formatTanggal(tgl) {
  const date = new Date(tgl);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
</script>

<style scoped>
.transaksi-container {
  padding: 0px 20px 20px 20px;
  background: #fff;
  border-radius: 8px;
}

/* Header */
.header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-size: 20px;
  margin: 0;
  color: #333;
}

/* Submenu dan Sort */
.submenu-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.submenu-inline {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.submenu-inline::-webkit-scrollbar {
  height: 4px;
}

.submenu-inline::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

.submenu-button {
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.submenu-button.active {
  background-color: #e85423;
  color: #fff;
  border-color: #e85423;
}

/* Urutkan Dropdown */
.sort-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
}

.sort-inline label {
  font-size: 13px;
  color: #444;
}

.sort-inline select {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
}

/* Responsif Mobile */
@media (max-width: 768px) {
  .submenu-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .submenu-inline {
    width: 100%;
    overflow-x: auto;
  }

  .sort-inline {
    width: 100%;
    justify-content: flex-start;
    margin-top: 4px;
    padding-left: 2px;
  }

  .sort-inline label {
    min-width: 60px;
  }
}

/* Daftar Transaksi */
.transaksi-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaksi-card {
  border: 1px solid #ddd;
  padding: 14px;
  border-radius: 6px;
  background-color: #fdfdfd;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-row h3 {
  margin: 0;
  font-size: 16px;
  color: #222;
}

.status {
  font-size: 13px;
  color: #fff;
  background-color: #e85423;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.harga {
  margin: 6px 0;
  font-size: 14px;
  color: #444;
}

.tanggal {
  font-size: 12px;
  color: #999;
}

.alamat {
  font-size: 13px;
  color: #555;
  margin-top: 6px;
}

.empty {
  padding: 40px 10px;
  text-align: center;
  color: #777;
}

.transaksi-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: box-shadow 0.2s ease;
  border-radius: 6px;
}

.transaksi-card-link:hover .transaksi-card {
  background-color: #f3f3f3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
