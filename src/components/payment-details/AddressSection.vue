<template>
  <div class="address-card">
    <div class="card-header">
      <h3 class="card-title">Pilih Alamat Pengiriman</h3>
      <button class="add-address-btn" @click="$emit('show-address-modal')">
        <i class="fas fa-plus"></i>
        Tambah Alamat
      </button>
    </div>

    <div class="address-list">
      <div v-if="addresses.length === 0" class="empty-addresses">
        <p>Belum ada alamat tersimpan</p>
        <button class="add-first-address-btn" @click="$emit('show-address-modal')">
          <i class="fas fa-plus"></i>
          Tambah Alamat Pertama
        </button>
      </div>
      <div v-else v-for="address in addresses" :key="address.id" class="address-item" :class="{ active: selectedAddress?.id === address.id }" @click="$emit('select-address', address)">
        <div class="address-content">
          <div class="address-info">
            <div class="address-header">
              <h4 class="recipient-name">{{ address.recipientName || "Nama Penerima" }}</h4>
              <span v-if="address.utama || address.isPrimary" class="badge primary">Utama</span>
            </div>
            <p class="address-label">{{ address.label }}</p>
            <p class="phone-number">{{ address.phoneNumber || "Nomor Telepon" }}</p>
            <p class="address-text">{{ address.detail || address.fullAddress || "Alamat Lengkap" }}</p>
            <div class="address-tags">
              <span class="tag">{{ address.kategori || address.type || "Tipe Alamat" }}</span>
              <span class="tag">{{ address.kodepos || "Kode Pos" }}</span>
              <span class="tag">{{ address.provinsi || "Provinsi" }}</span>
            </div>
          </div>
          <div class="address-actions">
            <button class="edit-btn" @click.stop="$emit('edit-address', address)">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressSection",
  props: {
    addresses: {
      type: Array,
      default: () => [],
    },
    selectedAddress: {
      type: Object,
      default: null,
    },
  },
  emits: ["show-address-modal", "select-address", "edit-address"],
};
</script>

<style scoped>
.address-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title i {
  color: #e85423;
}

.add-address-btn {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.add-address-btn:hover {
  background: #d44a1f;
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.address-item {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.address-item:hover {
  border-color: #e85423;
}

.address-item.active {
  border-color: #e85423;
  background: #fff5f2;
}

.address-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.address-info {
  flex: 1;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.recipient-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.address-label {
  font-size: 0.9rem;
  color: #e85423;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.phone-number {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.address-text {
  font-size: 0.9rem;
  color: #333;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.address-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge {
  background: #e85423;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.primary {
  background: #e85423;
}

.edit-btn {
  background: none;
  border: none;
  color: #e85423;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #fff5f2;
}

.empty-addresses {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.add-first-address-btn {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin: 1rem auto 0;
  transition: all 0.3s ease;
}

.add-first-address-btn:hover {
  background: #d44a1f;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .add-address-btn {
    width: 100%;
    justify-content: center;
  }

  .address-content {
    flex-direction: column;
    gap: 1rem;
  }

  .address-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
