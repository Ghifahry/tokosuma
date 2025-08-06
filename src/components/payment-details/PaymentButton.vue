<template>
  <div class="payment-button-section">
    <button class="pay-now-btn" @click="$emit('process-payment')" :disabled="!canProceed || selectedItems.length === 0">
      <i class="fas fa-lock"></i>
      {{ selectedItems.length === 0 ? "Tidak ada produk" : "Bayar Sekarang" }}
    </button>

    <div class="security-info">
      <i class="fas fa-shield-alt"></i>
      <span>Pembayaran aman dengan enkripsi SSL</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentButton",
  props: {
    canProceed: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["process-payment"],
};
</script>

<style scoped>
.payment-button-section {
  margin-bottom: 1rem;
}

.pay-now-btn {
  width: 100%;
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.pay-now-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(232, 84, 35, 0.3);
}

.pay-now-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.security-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.security-info i {
  color: #28a745;
}
</style>
