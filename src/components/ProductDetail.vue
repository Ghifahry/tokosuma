<template>
  <div class="product-detail">
    <!-- Loading Skeleton -->
    <ProductDetailSkeleton v-if="isLoading" />

    <!-- Actual Product Content -->
    <div v-else-if="product" class="product-info">
      <!-- Product Gallery Section -->
      <div class="product-gallery">
        <div class="main-image-container">
          <img :src="selectedImage" :alt="product.name" class="main-image" />
          <div class="image-overlay">
            <button class="zoom-btn" @click="openImageModal">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <div class="thumbnail-gallery" v-if="productImages.length > 1">
          <div v-for="(image, index) in productImages" :key="index" class="thumbnail-item" :class="{ active: selectedImageIndex === index }" @click="selectImage(index)">
            <img :src="image" :alt="`${product.name} - ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- Product Information Section -->
      <div class="product-details-right">
        <!-- Official Store Badge -->
        <div class="store-badge">
          <i class="fas fa-store"></i>
          <span>Toko Suma Official</span>
          <i class="fas fa-check-circle verified-badge"></i>
        </div>

        <!-- Product Title -->
        <h1 class="product-name">{{ product.name }}</h1>

        <!-- Product Stats -->
        <div class="product-stats">
          <div class="stat-item">
            <i class="fas fa-star"></i>
            <span>{{ product.rating.value }} ({{ product.rating.count }} ulasan)</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-shopping-cart"></i>
            <span>Terjual {{ product.soldCount }}</span>
          </div>
        </div>

        <!-- Promo Badge -->
        <div v-if="product.isPromo" class="promo-badge">
          <i class="fas fa-fire"></i>
          <span>Diskon {{ product.discount }}%</span>
        </div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="current-price">
            <span class="price-value">{{ product.price }}</span>
          </div>
          <div v-if="product.originalPrice" class="original-price">
            <span class="price-label">Harga Normal:</span>
            <span class="price-value-crossed">{{ product.originalPrice }}</span>
          </div>
        </div>

        <!-- Product Actions -->
        <div class="product-actions">
          <button class="action-btn favorite-btn" @click="toggleWishlist" :class="{ active: isFavorite }">
            <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
            <span>{{ isFavorite ? "Favorited" : "Favorite" }}</span>
          </button>
          <div class="action-separator"></div>
          <button class="action-btn share-btn" @click="shareProduct">
            <i class="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
        </div>

        <!-- Product Variants (if any) -->
        <div v-if="product.variants" class="product-variants">
          <h3>Pilihan Varian</h3>
          <div class="variant-options">
            <button v-for="variant in product.variants" :key="variant.id" class="variant-btn" :class="{ active: selectedVariant?.id === variant.id }" @click="selectVariant(variant)">
              {{ variant.name }}
            </button>
          </div>
        </div>

        <!-- Quantity and Stock -->
        <div class="quantity-section">
          <div class="quantity-control">
            <label>Jumlah:</label>
            <div class="quantity-input">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" v-model="quantity" min="1" :max="product.stock" />
              <button @click="increaseQuantity" :disabled="quantity >= product.stock">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Delivery Info -->
        <div class="delivery-info">
          <div class="delivery-item">
            <i class="fas fa-truck"></i>
            <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
          </div>
          <div class="delivery-item">
            <i class="fas fa-shield-alt"></i>
            <span>Garansi 100% uang kembali</span>
          </div>
          <div class="delivery-item">
            <i class="fas fa-clock"></i>
            <span>Pengiriman 1-3 hari kerja</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div v-if="product" class="product-tabs">
      <div class="tab-navigation">
        <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <div class="tab-content">
        <!-- Description Tab -->
        <div v-if="activeTab === 'description'" class="tab-pane">
          <div class="description-content">
            <h3>Deskripsi Produk</h3>
            <p>{{ product.description || "Deskripsi produk belum tersedia." }}</p>

            <!-- Product Features -->
            <div v-if="product.features" class="product-features">
              <h4>Fitur Utama:</h4>
              <ul>
                <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Specifications Tab -->
        <div v-if="activeTab === 'specifications'" class="tab-pane">
          <div class="specifications-content">
            <h3>Spesifikasi Produk</h3>
            <div class="specs-grid">
              <div v-for="(value, key) in product.details" :key="key" class="spec-item">
                <span class="spec-label">{{ formatSpecLabel(key) }}:</span>
                <span class="spec-value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-if="activeTab === 'reviews'" class="tab-pane">
          <div class="reviews-content">
            <div class="reviews-header">
              <h3>Ulasan Pembeli ({{ product.reviews ? product.reviews.length : 0 }})</h3>
              <div class="rating-summary">
                <div class="average-rating">
                  <span class="rating-number">{{ product.rating.value }}</span>
                  <div class="rating-stars">
                    <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ filled: n <= Math.round(product.rating.value) }"></i>
                  </div>
                </div>
                <span class="total-reviews">{{ product.rating.count }} ulasan</span>
              </div>
            </div>

            <div v-if="product.reviews && product.reviews.length > 0" class="reviews-list">
              <div v-for="(review, index) in product.reviews" :key="index" class="review-item">
                <div class="review-header">
                  <div class="reviewer-info">
                    <span class="reviewer-name">{{ review.reviewerName }}</span>
                    <div class="review-rating">
                      <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ filled: n <= review.rating }"></i>
                    </div>
                  </div>
                  <span class="review-date">{{ formatDate(review.date) }}</span>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
              </div>
            </div>
            <div v-else class="no-reviews">
              <i class="fas fa-comment-slash"></i>
              <p>Belum ada ulasan untuk produk ini.</p>
            </div>
          </div>
        </div>

        <!-- Related Products Tab -->
        <div v-if="activeTab === 'related'" class="tab-pane">
          <div class="related-products">
            <h3>Produk Terkait</h3>
            <div class="related-grid">
              <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="related-item">
                <img :src="relatedProduct.image" :alt="relatedProduct.name" />
                <h4>{{ relatedProduct.name }}</h4>
                <p class="related-price">{{ relatedProduct.price }}</p>
                <button class="view-product-btn" @click="viewProduct(relatedProduct)">Lihat Produk</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="closeImageModal">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selectedImage" :alt="product.name" />
      </div>
    </div>

    <!-- Fixed Bottom Purchase Container -->
    <div v-if="product" class="fixed-purchase-container">
      <div class="purchase-content">
        <div class="product-summary">
          <img :src="selectedImage" :alt="product.name" class="summary-image" />
          <div class="summary-info">
            <h4>{{ product.name }}</h4>
            <p class="summary-price">{{ calculateTotalPrice() }}</p>
          </div>
        </div>
        <div class="purchase-actions">
          <button class="btn-primary add-to-cart-btn" @click="addToCart">
            <i class="fas fa-shopping-cart"></i>
            <span>Keranjang{{ quantity > 1 ? ` (${quantity})` : "" }}</span>
          </button>
          <button class="btn-secondary buy-now-btn" @click="buyNow">
            <i class="fas fa-bolt"></i>
            <span>Beli Langsung{{ quantity > 1 ? ` (${quantity})` : "" }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notification popup -->
    <transition name="fade">
      <div v-if="notificationMessage" class="notification-popup" :class="notificationType">
        <i :class="notificationIcon"></i>
        <span>{{ notificationMessage }}</span>
      </div>
    </transition>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { wishlist } from "../data/wishlist";
import Footer from "./Footer.vue";
import ProductDetailSkeleton from "./loading-screen/ProductDetailSkeleton.vue";

const route = useRoute();
const router = useRouter();
const productName = route.params.name;

import products from "../data/products";

const product = ref(null);
const notificationMessage = ref("");
const notificationType = ref("success");
const quantity = ref(1);
const isLoading = ref(true);
const selectedImageIndex = ref(0);
const showImageModal = ref(false);
const activeTab = ref("description");
const selectedVariant = ref(null);

// Tab configuration
const tabs = [
  { id: "description", label: "Deskripsi", icon: "fas fa-info-circle" },
  { id: "specifications", label: "Spesifikasi", icon: "fas fa-cogs" },
  { id: "reviews", label: "Ulasan", icon: "fas fa-star" },
  { id: "related", label: "Produk Terkait", icon: "fas fa-th-large" },
];

const isFavorite = computed(() => {
  if (!product.value) return false;
  return wishlist.value.some((item) => item.id === product.value.id);
});

const productImages = computed(() => {
  if (!product.value) return [];
  // If product has multiple images, use them; otherwise use the main image
  return product.value.images || [product.value.image];
});

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || product.value?.image;
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return products.filter((p) => p.category === product.value.category && p.id !== product.value.id).slice(0, 4);
});

