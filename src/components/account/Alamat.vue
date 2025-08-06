<template>
  <div class="alamat-container">
    <div class="header">
      <button class="tambah-btn" @click="showForm = true">Tambah Alamat</button>
    </div>

    <!-- List Alamat -->
    <div class="alamat-list">
      <div v-for="alamat in daftarAlamat" :key="alamat.id" class="alamat-card" :class="{ utama: alamat.utama }">
        <div class="alamat-header">
          <h3>{{ alamat.label }}</h3>
          <span v-if="alamat.utama" class="badge">Alamat Utama</span>
        </div>
        <p class="alamat-text">{{ alamat.detail }}</p>
        <small class="kategori">Kategori: {{ alamat.kategori }}</small
        ><br />
        <small class="kategori">Kode Pos: {{ alamat.kodepos }} | Provinsi: {{ alamat.provinsi }}</small>

        <div class="alamat-actions">
          <button class="btn-outline" @click="editAlamat(alamat)">Edit</button>
          <button class="btn-outline" @click="hapusAlamat(alamat.id)">Hapus</button>
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah / Edit Alamat -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingId !== null ? "Edit Alamat" : "Tambah Alamat Baru" }}</h3>
          <button class="close-btn" @click="batalEdit">❌</button>
        </div>

        <form @submit.prevent="tambahAlamat" class="alamat-form">
          <input v-model="form.label" type="text" placeholder="Label (contoh: Rumah Nenek)" required />
          <input v-model="form.recipientName" type="text" placeholder="Nama Penerima" required />
          <input v-model="form.phoneNumber" type="text" placeholder="Nomor Telepon" required />
          <input v-model="form.detail" type="text" placeholder="Detail Alamat" required />
          <input v-model="form.kategori" type="text" placeholder="Kategori (contoh: Gudang, Kos, dll)" required />
          <input v-model="form.kodepos" type="text" placeholder="Kode Pos" required />
          <input v-model="form.provinsi" type="text" placeholder="Provinsi" required />
          <button type="button" @click="gunakanLokasi" class="lokasi-btn">📍 Gunakan Lokasi dari Google Maps</button>
          <label><input type="checkbox" v-model="form.utama" /> Jadikan Alamat Utama</label>
          <button type="submit">{{ editingId !== null ? "Update Alamat" : "Simpan Alamat" }}</button>
          <button type="button" @click="batalEdit" v-if="editingId !== null">Batal</button>
        </form>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div v-if="showConfirm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Konfirmasi Hapus</h3>
          <button class="close-btn" @click="batalHapus">❌</button>
        </div>
        <p>Apakah Anda yakin ingin menghapus alamat ini?</p>
        <div class="modal-actions">
          <button @click="batalHapus" class="btn-outline">Batal</button>
          <button @click="konfirmasiHapus" class="btn-danger">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAddress } from "../../composables/useAddress";

// Use the global address composable
const { addresses: daftarAlamat, addAddress, updateAddress, deleteAddress, saveAddressesToStorage } = useAddress();

const showForm = ref(false);
const showConfirm = ref(false);
const editingId = ref(null);
const deleteId = ref(null);

const form = ref({
  label: "",
  detail: "",
  kategori: "",
  kodepos: "",
  provinsi: "",
  utama: false,
  recipientName: "",
  phoneNumber: "",
});

// Methods
const resetForm = () => {
  form.value = {
    label: "",
    detail: "",
    kategori: "",
    kodepos: "",
    provinsi: "",
    utama: false,
    recipientName: "",
    phoneNumber: "",
  };
  editingId.value = null;
};

const editAlamat = (alamat) => {
  form.value = {
    label: alamat.label,
    detail: alamat.detail,
    kategori: alamat.kategori,
    kodepos: alamat.kodepos,
    provinsi: alamat.provinsi,
    utama: alamat.utama,
    recipientName: alamat.recipientName || "",
    phoneNumber: alamat.phoneNumber || "",
  };
  editingId.value = alamat.id;
  showForm.value = true;
};

const hapusAlamat = (id) => {
  deleteId.value = id;
  showConfirm.value = true;
};

const konfirmasiHapus = () => {
  deleteAddress(deleteId.value);
  saveAddressesToStorage();
  showConfirm.value = false;
  deleteId.value = null;
};

const batalHapus = () => {
  showConfirm.value = false;
  deleteId.value = null;
};

const batalEdit = () => {
  showForm.value = false;
  resetForm();
};

const tambahAlamat = () => {
  if (editingId.value !== null) {
    // Update existing address
    updateAddress(editingId.value, form.value);
  } else {
    // Add new address
    addAddress(form.value);
  }

  saveAddressesToStorage();
  showForm.value = false;
  resetForm();
};

const gunakanLokasi = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Here you would typically reverse geocode the coordinates
        // For now, we'll just show an alert
        alert(`Lokasi: ${latitude}, ${longitude}\nFitur reverse geocoding belum diimplementasi.`);
      },
      (error) => {
        alert("Tidak dapat mengakses lokasi: " + error.message);
      }
    );
  } else {
    alert("Geolokasi tidak didukung di browser ini.");
  }
};
</script>

<style scoped>
/* Layout */
.alamat-container {
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
  margin: 0;
  color: #333;
}

.tambah-btn {
  background: #e85423;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.tambah-btn:hover {
  background: #d44a1f;
}

/* Address List */
.alamat-list {
  display: grid;
  gap: 15px;
}

.alamat-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
  transition: box-shadow 0.2s ease;
}

.alamat-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.alamat-card.utama {
  border-color: #e85423;
  background: #fff5f2;
}

.alamat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.alamat-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.badge {
  background: #e85423;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.alamat-text {
  margin: 0 0 8px 0;
  color: #555;
  line-height: 1.4;
}

.kategori {
  color: #666;
  font-size: 12px;
}

.alamat-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: #f0f0f0;
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

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form */
.alamat-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.alamat-form input[type="text"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.alamat-form input[type="text"]:focus {
  outline: none;
  border-color: #e85423;
}

.lokasi-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.lokasi-btn:hover {
  background: #45a049;
}

.alamat-form label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
}

.alamat-form button[type="submit"] {
  background: #e85423;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.alamat-form button[type="submit"]:hover {
  background: #d44a1f;
}

.alamat-form button[type="button"] {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.alamat-form button[type="button"]:hover {
  background: #e0e0e0;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding: 0 20px 20px;
}

.btn-danger {
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.btn-danger:hover {
  background: #d32f2f;
}

/* Responsive */
@media (max-width: 768px) {
  .alamat-container {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .alamat-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .alamat-actions {
    flex-direction: column;
  }

  .modal-content {
    width: 95%;
    margin: 10px;
  }

  .alamat-form {
    padding: 15px;
  }
}
</style>
