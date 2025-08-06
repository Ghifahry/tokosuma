<template>
  <div class="products-container">
    <!-- Skeleton Loading -->
    <div class="products-grid" v-if="isLoading">
      <ProductSkeleton v-for="n in 8" :key="n" />
    </div>

    <!-- Actual Products -->
    <div class="products-grid" v-else-if="products.length > 0">
      <div v-for="product in products" :key="product.id" class="product-card">
        <router-link :to="`/product/${slugify(product.name)}`" class="product-link">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
            <!-- Promo Badge -->
            <div v-if="product.isPromo" class="promo-badge">
              <span class="promo-text">-{{ product.discount }}%</span>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="price-container">
              <p class="product-price">{{ product.price }}</p>
              <p v-if="product.originalPrice" class="original-price">{{ product.originalPrice }}</p>
            </div>
            <div class="product-meta">
              <div class="rating">
                <i class="fas fa-star"></i>
                <span>{{ product.rating.value }}</span>
                <span class="rating-count">({{ product.rating.count }})</span>
              </div>
              <div class="sold-count">
                <span>Terjual {{ product.soldCount }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <i class="fas fa-search"></i>
      <h3>Tidak ada produk ditemukan</h3>
      <p>Coba ubah filter atau kata kunci pencarian Anda</p>
    </div>
  </div>
</template>

<script>
import ProductSkeleton from "../loading-screen/ProductSkeleton.vue";

export default {
  name: "ProductGrid",
  components: {
    ProductSkeleton,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    },
  },
};
</script>

<style scoped>
.products-container {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.promo-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e85423;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-container {
  margin-bottom: 0.75rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e85423;
  margin: 0 0 0.25rem 0;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  margin: 0;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating i {
  color: #ffc107;
  font-size: 0.8rem;
}

.rating-count {
  color: #999;
}

.sold-count {
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state i {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .product-image {
    height: 150px;
  }

  .product-info {
    padding: 0.75rem;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 1rem;
  }
}
</style>
