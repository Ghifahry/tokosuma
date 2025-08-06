<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ editingAddress ? "Edit Alamat" : "Tambah Alamat Baru" }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="saveAddress">
          <div class="form-group">
            <label>Label Alamat</label>
            <input type="text" v-model="addressForm.label" placeholder="Contoh: Rumah Pribadi, Kantor" required />
          </div>
          <div class="form-group">
            <label>Nama Penerima</label>
            <input type="text" v-model="addressForm.recipientName" placeholder="Nama lengkap penerima" required />
          </div>
          <div class="form-group">
            <label>Nomor Telepon</label>
            <input type="tel" v-model="addressForm.phoneNumber" placeholder="081234567890" required />
          </div>
          <div class="form-group">
            <label>Detail Alamat</label>
            <textarea v-model="addressForm.detail" placeholder="Jalan, nomor rumah, RT/RW" required></textarea>
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="addressForm.kategori">
              <option value="Rumah">Rumah</option>
              <option value="Kantor">Kantor</option>
              <option value="Kos">Kos</option>
              <option value="Gudang">Gudang</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div class="form-group">
            <label>Kode Pos</label>
            <input type="text" v-model="addressForm.kodepos" placeholder="12345" required />
          </div>
          <div class="form-group">
            <label>Provinsi</label>
            <input type="text" v-model="addressForm.provinsi" placeholder="DKI Jakarta" required />
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="addressForm.utama" />
              Jadikan alamat utama
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="$emit('close')">Batal</button>
            <button type="submit" class="btn-primary">
              {{ editingAddress ? "Update" : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    editingAddress: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      addressForm: {
        label: "",
        recipientName: "",
        phoneNumber: "",
        detail: "",
        kategori: "Rumah",
        kodepos: "",
        provinsi: "",
        utama: false,
      },
    };
  },
  emits: ["close", "save-address"],
  watch: {
    editingAddress: {
      handler(newAddress) {
        if (newAddress) {
          // Convert from payment format to Alamat.vue format
          this.addressForm = {
            label: newAddress.label || "",
            recipientName: newAddress.recipientName || "",
            phoneNumber: newAddress.phoneNumber || "",
            detail: newAddress.detail || newAddress.fullAddress || "",
            kategori: newAddress.kategori || newAddress.type || "Rumah",
            kodepos: newAddress.kodepos || "",
            provinsi: newAddress.provinsi || "",
            utama: newAddress.utama || newAddress.isPrimary || false,
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  methods: {
    saveAddress() {
      this.$emit("save-address", this.addressForm);
      this.resetForm();
    },
    resetForm() {
      this.addressForm = {
        label: "",
        recipientName: "",
        phoneNumber: "",
        detail: "",
        kategori: "Rumah",
        kodepos: "",
        provinsi: "",
        utama: false,
      };
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #e85423;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e9ecef;
  color: #333;
}

.btn-primary {
  background: #e85423;
  color: white;
}

.btn-primary:hover {
  background: #d44a1f;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