function selectImage(index) {
  selectedImageIndex.value = index;
}

function openImageModal() {
  showImageModal.value = true;
}

function closeImageModal() {
  showImageModal.value = false;
}

function selectVariant(variant) {
  selectedVariant.value = variant;
  showNotification(`Varian ${variant.name} dipilih`, "info");
}

function increaseQuantity() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
}

function calculateTotalPrice() {
  if (!product.value) return "";
  const price = parseFloat(product.value.price.replace(/[^\d]/g, ""));
  const total = price * quantity.value;
  return formatPrice(total);
}

function getStockClass() {
  if (!product.value) return "";
  if (product.value.stock <= 5) return "low-stock";
  if (product.value.stock <= 15) return "medium-stock";
  return "high-stock";
}

function formatSpecLabel(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showNotification(message, type = "success") {
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    notificationMessage.value = "";
  }, 3000);
}

function addToCart() {
  const cartItem = {
    id: Date.now(), // Generate unique ID
    name: product.value.name,
    variant: selectedVariant.value ? selectedVariant.value.name : null,
    price: parseFloat(product.value.price.replace(/[^\d]/g, "")),
    originalPrice: product.value.originalPrice ? parseFloat(product.value.originalPrice.replace(/[^\d]/g, "")) : null,
    quantity: quantity.value,
    stock: product.value.stock,
    image: selectedImage.value,
    store: product.value.store || "TokoSuma Official Store",
    selected: false,
  };

  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.name === cartItem.name && item.variant === cartItem.variant);

  if (existingItemIndex > -1) {
    // Update quantity if product already exists
    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    // Add new item to cart
    cart.push(cartItem);
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(`Added ${quantity.value} of ${product.value.name} to cart.`);
  showNotification(`${quantity.value} ${product.value.name} ditambahkan ke keranjang!`, "success");
}

