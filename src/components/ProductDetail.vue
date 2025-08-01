<template>
  <div class="product-detail">
    <!-- Loading Skeleton -->
    <ProductDetailSkeleton v-if="isLoading" />

    <!-- Actual Product Content -->
    <div v-else-if="product" class="product-info">
      <div class="product-details-right">
        <img :src="product.image" :alt="product.name" class="hide-on-desktop" />
        <p class="toko-official">Toko Suma Official</p>
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-reviews">
          <span class="review-count">Terjual {{ product.soldCount }}</span>
          <span class="rating"> <i class="fas fa-star yellow-star"></i> {{ product.rating.value }} ({{ product.rating.count }} rating) </span>
        </div>

        <!-- Promo Badge -->
        <div v-if="product.isPromo" class="promo-badge-detail">
          <span class="promo-text-detail">-{{ product.discount }}%</span>
        </div>

        <div class="price-container-detail">
          <p class="product-price">{{ product.price }}</p>
          <p v-if="product.originalPrice" class="original-price-detail">{{ product.originalPrice }}</p>
        </div>
        <div class="product-actions">
          <button class="favorite-button" @click="toggleWishlist">
            <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
            <span>{{ isFavorite ? "Favorited" : "Favorite" }}</span>
          </button>
          <button class="share-button">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
        <h2 class="description-title">Deskripsi</h2>
        <p class="product-description">{{ product.description || "Deskripsi produk belum tersedia." }}</p>

        <h2 class="details-title">Detail Barang</h2>
        <ul class="product-details-list">
          <li v-for="(value, key) in product.details" :key="key">
            <strong>{{ key.replace(/_/g, " ") }}:</strong> {{ value }}
          </li>
        </ul>

        <div class="reviews-card-container">
          <h2 class="reviews-title">Ulasan Pembeli ({{ product.reviews ? product.reviews.length : 0 }})</h2>
          <div v-if="product.reviews && product.reviews.length > 0" class="reviews-list">
            <div v-for="(review, index) in product.reviews.slice(0, 3)" :key="index" class="review-item">
              <div class="review-header">
                <span class="reviewer-name">{{ review.reviewerName }}</span>
                <span class="review-rating"> <i class="fas fa-star yellow-star"></i> {{ review.rating }} </span>
              </div>
              <p class="review-comment">{{ review.comment }}</p>
              <span class="review-date">{{ review.date }}</span>
            </div>
            <button v-if="product.reviews.length > 3" class="see-all-reviews-button">Lihat Semua Ulasan</button>
          </div>
          <div v-else>
            <p>Belum ada ulasan untuk produk ini.</p>
          </div>
        </div>
      </div>

      <div class="product-left-column">
        <img :src="product.image" :alt="product.name" class="hide-on-mobile" />

        <div class="buy-options-card">
          <div class="quantity-control">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
          </div>
          <p class="stock-info">Stok: {{ product.stock }}</p>
          <div class="subtotal-info">
            <span>Subtotal:</span>
            <span class="subtotal-price">{{ formatPrice(subtotal) }}</span>
          </div>
          <button class="add-to-cart-button" @click="addToCart">Tambah ke Keranjang</button>
          <button class="buy-now-button" @click="buyNow">Beli Sekarang</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Produk tidak ditemukan.</p>
    </div>

    <!-- Notification popup -->
    <transition name="fade">
      <div v-if="notificationMessage" class="notification-popup">
        {{ notificationMessage }}
      </div>
    </transition>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { wishlist } from "../data/wishlist";
import Footer from "./Footer.vue";
import ProductDetailSkeleton from "./loading-screen/ProductDetailSkeleton.vue";

const route = useRoute();
const productName = route.params.name;

import products from "../data/products";

const product = ref(null);
const notificationMessage = ref("");
const quantity = ref(1);
const isLoading = ref(true);

const isFavorite = computed(() => {
  if (!product.value) return false;
  return wishlist.value.some((item) => item.id === product.value.id);
});

const subtotal = computed(() => {
  if (!product.value) return 0;
  const price = parseFloat(product.value.price.replace(/[^\d]/g, ""));
  return price * quantity.value;
});

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

function addToCart() {
  console.log(`Added ${quantity.value} of ${product.value.name} to cart.`);
  notificationMessage.value = `${quantity.value} ${product.value.name} ditambahkan ke keranjang!`;
  setTimeout(() => {
    notificationMessage.value = "";
  }, 2000);
}

function buyNow() {
  console.log(`Buying ${quantity.value} of ${product.value.name} now.`);
  notificationMessage.value = `Membeli ${quantity.value} ${product.value.name} sekarang!`;
  setTimeout(() => {
    notificationMessage.value = "";
  }, 2000);
}

