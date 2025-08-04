<template>
  <div class="cart-container">
    <CustomSidebar @sidebar-toggle="handleSidebarToggle" />

    <div class="cart-main">
      <!-- Cart Header -->
      <div class="cart-header">
        <h1 class="cart-title">Keranjang</h1>
      </div>

      <div class="cart-content">
        <!-- Left Side - Product List -->
        <div class="cart-products">
          <!-- Select All Card -->
          <div class="select-all-card">
            <div class="select-all-content">
              <label class="checkbox-container">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="checkbox-input" />
                <span class="checkmark"></span>
                <span class="select-all-text">Pilih Semua</span>
              </label>
              <button class="delete-selected-btn" @click="deleteSelected" :disabled="!hasSelectedItems">
                <i class="fas fa-trash"></i>
                Hapus
              </button>
            </div>
          </div>

          <!-- Product Cards -->
          <div class="product-cards">
            <div v-for="item in cartItems" :key="item.id" class="product-card">
              <div class="product-select">
                <label class="checkbox-container">
                  <input type="checkbox" v-model="item.selected" @change="updateSelectAll" class="checkbox-input" />
                  <span class="checkmark"></span>
                </label>
              </div>

              <div class="product-image">
                <img :src="item.image" :alt="item.name" />
              </div>

              <div class="product-details">
                <div class="store-info">
                  <i class="fas fa-store"></i>
                  <span class="store-name">{{ item.store || "TokoSuma Official Store" }}</span>
                </div>
                <h3 class="product-name">{{ item.name }}</h3>
                <p class="product-variant" v-if="item.variant">{{ item.variant }}</p>
                <div class="product-price">
                  <span class="current-price">Rp{{ formatPrice(item.price) }}</span>
                  <span v-if="item.originalPrice" class="original-price">Rp{{ formatPrice(item.originalPrice) }}</span>
                </div>
              </div>

              <div class="product-quantity">
                <button class="delete-btn" @click="deleteItem(item.id)">
                  <i class="fas fa-trash"></i>
                </button>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" :disabled="item.quantity >= item.stock">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div class="product-total">
                <span class="total-price">Rp{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <h3>Keranjang Kosong</h3>
            <p>Belum ada produk di keranjang Anda</p>
            <router-link to="/" class="continue-shopping-btn"> Lanjutkan Belanja </router-link>
          </div>
        </div>

        <!-- Right Side - Cart Summary (Desktop) -->
        <div class="cart-summary desktop-summary">
          <div class="summary-card">
            <h2 class="summary-title">Ringkasan Keranjang</h2>

            <div class="summary-items">
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
                <span>{{ shippingCost === 0 ? "Gratis" : `Rp${formatPrice(shippingCost)}` }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span class="total-label">Total Pembayaran</span>
              <span class="total-amount">Rp{{ formatPrice(totalAmount) }}</span>
            </div>

            <button class="checkout-btn" @click="checkout" :disabled="!hasSelectedItems">
              <i class="fas fa-credit-card"></i>
              Checkout ({{ selectedItemsCount }})
            </button>

            <div class="shipping-info">
              <i class="fas fa-truck"></i>
              <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Cart Summary (Fixed Bottom) -->
      <div class="mobile-cart-summary" :class="{ expanded: showMobileSummary }" style="display: none">
        <div class="mobile-summary-header" @click="toggleMobileSummary">
          <div class="mobile-summary-preview">
            <div class="mobile-summary-info">
              <span class="mobile-total-label">Total Pembayaran</span>
              <span class="mobile-total-amount">Rp{{ formatPrice(totalAmount) }}</span>
            </div>
            <button class="mobile-checkout-btn" @click.stop="checkout" :disabled="!hasSelectedItems">
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
              <span>Rp{{ formatPrice(subtotal) }}</span>
            </div>

            <div v-if="discount > 0" class="mobile-summary-item discount">
              <span>Diskon</span>
              <span>-Rp{{ formatPrice(discount) }}</span>
            </div>

            <div class="mobile-summary-item">
              <span>Ongkos Kirim</span>
              <span>{{ shippingCost === 0 ? "Gratis" : `Rp${formatPrice(shippingCost)}` }}</span>
            </div>
          </div>

          <div class="mobile-summary-divider"></div>

          <div class="mobile-shipping-info">
            <i class="fas fa-truck"></i>
            <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",

  data() {
    return {
      sidebarExpanded: true,
      selectAll: false,
      cartItems: [],
      shippingCost: 0,
      showMobileSummary: false,
    };
  },
  computed: {
    selectedItems() {
      return this.cartItems.filter((item) => item.selected);
    },
    selectedItemsCount() {
      return this.selectedItems.length;
    },
    hasSelectedItems() {
      return this.selectedItemsCount > 0;
    },
    totalItems() {
      return this.selectedItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal() {
      return this.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    discount() {
      return this.selectedItems.reduce((total, item) => {
        if (item.originalPrice) {
          return total + (item.originalPrice - item.price) * item.quantity;
        }
        return total;
      }, 0);
    },
    totalAmount() {
      return this.subtotal - this.discount + this.shippingCost;
    },
  },
  methods: {
    handleSidebarToggle(isExpanded) {
      this.sidebarExpanded = isExpanded;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },
    toggleSelectAll() {
      this.cartItems.forEach((item) => {
        item.selected = this.selectAll;
      });
    },
    updateSelectAll() {
      this.selectAll = this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
    },
    increaseQuantity(item) {
      if (item.quantity < item.stock) {
        item.quantity++;
        this.saveCartItems();
      }
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveCartItems();
      }
    },
    deleteItem(itemId) {
      const index = this.cartItems.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.updateSelectAll();
        this.saveCartItems();
      }
    },
    deleteSelected() {
      this.cartItems = this.cartItems.filter((item) => !item.selected);
      this.updateSelectAll();
      this.saveCartItems();
    },
    checkout() {
      if (this.hasSelectedItems) {
        // Implement checkout logic here
        console.log("Proceeding to checkout with items:", this.selectedItems);
        alert(`Checkout ${this.selectedItemsCount} items for Rp${this.formatPrice(this.totalAmount)}`);
      }
    },
    loadCartItems() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    },
    saveCartItems() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    toggleMobileSummary() {
      this.showMobileSummary = !this.showMobileSummary;
    },
  },
  mounted() {
    this.loadCartItems();
    this.updateSelectAll();
  },
};
</script>

