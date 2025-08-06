<template>
  <div class="product-details-card">
    <div class="card-header">
      <h3 class="card-title">Detail Produk</h3>
    </div>

    <div class="product-list">
      <div v-if="selectedItems.length === 0" class="empty-products">
        <p>Tidak ada produk yang dipilih untuk checkout</p>
        <router-link to="/cart" class="back-to-cart-btn">Kembali ke Keranjang</router-link>
      </div>
      <div v-else v-for="item in selectedItems" :key="item.id" class="product-item">
        <div class="product-image">
          <img :src="item.image || '/placeholder-image.jpg'" :alt="item.name" @error="$event.target.src = '/placeholder-image.jpg'" />
        </div>
        <div class="product-info">
          <h4 class="product-name">{{ item.name || "Nama Produk" }}</h4>
          <p class="product-variant" v-if="item.variant">{{ item.variant }}</p>
          <div class="product-price">
            <span class="current-price">Rp{{ formatPrice(item.price) }}</span>
            <span v-if="item.originalPrice" class="original-price">Rp{{ formatPrice(item.originalPrice) }}</span>
          </div>
          <div class="product-quantity">
            <span>Jumlah: {{ item.quantity || 0 }}</span>
          </div>
        </div>
        <div class="product-total">
          <span class="total-price">Rp{{ formatPrice((item.price || 0) * (item.quantity || 0)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailsSection",
  props: {
    selectedItems: {
      type: Array,
      default: () => [],
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
.product-details-card {
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

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.product-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-name {
  font-size: 1rem;
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

.product-quantity {
  font-size: 0.9rem;
  color: #666;
}

.product-total {
  display: flex;
  align-items: center;
}

.total-price {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.empty-products {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.back-to-cart-btn {
  display: inline-block;
  background: #e85423;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.back-to-cart-btn:hover {
  background: #d44a1f;
}

@media (max-width: 768px) {
  .product-item {
    flex-direction: column;
    text-align: center;
  }

  .product-image img {
    width: 100px;
    height: 100px;
  }
}
</style>