function toggleWishlist() {
  if (!product.value) return;
  const index = wishlist.value.findIndex((item) => item.id === product.value.id);
  if (index === -1) {
    // Map product data to wishlist item structure expected by Wishlist.vue
    const wishlistItem = {
      id: product.value.id,
      nama: product.value.name,
      harga: product.value.price,
      tanggal: new Date().toISOString(),
      image: product.value.image,
    };
    wishlist.value.push(wishlistItem);
    notificationMessage.value = "Added to wishlist";
    console.log("Product added to wishlist:", product.value.name);
  } else {
    // Remove from wishlist
    wishlist.value.splice(index, 1);
    notificationMessage.value = "Removed from wishlist";
    console.log("Product removed from wishlist:", product.value.name);
  }
  console.log("Current wishlist:", wishlist.value);

  // Clear notification after 2 seconds
  setTimeout(() => {
    notificationMessage.value = "";
  }, 2000);
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

  // Simulate loading time
  setTimeout(() => {
    product.value = products.find((p) => slugify(p.name) === productName);
    console.log("Found Product:", product.value);
    isLoading.value = false;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, 800);
});
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 10rem auto 2rem auto;
  padding: 1rem;
  background-color: #fff; /* Background putih untuk card */
  border-radius: 15px; /* Sudut membulat */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05); /* Bayangan untuk efek card */
  border: 1px solid #d3d3d3; /* Border tipis */
}

.product-info {
  display: flex;
  gap: 2rem; /* Mengurangi gap agar lebih rapat */
  margin-top: 1rem;
  align-items: flex-start; /* Menyelaraskan item ke bagian atas */
}

.product-left-column {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Jarak antara gambar dan card buy options */
  align-items: center; /* Tengahkan konten di kolom kiri */
}

.hide-on-mobile {
  width: 400px; /* Larger size */
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
  background-color: #f5f5f5; /* Latar belakang netral untuk gambar */
}

.hide-on-desktop {
  display: none;
}

.buy-options-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
  padding: 1.5rem;
  width: 400px; /* Lebar yang sama dengan gambar */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.75rem; /* Menggeser ke bawah */
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.quantity-control button {
  background-color: #e85423;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-control button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.stock-info {
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

.subtotal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.subtotal-price {
  color: #e85423;
}

.add-to-cart-button,
.buy-now-button {
  background-color: #e85423;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover,
.buy-now-button:hover {
  background-color: #d44a1f;
}

.product-details-right {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 1rem;
  flex-grow: 1;
  flex-shrink: 1;
}

.toko-official {
  opacity: 0.6;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.product-name {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 0;
}

/* Promo Badge Detail */
.promo-badge-detail {
  display: inline-block;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
  margin-bottom: 0.5rem;
}

.promo-text-detail {
  font-size: 0.85rem;
  font-weight: 700;
}

/* Price Container Detail */
.price-container-detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0;
}

.product-price {
  font-size: 2rem;
  color: #e85423;
  font-weight: 600;
  margin: 0;
}

.original-price-detail {
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
  margin: 0;
  font-weight: 400;
}

.product-reviews {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-count {
  font-size: 0.9rem;
  color: #555;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}

.yellow-star {
  color: #ffd700; /* Gold color for the star */
  margin-right: 0.3rem;
}

.description-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 10px;
  opacity: 0.8;
}

.product-description {
  font-size: 1rem;
  color: #333;
  margin-top: 0;
  text-align: justify;
}

.details-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.product-details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.product-details-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
  width: 50%; /* Two columns */
  box-sizing: border-box;
}

.reviews-card-container {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #d3d3d3;
  padding: 1.5rem;
  margin-top: 0; /* Sejajarkan dengan teks di atasnya */
}

.reviews-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
}

.reviews-list {
  margin-top: 1rem;
}

.review-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #333;
}

.review-rating {
  display: flex;
  align-items: center;
  color: #e85423;
}

.review-rating .yellow-star {
  margin-right: 0.2rem;
}

.review-comment {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.8rem;
  color: #999;
  text-align: right;
  display: block;
}

.see-all-reviews-button {
  background-color: #e85423;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.see-all-reviews-button:hover {
  background-color: #d44a1f;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.favorite-button,
.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
}

.favorite-button i,
.share-button i {
  font-size: 1.2rem;
}

/* Change heart icon color to #e85423 when favorited (solid heart) */
.favorite-button i.fas.fa-heart {
  color: #e85423;
}

/* Keep heart icon color default (black or inherit) when not favorited (outline heart) */
.favorite-button i.far.fa-heart {
  color: black;
}

@media (max-width: 768px) {
  .product-detail {
    margin: 5rem auto 2rem auto;
    padding: 0.5rem;
  }

  .hide-on-mobile {
    display: none;
  }

  .product-info {
    flex-direction: column; /* Tumpuk gambar dan detail secara vertikal */
    gap: 1rem; /* Kurangi jarak antar elemen */
  }

  .hide-on-desktop {
    display: block;
    width: 100%; /* Gambar mengisi lebar penuh */
    max-width: 300px; /* Batasi ukuran gambar agar tidak terlalu besar di mobile */
    margin: 0 auto; /* Tengahkan gambar */
  }

  .product-details-right {
    text-align: left; /* Align text to the left for mobile */
  }

  .buy-options-card {
    width: 100%; /* Jadikan responsif di mobile */
  }

  .product-left-column {
    width: 100%; /* Pastikan kolom kiri mengambil lebar penuh */
  }

  .product-image {
    max-width: 100%; /* Pastikan gambar tidak melebihi lebar parent */
  }

  .product-info {
    gap: 0.5rem; /* Sesuaikan gap untuk mobile */
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 1.2rem;
  }

  .original-price-detail {
    font-size: 1rem;
  }

  .promo-badge-detail {
    padding: 4px 8px;
    font-size: 0.8rem;
  }

  .promo-text-detail {
    font-size: 0.75rem;
  }
}

.notification-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e85423;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(232, 84, 35, 0.4);
  font-weight: 600;
  z-index: 1000;
  user-select: none;
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
