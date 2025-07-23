<template>
  <div class="main-content">
    <nav>
      <router-link to="/promo-slider">Promo Slider</router-link> | <router-link to="/special-products">Special Products</router-link> |
      <router-link to="/blog-section">Blog Section</router-link>
    </nav>
    <PromoSlider />
    <OfficialStore />
    <SpecialProducts :products="products" :isMobile="isMobile" />
    <BlogSection :blogs="blogs" :isMobile="isMobile" />
    <BottomBarHome v-if="isMobile" />
  </div>
</template>

<script setup>
import PromoSlider from "@/components/PromoSlider.vue";
import SpecialProducts from "@/components/SpecialProducts.vue";
import BlogSection from "@/components/BlogSection.vue";
import BottomBarHome from "@/components/BottomBarHome.vue";
import OfficialStore from "@/components/OfficialStore.vue";
import { ref, onMounted, onUnmounted } from "vue";

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

const blogs = [
  {
    id: 1,
    title: "Cara Membuat Kerajinan Dari Kertas",
    snippet: "Pelajari teknik dasar membuat kerajinan tangan dari bahan sederhana.",
    image: "https://jakarta.penerbitdeepublish.com/wp-content/uploads/2024/11/Ukuran-Kertas-F4.webp",
  },
  {
    id: 2,
    title: "5 Tips Menulis Buku Pertama",
    snippet: "Langkah-langkah mudah untuk mulai menulis buku pertamamu.",
    image: "https://www.pertuni.or.id/wp-content/uploads/2021/01/books-690219_1920.jpg",
  },
  {
    id: 3,
    title: "Inspirasi Desain Kalender Dinding",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://cdn.britannica.com/29/153629-050-7590A6D1/calendar-datess.jpg",
  },
  {
    id: 4,
    title: "Film Sore Istri Dari Masa Depan Meluap?",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://awsimages.detik.net.id/community/media/visual/2025/07/17/dion-wiyoko-1752764676527_169.jpeg?w=600&q=90",
  },
  {
    id: 5,
    title: "Codingan Emang Seribet Itu?",
    snippet: "Tren desain kalender yang bisa kamu buat sendiri di rumah.",
    image: "https://redaksi.pens.ac.id/wp-content/uploads/2018/12/photo-1529101091764-c3526daf38fe.jpg",
  },
];

const isMobile = ref(false);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<style scoped>
nav {
  max-width: 1110px;
  margin: 1rem auto;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  font-weight: 600;
  font-size: 1rem;
}

router-link {
  color: #e85423;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
