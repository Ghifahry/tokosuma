<template>
  <div class="cart-summary desktop-summary">
    <div class="summary-card">
      <h2 class="summary-title">Ringkasan Keranjang</h2>

      <div class="summary-items">
        <div class="summary-item">
          <span>Total Produk ({{ totalItems }})</span>
          <span>Rp{{ formattedSubtotal }}</span>
        </div>

        <div v-if="discount > 0" class="summary-item discount">
          <span>Diskon</span>
          <span>-Rp{{ formattedDiscount }}</span>
        </div>

        <div class="summary-item">
          <span>Ongkos Kirim</span>
          <span>{{ formattedShippingCost }}</span>
        </div>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-total">
        <span class="total-label">Total Pembayaran</span>
        <span class="total-amount">Rp{{ formattedFinalTotal }}</span>
      </div>

      <button class="checkout-btn" @click="$emit('checkout')" :disabled="!hasSelectedItems">
        <i class="fas fa-credit-card"></i>
        Checkout ({{ selectedItemsCount }})
      </button>

      <div class="shipping-info">
        <i class="fas fa-truck"></i>
        <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
      </div>
    </div>
  </div>

  <!-- Mobile Cart Summary (Fixed Bottom) -->
  <div class="mobile-cart-summary" :class="{ expanded: showMobileSummary }">
    <div class="mobile-summary-header" @click="toggleMobileSummary">
      <div class="mobile-summary-preview">
        <div class="mobile-summary-info">
          <span class="mobile-total-label">Total Pembayaran</span>
          <span class="mobile-total-amount">Rp{{ formattedFinalTotal }}</span>
        </div>
        <button class="mobile-checkout-btn" @click.stop="$emit('checkout')" :disabled="!hasSelectedItems">
          <i class="fas fa-credit-card"></i>
          Checkout ({{ selectedItemsCount }})
        </button>
      </div>
      <div class="mobile-summary-toggle">
        <i class="fas" :class="showMobileSummary ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
        <span>{{ showMobileSummary ? "Sembunyikan" : "Lihat Ringkasan" }}</span>
      </div>
    </div>

    <div class="mobile-summary-content" v-show="showMobileSummary">
      <div class="mobile-summary-items">
        <div class="mobile-summary-item">
          <span>Total Produk ({{ totalItems }})</span>
          <span>Rp{{ formattedSubtotal }}</span>
        </div>

        <div v-if="discount > 0" class="mobile-summary-item discount">
          <span>Diskon</span>
          <span>-Rp{{ formattedDiscount }}</span>
        </div>

        <div class="mobile-summary-item">
          <span>Ongkos Kirim</span>
          <span>{{ formattedShippingCost }}</span>
        </div>
      </div>

      <div class="mobile-summary-divider"></div>

      <div class="mobile-shipping-info">
        <i class="fas fa-truck"></i>
        <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartSummary",
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    finalTotal: {
      type: Number,
      default: 0,
    },
    hasSelectedItems: {
      type: Boolean,
      default: false,
    },
    selectedItemsCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showMobileSummary: false,
    };
  },
  computed: {
    formattedSubtotal() {
      return this.formatPrice(this.subtotal);
    },
    formattedDiscount() {
      return this.formatPrice(this.discount);
    },
    formattedShippingCost() {
      return this.shippingCost === 0 ? "Gratis" : `Rp${this.formatPrice(this.shippingCost)}`;
    },
    formattedFinalTotal() {
      return this.formatPrice(this.finalTotal);
    },
  },
  emits: ["checkout"],
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price || 0);
    },
    toggleMobileSummary() {
      this.showMobileSummary = !this.showMobileSummary;
    },
  },
};
</script>

<style scoped>
/* Desktop Summary */
.cart-summary {
  position: sticky;
  top: 2rem;
}

.desktop-summary {
  display: block;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

.checkout-btn {
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

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(232, 84, 35, 0.3);
}

.checkout-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.shipping-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.shipping-info i {
  color: #e85423;
}

/* Mobile Cart Summary */
.mobile-cart-summary {
  display: none;
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e1e5e9;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 12px 12px 0 0;
  transition: all 0.3s ease;
  margin: 0 10px;
  width: calc(100% - 20px);
}

.mobile-summary-header {
  padding: 1rem;
  cursor: pointer;
  border-radius: 12px 12px 0 0;
}

.mobile-summary-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.mobile-summary-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-total-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.mobile-total-amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #e85423;
}

.mobile-checkout-btn {
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.mobile-checkout-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(232, 84, 35, 0.3);
}

.mobile-checkout-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.mobile-summary-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0;
}

.mobile-summary-toggle i {
  transition: transform 0.3s ease;
}

.mobile-summary-content {
  padding: 1rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
}

.mobile-summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mobile-summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.mobile-summary-item.discount {
  color: #28a745;
  font-weight: 500;
}

.mobile-summary-divider {
  height: 1px;
  background: #eee;
  margin: 0.75rem 0;
}

.mobile-shipping-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
}

.mobile-shipping-info i {
  color: #e85423;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  /* Hide desktop summary on mobile */
  .desktop-summary {
    display: none;
  }

  /* Show mobile summary on mobile */
  .mobile-cart-summary {
    display: block !important;
  }

  /* Add bottom padding to cart content to prevent overlap */
  .cart-main {
    padding-bottom: 140px;
  }
}
</style>
