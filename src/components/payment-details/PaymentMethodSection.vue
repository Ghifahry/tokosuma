<template>
  <div class="payment-method-section">
    <h3 class="section-title">Metode Pembayaran</h3>
    <div class="payment-methods">
      <div v-if="paymentMethods.length === 0" class="empty-payment-methods">
        <p>Tidak ada metode pembayaran tersedia</p>
      </div>
      <div v-else v-for="method in paymentMethods" :key="method.id" class="payment-method-item" :class="{ active: selectedPaymentMethod?.id === method.id }" @click="$emit('select-payment-method', method)">
        <div class="method-info">
          <div class="method-icon">{{ method.icon || "💳" }}</div>
          <div class="method-details">
            <h4 class="method-name">{{ method.name || "Metode Pembayaran" }}</h4>
            <p class="method-description">{{ method.description || "Deskripsi metode pembayaran" }}</p>
          </div>
        </div>
        <div class="method-radio">
          <input type="radio" :name="'payment-method'" :value="method.id" :checked="selectedPaymentMethod?.id === method.id" @change="$emit('select-payment-method', method)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentMethodSection",
  props: {
    paymentMethods: {
      type: Array,
      default: () => [],
    },
    selectedPaymentMethod: {
      type: Object,
      default: null,
    },
  },
  emits: ["select-payment-method"],
};
</script>

<style scoped>
.payment-method-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #e85423;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-method-item {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-method-item:hover {
  border-color: #e85423;
}

.payment-method-item.active {
  border-color: #e85423;
  background: #fff5f2;
}

.method-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.method-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.method-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.method-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.method-description {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.method-radio input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #e85423;
}

.empty-payment-methods {
  text-align: center;
  padding: 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .payment-method-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .method-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>
