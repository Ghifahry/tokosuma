<template>
  <div class="cart-products">
    <!-- Select All Card -->
    <div class="select-all-card">
      <div class="select-all-content">
        <label class="checkbox-container">
          <input type="checkbox" :checked="selectAll" @change="handleSelectAll" class="checkbox-input" />
          <span class="checkmark"></span>
          <span class="select-all-text">Pilih Semua</span>
        </label>
        <button class="delete-selected-btn" @click="$emit('delete-selected')" :disabled="!hasSelectedItems">
          <i class="fas fa-trash"></i>
          Hapus
        </button>
      </div>
    </div>

    <!-- Product Cards -->
    <div class="product-cards">
      <div v-for="item in cartItems" :key="`cart-item-${item.id}`" class="product-card">
        <div class="product-select">
          <label class="checkbox-container">
            <input type="checkbox" :checked="item.selected" @change="handleItemSelect(item)" class="checkbox-input" />
            <span class="checkmark"></span>
          </label>
        </div>

        <div class="product-image">
          <img :src="item.image" :alt="item.name" loading="lazy" />
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
          <div class="quantity-controls">
            <button class="delete-btn" @click="$emit('delete-item', item.id)">
              <i class="fas fa-trash"></i>
            </button>
            <button @click="$emit('decrease-quantity', item)" :disabled="item.quantity <= 1">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="$emit('increase-quantity', item)" :disabled="item.quantity >= item.stock">
              <i class="fas fa-plus"></i>
            </button>
          </div>
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
</template>

<script>
export default {
  name: "CartProductList",
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
    hasSelectedItems: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-select-all", "delete-selected", "update-select-all", "delete-item", "decrease-quantity", "increase-quantity"],
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price || 0);
    },
    handleSelectAll(event) {
      this.$emit("toggle-select-all", event.target.checked);
    },
    handleItemSelect(item) {
      this.$emit("update-select-all", item);
    },
  },
};
</script>

<style scoped>
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

/* Responsive Design */
@media (max-width: 768px) {
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
}
</style>
