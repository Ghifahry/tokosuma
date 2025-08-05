<template>
  <div class="mobile-category-page">
    <div class="header">
      <button @click="$router.go(-1)" class="back-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1>Kategori</h1>
    </div>

    <div class="content">
      <aside class="filter-sort">
        <h4>Filter</h4>
        <label><input type="checkbox" v-model="filter.terbaru" /> Terbaru</label>
        <label><input type="checkbox" v-model="filter.diskon" /> Diskon</label>

        <h4 class="mt-3">Sort</h4>
        <select v-model="sortBy">
          <option value="termurah">Termurah</option>
          <option value="termahal">Termahal</option>
          <option value="terlaris">Terlaris</option>
        </select>
      </aside>

      <ul class="kategori-list">
        <li v-for="category in availableCategories" :key="category.slug">
          <button @click="navigateTo(`/kategori/${category.slug}`)">
            {{ category.name }}
          </button>
        </li>
        <li><button @click="navigateTo('/kategori/totebag')">Tote Bag</button></li>
        <li><button @click="navigateTo('/kategori/mug')">Mug & Tumbler</button></li>
        <li><button @click="navigateTo('/kategori/sticker')">Sticker</button></li>
        <li><button @click="navigateTo('/kategori/phonecase')">Phone Case</button></li>
        <li><button @click="navigateTo('/kategori/notebook')">Notebook</button></li>
        <li><button @click="navigateTo('/kategori/plakat')">Plakat & Award</button></li>
        <li><button @click="navigateTo('/kategori/merch')">Merch Corporate</button></li>
        <li><button @click="navigateTo('/kategori/others')">Lain‑lain…</button></li>
      </ul>

      <button class="btn-apply" :disabled="!hasSelection" @click="applyKategori">Terapkan</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import products from "@/data/products.js";

const router = useRouter();

const filter = ref({ terbaru: false, diskon: false });
const sortBy = ref("termurah");

const hasSelection = computed(() => {
  return filter.value.terbaru || filter.value.diskon || sortBy.value !== "termurah";
});

const availableCategories = computed(() => {
  const categories = [];
  const categoryMap = new Map();

  products.forEach((product) => {
    const name = product.name.toLowerCase();

    if (name.includes("buku") || name.includes("novel") || name.includes("calender")) {
      if (!categoryMap.has("buku")) {
        categoryMap.set("buku", { name: "Buku", slug: "buku", count: 0 });
      }
      categoryMap.get("buku").count++;
    }

    if (name.includes("tas") || name.includes("bag")) {
      if (!categoryMap.has("tas")) {
        categoryMap.set("tas", { name: "Tas", slug: "tas", count: 0 });
      }
      categoryMap.get("tas").count++;
    }

    if (name.includes("gelas") || name.includes("mug") || name.includes("tumbler")) {
      if (!categoryMap.has("gelas")) {
        categoryMap.set("gelas", { name: "Gelas & Mug", slug: "gelas", count: 0 });
      }
      categoryMap.get("gelas").count++;
    }

    if (name.includes("kalender") || name.includes("calender")) {
      if (!categoryMap.has("kalender")) {
        categoryMap.set("kalender", { name: "Kalender", slug: "kalender", count: 0 });
      }
      categoryMap.get("kalender").count++;
    }

    if (name.includes("tulis") || name.includes("campus")) {
      if (!categoryMap.has("alat-tulis")) {
        categoryMap.set("alat-tulis", { name: "Alat Tulis", slug: "alat-tulis", count: 0 });
      }
      categoryMap.get("alat-tulis").count++;
    }
  });

  return Array.from(categoryMap.values())
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);
});

const navigateTo = (path) => {
  router.push(path);
};

const applyKategori = () => {
  console.log("Kategori applied:", { filter: filter.value, sortBy: sortBy.value });
  // Implement actual filtering/sorting logic or emit event to parent/store
  router.push({
    path: "/search",
    query: {
      filter: JSON.stringify(filter.value),
      sortBy: sortBy.value,
      // You might want to pass selected categories here too
    },
  });
};
</script>

<style scoped>
.mobile-category-page {
  padding-top: 60px; /* Adjust based on your fixed header height */
  padding-bottom: 80px; /* Adjust based on your fixed bottom bar height */
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 1rem;
  z-index: 1000;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-right: 1rem;
}

.header h1 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.content {
  padding: 1rem;
}

.filter-sort {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-sort h4 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: #333;
}

.filter-sort label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.filter-sort input[type="checkbox"] {
  margin-right: 0.5rem;
}

.filter-sort select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.kategori-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.kategori-list li button {
  width: 100%;
  text-align: left;
  padding: 1rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.kategori-list li:last-child button {
  border-bottom: none;
}

.kategori-list li button:hover {
  background-color: #f5f5f5;
}

.btn-apply {
  width: calc(100% - 2rem);
  position: fixed;
  bottom: 80px; /* Above the bottom navigation bar */
  left: 1rem;
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(232, 84, 35, 0.3);
  z-index: 999;
}

.btn-apply:disabled {
  background: #cccccc;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-apply:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(232, 84, 35, 0.4);
}
</style>
