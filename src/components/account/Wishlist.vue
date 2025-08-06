<template>
  <div class="wishlist-container">
    <!-- Header -->
    <div class="header">
      <div class="title-info">
        <p>Total Barang: {{ filteredWishlist.length }}</p>
      </div>
      <div class="sort">
        <label for="sortBy">Urutkan:</label>
        <select id="sortBy" v-model="sortBy">
          <option value="terbaru">Barang Terbaru</option>
          <option value="terlama">Barang Terlama</option>
          <option value="termurah">Barang Termurah</option>
          <option value="termahal">Barang Termahal</option>
        </select>
      </div>
    </div>

    <!-- Daftar Wishlist -->
    <div v-if="filteredWishlist.length" class="card-grid">
      <div v-for="item in filteredWishlist" :key="item.id" class="card">
        <button class="hapus-button" @click="showConfirm(item.id)">×</button>
        <router-link :to="{ name: 'product-detail', params: { name: slugify(item.nama) } }">
          <img :src="item.image" alt="Foto Produk" class="card-image" />
        </router-link>
        <div class="card-body">
          <p class="product-official">Toko Suma Official</p>
          <p class="product-name">{{ item.nama }}</p>
          <p class="product-price">Rp {{ formatRupiah(item.harga) }}</p>
          <small>Ditambahkan: {{ formatTanggal(item.tanggal) }}</small>
        </div>
      </div>
    </div>
    <div v-else class="empty-wishlist">
      <h3>Belum ada barang di wishlist 💔</h3>
      <p>Yuk, temukan produk favoritmu dan tambahkan ke wishlist untuk disimpan!</p>
    </div>

    <!-- Modal Konfirmasi -->
    <div v-if="modalConfirm" class="modal-overlay">
      <div class="modal-box">
        <h3>Konfirmasi</h3>
        <p>Apakah Anda yakin ingin menghapus wishlist ini?</p>
        <div class="modal-actions">
          <button @click="modalConfirm = false">Batal</button>
          <button class="hapus" @click="hapusItem(confirmId)">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { wishlist } from "../../data/wishlist";

// Reactive data
const modalConfirm = ref(false);
const confirmId = ref(null);
const sortBy = ref("terbaru");

// Computed properties
const filteredWishlist = computed(() => {
  const sorted = [...wishlist.value];
  const sortFunctions = {
    terbaru: (a, b) => new Date(b.tanggal) - new Date(a.tanggal),
    terlama: (a, b) => new Date(a.tanggal) - new Date(b.tanggal),
    termurah: (a, b) => a.harga - b.harga,
    termahal: (a, b) => b.harga - a.harga,
  };

  return sorted.sort(sortFunctions[sortBy.value] || sortFunctions.terbaru);
});

// Methods
const showConfirm = (id) => {
  confirmId.value = id;
  modalConfirm.value = true;
};

const hapusItem = (id) => {
  wishlist.value = wishlist.value.filter((item) => item.id !== id);
  modalConfirm.value = false;
  confirmId.value = null;
};

const formatRupiah = (angka) => {
  return angka.toLocaleString("id-ID");
};

const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
</script>

<style scoped>
/* Layout */
.wishlist-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.title-info h2 {
  font-size: 20px;
  margin: 0 0 5px 0;
  color: #333;
}

.title-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort label {
  font-size: 14px;
  color: #444;
}

.sort select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hapus-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s ease;
}

.hapus-button:hover {
  background: rgba(255, 0, 0, 1);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 12px;
}

.product-official {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px 0;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-price {
  font-size: 16px;
  font-weight: 600;
  color: #e85423;
  margin: 0 0 8px 0;
}

.card-body small {
  font-size: 11px;
  color: #999;
}

/* Empty State */
.empty-wishlist {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-wishlist h3 {
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #333;
}

.empty-wishlist p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-box h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.modal-box p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal-actions button {
  padding: 8px 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.modal-actions button:hover {
  background: #e9e9e9;
}

.modal-actions button.hapus {
  background: #e85423;
  color: white;
  border-color: #e85423;
}

.modal-actions button.hapus:hover {
  background: #d44a1f;
}

/* Responsive */
@media (max-width: 768px) {
  .wishlist-container {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .card-image {
    height: 120px;
  }

  .card-body {
    padding: 10px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-price {
    font-size: 14px;
  }
}
</style>