function buyNow() {
  console.log(`Buying ${quantity.value} of ${product.value.name} now.`);
  showNotification(`Membeli ${quantity.value} ${product.value.name} sekarang!`, "success");
}

function toggleWishlist() {
  if (!product.value) return;
  const index = wishlist.value.findIndex((item) => item.id === product.value.id);
  if (index === -1) {
    const wishlistItem = {
      id: product.value.id,
      nama: product.value.name,
      harga: product.value.price,
      tanggal: new Date().toISOString(),
      image: product.value.image,
    };
    wishlist.value.push(wishlistItem);
    showNotification("Produk ditambahkan ke favorit", "success");
  } else {
    wishlist.value.splice(index, 1);
    showNotification("Produk dihapus dari favorit", "info");
  }
}

function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: product.value.name,
      text: `Lihat produk ${product.value.name} di Toko Suma!`,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    showNotification("Link produk disalin ke clipboard", "info");
  }
}

function viewProduct(relatedProduct) {
  const slug = slugify(relatedProduct.name);
  router.push(`/product/${slug}`);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

onMounted(() => {
  console.log("Product Name from Route:", productName);

  setTimeout(() => {
    product.value = products.find((p) => slugify(p.name) === productName);
    console.log("Found Product:", product.value);
    isLoading.value = false;
    window.scrollTo(0, 0);
  }, 800);
});
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 8rem auto 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
}

.product-info {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Product Gallery */
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
}

.main-image {
  width: 100%;
  height: 350px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}

.zoom-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.zoom-btn:hover {
  background: white;
  transform: scale(1.1);
}

