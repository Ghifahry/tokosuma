<template>
  <div class="mobile-category-page">
    <MobileCategoryHeader @go-back="$router.go(-1)" />

    <div class="content">
      <MobileCategoryFilter v-model:filter="filter" v-model:sort-by="sortBy" @filter-change="handleFilterChange" @sort-change="handleSortChange" />

      <MobileCategoryList :available-categories="availableCategories" @navigate-to="navigateTo" />

      <button class="btn-apply" :disabled="!hasSelection" @click="applyKategori">Terapkan</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import products from "@/data/products.js";
import { MobileCategoryHeader, MobileCategoryFilter, MobileCategoryList } from "@/components/kategori-mobile";

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

const handleFilterChange = (newFilter) => {
  filter.value = newFilter;
};

const handleSortChange = (newSortBy) => {
  sortBy.value = newSortBy;
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

.content {
  padding: 1rem;
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
