<template>
  <div class="product-detail">
    <button @click="$router.back()" class="back-button">Back</button>
    <div v-if="product" class="product-info">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-details-right">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-description">{{ product.description || "Deskripsi produk belum tersedia." }}</p>
      </div>
    </div>
    <div v-else>
      <p>Produk tidak ditemukan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = Number(route.params.id);

const products = [
  { id: 1, name: "Buku Premium Tahan Air Dan Api", price: "Rp 25.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/24042025082812-50660.png" },
  { id: 2, name: "Calender Bisa Di Taruh Di Dinding", price: "Rp 30.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/23082023145505-90668.jpg" },
  { id: 3, name: "Gelas Gambar K‑pop Bisa Di Custom", price: "Rp 40.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/09092021084017-31752.jpeg" },
  { id: 4, name: "New Normal", price: "Rp 50.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/02092021160002-80908.jpeg" },
  { id: 5, name: "Buku Tulis Campus", price: "Rp 15.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/29062022094902-28336.jpeg" },
  { id: 6, name: "Seni Mengolah Emosi", price: "Rp 75.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/items/9786230300271_KETIKA_SARAH_MARAH.jpg" },
  { id: 7, name: "Seprosi Mie Ayam Sebelum Mati", price: "Rp 120.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/products/95ob5m98ur.jpg" },
  { id: 8, name: "Sisi Tergelap Surga", price: "Rp 200.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/10/30/debsfyx6tcwnvbwdteeakv.jpg" },
];

const product = ref(null);

onMounted(() => {
  product.value = products.find((p) => p.id === productId);
});
</script>

<style scoped>
.product-detail {
  max-width: 900px; /* Increased max-width to allow more left shift */
  margin: 2rem 0 2rem 5%; /* Shifted left by setting left margin to 5% and right margin to 0 */
  padding: 1rem;
}

.back-button {
  background-color: #e85423;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.product-info {
  display: flex;
  gap: 6rem;
  margin-top: 1rem;
}

.product-image {
  width: 400px; /* Larger size */
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.product-details-right {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.product-name {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  color: #e85423;
  font-weight: 600;
  margin-bottom: 1rem;
}

.product-description {
  font-size: 1rem;
  color: #333;
  margin-top: 1rem;
}
</style>