<style scoped>
.cart-container {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.cart-main {
  flex: 1;
  padding: 2rem;
}

.cart-header {
  margin-bottom: 5rem;
}

.cart-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  align-items: start;
}

/* Left Side - Product List */
.cart-products {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.select-all-card {
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.select-all-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkmark {
  background: #e85423;
  border-color: #e85423;
}

.checkbox-input:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.delete-selected-btn {
  background: #dc3545;
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

.delete-selected-btn:hover:not(:disabled) {
  background: #c82333;
}

.delete-selected-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.product-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 80px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
}

.product-select {
  display: flex;
  align-items: center;
}

.product-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.store-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.store-info i {
  color: #e85423;
  font-size: 0.8rem;
}

.store-name {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.product-variant {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-weight: 600;
  color: #e85423;
  font-size: 1rem;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-controls button {
  background: #f8f9fa;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  padding: 0.5rem 1rem;
  min-width: 40px;
  text-align: center;
  font-weight: 500;
}

.total-price {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #f8d7da;
}

/* Empty Cart State */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-cart i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-cart h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.continue-shopping-btn {
  background: #e85423;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background: #d44a1f;
}

/* Right Side - Cart Summary */
.cart-summary {
  position: sticky;
  top: 2rem;
}

/* Desktop Summary */
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

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-main {
    padding: 1rem;
  }

  .product-card {
    grid-template-columns: auto 60px 1fr;
    gap: 0.75rem;
    text-align: left;
    align-items: flex-start;
    padding: 1.5rem;
    position: relative;
    min-height: 120px;
  }

  .product-select {
    display: flex;
    align-items: center;
  }

  .checkbox-container {
    gap: 0.5rem;
  }

  .checkmark {
    width: 18px;
    height: 18px;
  }

  .product-image {
    justify-self: start;
  }

  .product-image img {
    width: 70px;
    height: 70px;
  }

  .product-details {
    flex: 1;
    min-width: 0;
  }

  .store-info {
    margin-bottom: 0.2rem;
  }

  .store-info i {
    font-size: 0.7rem;
  }

  .store-name {
    font-size: 0.7rem;
  }

  .product-name {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    line-height: 1.3;
    opacity: 0.9;
  }

  .product-variant {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
    color: #888;
  }

  .product-price {
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    align-items: flex-start;
  }

  .current-price {
    font-size: 0.9rem;
    text-align: left;
  }

  .original-price {
    font-size: 0.8rem;
    text-align: left;
  }

  .product-quantity {
    justify-self: end;
    align-self: flex-end;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }

  .quantity-controls button {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }

  .quantity {
    padding: 0.3rem 0.6rem;
    min-width: 30px;
    font-size: 0.8rem;
  }

  .product-total {
    display: none;
  }

  .product-quantity {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .product-actions {
    display: none;
  }

  .delete-btn {
    padding: 0.25rem 0.4rem;
    font-size: 0.7rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 3px;
  }

  .delete-btn:hover {
    background: #c82333;
  }

  /* Mobile Cart Summary */
  .mobile-cart-summary {
    display: block !important;
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

  /* Hide desktop summary on mobile */
  .desktop-summary {
    display: none;
  }

  /* Add bottom padding to cart content to prevent overlap */
  .cart-main {
    padding-bottom: 120px;
  }
}
</style>
