<template>
  <div class="transaction-summary">
    <h3 class="section-title">Ringkasan Transaksi</h3>
    <div class="summary-items" v-if="selectedItems && selectedItems.length > 0">
      <div class="summary-item">
        <span>Total Produk ({{ totalItems }})</span>
        <span>Rp{{ formatPrice(subtotal) }}</span>
      </div>
      <div v-if="discount > 0" class="summary-item discount">
        <span>Diskon</span>
        <span>-Rp{{ formatPrice(discount) }}</span>
      </div>
      <div class="summary-item">
        <span>Ongkos Kirim</span>
        <span>{{ (shippingCost || 0) === 0 ? "Gratis" : `Rp${formatPrice(shippingCost || 0)}` }}</span>
      </div>
      <div v-if="appliedPromo" class="summary-item discount">
        <span>Promo {{ appliedPromo.name || "Promo" }}</span>
        <span>-Rp{{ formatPrice(appliedPromo.discount || 0) }}</span>
      </div>
    </div>
    <div v-else class="summary-items">
      <div class="summary-item">
        <span>Total Produk</span>
        <span>Rp0</span>
      </div>
      <div class="summary-item">
        <span>Ongkos Kirim</span>
        <span>{{ (shippingCost || 0) === 0 ? "Gratis" : `Rp${formatPrice(shippingCost || 0)}` }}</span>
      </div>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-total">
      <span class="total-label">Total Pembayaran</span>
      <span class="total-amount">Rp{{ formatPrice(finalTotal || 0) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionSummary",
  props: {
    selectedItems: {
      type: Array,
      default: () => [],
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    appliedPromo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    totalItems() {
      try {
        if (!this.selectedItems || !Array.isArray(this.selectedItems)) {
          return 0;
        }
        return this.selectedItems.reduce((total, item) => total + (item.quantity || 0), 0);
      } catch (error) {
        console.error("Error calculating totalItems:", error);
        return 0;
      }
    },
    subtotal() {
      try {
        if (!this.selectedItems || !Array.isArray(this.selectedItems)) {
          return 0;
        }
        return this.selectedItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
      } catch (error) {
        console.error("Error calculating subtotal:", error);
        return 0;
      }
    },
    discount() {
      try {
        if (!this.selectedItems || !Array.isArray(this.selectedItems)) {
          return 0;
        }
        return this.selectedItems.reduce((total, item) => {
          if (item.originalPrice) {
            return total + (item.originalPrice - (item.price || 0)) * (item.quantity || 0);
          }
          return total;
        }, 0);
      } catch (error) {
        console.error("Error calculating discount:", error);
        return 0;
      }
    },
    finalTotal() {
      try {
        let total = (this.subtotal || 0) - (this.discount || 0) + (this.shippingCost || 0);
        if (this.appliedPromo && this.appliedPromo.discount) {
          total -= this.appliedPromo.discount;
        }
        return total;
      } catch (error) {
        console.error("Error calculating finalTotal:", error);
        return 0;
      }
    },
  },
  methods: {
    formatPrice(price) {
      try {
        return new Intl.NumberFormat("id-ID").format(price || 0);
      } catch (error) {
        console.error("Error formatting price:", error);
        return "0";
      }
    },
  },
};
</script>

<style scoped>
.transaction-summary {
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

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.summary-item.discount {
  color: #28a745;
  font-weight: 500;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 1rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.total-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.total-amount {
  font-size: 1.3rem;
  font-weight: 700;
  color: #e85423;
}
</style>