.thumbnail-gallery {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-item.active {
  border-color: #e85423;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details Right */
.product-details-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.store-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
}

.verified-badge {
  color: #28a745;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
}

.product-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.stat-item i {
  color: #000000;
  opacity: 0.5;
}

.promo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  padding: 0.5rem 1.2rem;
  margin: -15px auto -20px -1px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.current-price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price-label {
  font-size: 1rem;
  color: #666;
}

.price-value {
  font-size: 2rem;
  color: #000000;
  font-weight: 700;
}

.original-price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price-value-crossed {
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
}

.savings {
  color: #28a745;
  font-weight: 600;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.8rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #666;
}

.action-btn:hover {
  color: #e85423;
  background: rgba(232, 84, 35, 0.1);
}

.action-btn.active {
  color: #e85423;
  background: rgba(232, 84, 35, 0.1);
}

.action-separator {
  width: 1px;
  height: 20px;
  background: #ddd;
  margin: 0 0.5rem;
}

.product-variants {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-variants h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.variant-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.variant-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.variant-btn.active {
  background: #e85423;
  color: white;
  border-color: #e85423;
}

.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-input {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.quantity-input button {
  background: #f8f9fa;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.quantity-input button:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input input {
  border: none;
  padding: 0.75rem;
  text-align: center;
  width: 40px;
  font-size: 1rem;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-label {
  color: #666;
}

.stock-value.high-stock {
  color: #28a745;
}

.stock-value.medium-stock {
  color: #ffc107;
}

.stock-value.low-stock {
  color: #dc3545;
}

.purchase-buttons {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e85423;
  color: rgb(255, 255, 255);
}

.btn-primary:hover {
  background: #f3b8a5;
}

.btn-secondary {
  background: #ffffff;
  color: rgb(0, 0, 0);
}

.btn-secondary:hover {
  background: #ffffff;
  transform: translateY(-1px);
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.delivery-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;
}

.delivery-item i {
  color: #e85423;
  width: 16px;
}

/* Product Tabs */
.product-tabs {
  margin-top: 2rem;
}

.tab-navigation {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #e85423;
  border-bottom-color: #e85423;
}

.tab-btn:hover {
  color: #e85423;
}

.tab-content {
  min-height: 400px;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Description Tab */
.description-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.description-content p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
}

.product-features h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.product-features ul {
  list-style: none;
  padding: 0;
}

.product-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #666;
}

.product-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

/* Specifications Tab */
.specifications-content h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.spec-label {
  font-weight: 600;
  color: #2c3e50;
}

.spec-value {
  color: #666;
}

/* Reviews Tab */
.reviews-content h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-number {
  font-size: 2rem;
  font-weight: 700;
  color: #e85423;
}

.rating-stars {
  display: flex;
  gap: 0.2rem;
}

.rating-stars i {
  color: #ddd;
  font-size: 1.2rem;
}

.rating-stars i.filled {
  color: #ffd700;
}

.total-reviews {
  color: #666;
  font-size: 0.9rem;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 12px;
  background: white;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #2c3e50;
}

.review-rating {
  display: flex;
  gap: 0.2rem;
}

.review-rating i {
  color: #ddd;
  font-size: 0.9rem;
}

.review-rating i.filled {
  color: #ffd700;
}

.review-date {
  color: #999;
  font-size: 0.8rem;
}

.review-comment {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.no-reviews {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.no-reviews i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Related Products Tab */
.related-products h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.related-item {
  text-align: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.related-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.related-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.related-item h4 {
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.related-price {
  color: #e85423;
  font-weight: 600;
  margin-bottom: 1rem;
}

.view-product-btn {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-product-btn:hover {
  background: #d44a1f;
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.close-modal {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Notification */
.notification-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  z-index: 1000;
  user-select: none;
  max-width: 300px;
}

.notification-popup.success {
  background: #28a745;
  color: white;
}

.notification-popup.info {
  background: #17a2b8;
  color: white;
}

.notification-popup.error {
  background: #dc3545;
  color: white;
}

/* Fixed Bottom Purchase Container */
.fixed-purchase-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: white;
  border: 1px solid #e1e5e9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 1rem;
  border-radius: 10px;
}

.purchase-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.product-summary {
  display: flex;
  align-items: start;
  gap: 1rem;
  flex: 1;
}

.summary-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.summary-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.summary-info h4 {
  font-size: 0.9rem;
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  text-align: left;
}

.summary-price {
  font-size: 1rem;
  color: #e85423;
  font-weight: 700;
  margin: 0;
  text-align: left;
}

.quantity-display {
  margin-top: 0.25rem;
}

.quantity-display span {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  background: #f8f9fa;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.purchase-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
}

.purchase-actions .btn-primary,
.purchase-actions .btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  font-weight: 600;
  min-width: 120px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-detail {
    margin: 5rem auto 2rem auto;
    padding: 0.5rem;
  }

  .product-info {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .main-image {
    height: 300px;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .price-value {
    font-size: 1.5rem;
  }

  .product-stats {
    gap: 1rem;
  }

  .product-actions {
    flex-direction: row;
    justify-content: center;
  }

  .action-btn {
    justify-content: center;
  }

  .tab-navigation {
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .reviews-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .related-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .fixed-purchase-container {
    padding: 0.75rem;
    bottom: 75px;
    left: 15px;
    right: 15px;
    border-radius: 10px;
  }

  .purchase-content {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .product-summary {
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  .summary-info {
    align-items: flex-start;
    text-align: left;
  }

  .summary-info h4 {
    text-align: left;
  }

  .summary-price {
    text-align: left;
  }

  .purchase-actions {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }

  .purchase-actions .btn-primary,
  .purchase-actions .btn-secondary {
    flex: 1;
    min-width: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
