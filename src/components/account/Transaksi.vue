<template>
  <div class="transaksi-container">
    <div class="header">
      <div class="submenu-row">
        <div class="submenu-inline">
          <button v-for="menu in MENU_OPTIONS" :key="menu.value" :class="['submenu-button', { active: selectedMenu === menu.value }]" @click="selectedMenu = menu.value" type="button">
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

// Constants
const MENU_OPTIONS = [
  { label: "Semua", value: "semua" },
  { label: "Diproses", value: "diproses" },
  { label: "Dikirim", value: "dikirim" },
  { label: "Tiba di Tujuan", value: "sudahtiba" },
  { label: "Dibatalkan", value: "cancel" },
];

// Reactive data
const selectedMenu = ref("semua");
const sortBy = ref("terbaru");

const daftarTransaksi = ref([
  {
    id: 1,
    namaBarang: "Kaos Custom Desain Sendiri",
    harga: 125000,
    status: "Diproses",
    tanggal: "2024-07-20",
    alamatPengiriman: "Jl. Merdeka No. 10, Jakarta Pusat",
  },
  {
    id: 2,
    namaBarang: "Mug Custom Foto Keluarga",
    harga: 85000,
    status: "Dikirim",
    tanggal: "2024-07-18",
    alamatPengiriman: "Jl. Pahlawan No. 5, Bandung",
  },
  {
    id: 3,
    namaBarang: "Hoodie Custom Logo Komunitas",
    harga: 250000,
    status: "Tiba di Tujuan",
    tanggal: "2024-07-15",
    alamatPengiriman: "Jl. Sudirman No. 20, Surabaya",
  },
  {
    id: 4,
    namaBarang: "Tote Bag Custom Ilustrasi",
    harga: 75000,
    status: "Dibatalkan",
    tanggal: "2024-07-12",
    alamatPengiriman: "Jl. Gajah Mada No. 3, Semarang",
  },
]);

// Computed properties
const sortedTransaksi = computed(() => {
  const sorted = [...daftarTransaksi.value];
  return sorted.sort((a, b) => {
    const dateA = new Date(a.tanggal);
    const dateB = new Date(b.tanggal);
    return sortBy.value === "terbaru" ? dateB - dateA : dateA - dateB;
  });
});

const filteredTransaksi = computed(() => {
  if (selectedMenu.value === "semua") return sortedTransaksi.value;

  return sortedTransaksi.value.filter((item) => {
    const status = item.status.toLowerCase();
    const filterMap = {
      diproses: () => status.includes("kemas") || status.includes("proses"),
      dikirim: () => status.includes("kirim"),
      sudahtiba: () => status.includes("sampai") || status.includes("tiba"),
      cancel: () => status.includes("cancel") || status.includes("dibatalkan"),
    };

    return filterMap[selectedMenu.value]?.() || true;
  });
});

// Methods
const formatHarga = (nilai) => {
  return nilai.toLocaleString("id-ID");
};

const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
</script>

<style scoped>
/* Layout */
.transaksi-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

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

/* Submenu and Sort */
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
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.submenu-button.active {
  background-color: #e85423;
  color: #fff;
  border-color: #e85423;
}

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

/* Transaction List */
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

/* Responsive */
@media (max-width: 768px) {
  .submenu-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .submenu-inline {
    width: 100%;
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
</style>
