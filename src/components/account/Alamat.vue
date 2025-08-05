<template>
  <div class="alamat-container">
    <div class="header">
      <div class="title-info">
        <h2>Alamat</h2>
      </div>
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

        <!-- Tombol edit dan hapus di bawah -->
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
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px">
          <button @click="batalHapus" class="btn-outline">Batal</button>
          <button @click="konfirmasiHapus" style="background-color: #f44336; color: white; padding: 6px 12px; border-radius: 4px">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const daftarAlamat = ref([
  {
    id: 1,
    label: "Rumah Pribadi",
    detail: "Jalan Melati No. 123, Jakarta Selatan",
    kategori: "Rumah",
    kodepos: "12130",
    provinsi: "DKI Jakarta",
    utama: true,
  },
  {
    id: 2,
    label: "Alamat Kantor",
    detail: "Jl. Jendral Sudirman Kav. 45, Jakarta Pusat",
    kategori: "Kantor",
    kodepos: "10220",
    provinsi: "DKI Jakarta",
    utama: false,
  },
]);

const showForm = ref(false);
const editingId = ref(null);
const form = ref({
  label: "",
  detail: "",
  kategori: "",
  kodepos: "",
  provinsi: "",
  utama: false,
});

const showConfirm = ref(false);
const idAlamatYangDihapus = ref(null);

function tambahAlamat() {
  if (editingId.value !== null) {
    const index = daftarAlamat.value.findIndex((a) => a.id === editingId.value);
    if (index !== -1) {
      if (form.value.utama) {
        daftarAlamat.value.forEach((a) => (a.utama = false));
      }
      daftarAlamat.value[index] = {
        id: editingId.value,
        label: form.value.label,
        detail: form.value.detail,
        kategori: form.value.kategori,
        kodepos: form.value.kodepos,
        provinsi: form.value.provinsi,
        utama: form.value.utama,
      };
    }
  } else {
    const newAlamat = {
      id: Date.now(),
      label: form.value.label,
      detail: form.value.detail,
      kategori: form.value.kategori,
      kodepos: form.value.kodepos,
      provinsi: form.value.provinsi,
      utama: form.value.utama,
    };

    if (newAlamat.utama) {
      daftarAlamat.value.forEach((a) => (a.utama = false));
    }

    daftarAlamat.value.push(newAlamat);
  }

  form.value = {
    label: "",
    detail: "",
    kategori: "",
    kodepos: "",
    provinsi: "",
    utama: false,
  };
  editingId.value = null;
  showForm.value = false;
}

function editAlamat(alamat) {
  editingId.value = alamat.id;
  form.value = { ...alamat };
  showForm.value = true;
}

function hapusAlamat(id) {
  idAlamatYangDihapus.value = id;
  showConfirm.value = true;
}

function konfirmasiHapus() {
  daftarAlamat.value = daftarAlamat.value.filter((a) => a.id !== idAlamatYangDihapus.value);
  showConfirm.value = false;
  idAlamatYangDihapus.value = null;
}

function batalHapus() {
  showConfirm.value = false;
  idAlamatYangDihapus.value = null;
}

function batalEdit() {
  form.value = {
    label: "",
    detail: "",
    kategori: "",
    kodepos: "",
    provinsi: "",
    utama: false,
  };
  editingId.value = null;
  showForm.value = false;
}

function gunakanLokasi() {
  alert("🔍 Fitur ini akan terhubung dengan Google Maps / GPS.");
}
</script>

<style scoped>
.alamat-container {
  padding: 15px 20px 20px 20px;
  background: #fff;
  border-radius: 8px;
}

.header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.title-info h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.tambah-btn {
  background-color: #e85423;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
}

.alamat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alamat-card {
  border: 1px solid #ddd;
  padding: 14px;
  border-radius: 6px;
  background-color: #fdfdfd;
}

.alamat-card.utama {
  border-color: #e85423;
  background-color: #fff7f3;
}

.alamat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  background-color: #e85423;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.alamat-text {
  margin: 6px 0;
  font-size: 14px;
  color: #444;
}

.kategori {
  font-size: 12px;
  color: #888;
}

.alamat-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.btn-outline {
  background: white;
  border: 1px solid #222;
  color: #222;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.alamat-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alamat-form input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.alamat-form button {
  background-color: #e85423;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.lokasi-btn {
  background-color: #e9e7e7;
  color: #333;
  font-size: 13px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
