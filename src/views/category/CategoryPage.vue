<template>
  <div class="category-page-container">
    <!-- Loading Spinner for Page Transition -->
    <LoadingSpinner :show="isPageLoading" text="Memuat kategori..." />

    <!-- Category Header -->
    <CategoryHeader
      v-if="!isPageLoading"
      :total-products="filteredProducts.length"
      :category-name="categoryName"
      :current-sort-label="currentSortLabel"
      :show-sort-dropdown="showSortDropdown"
      :sort-options="sortOptions"
      :sort-by="sortBy"
      @toggle-sort-dropdown="toggleSortDropdown"
      @select-sort="selectSort"
    />

    <div class="category-content" v-if="!isPageLoading">
      <!-- Filter Button untuk Mobile -->
      <button class="filter-toggle" @click="toggleFilter"><i class="fas fa-filter"></i> Filter</button>

      <!-- Filter Sidebar -->
      <CategoryFilter :show-filter="showFilter" :show-promo-only="showPromoOnly" :min-price="minPrice" :max-price="maxPrice" @toggle-filter="toggleFilter" @apply-filters="applyFilters" @reset-filters="resetFilters" />

      <!-- Products Grid -->
      <ProductGrid :products="sortedProducts" :is-loading="isLoading" />
    </div>
  </div>
  <!-- Tambahkan Footer di sini -->
  <Footer />
</template>

<script>
import products from "@/data/products.js";
import Footer from "@/components/Footer.vue";
import LoadingSpinner from "@/components/loading-screen/LoadingSpinner.vue";
import { CategoryHeader, CategoryFilter, ProductGrid } from "@/components/kategori";

export default {
  name: "CategoryPage",
  components: {
    Footer,
    LoadingSpinner,
    CategoryHeader,
    CategoryFilter,
    ProductGrid,
  },
  data() {
    return {
      categorySlug: "",
      categoryName: "",
      categoryProducts: [],
      minPrice: null,
      maxPrice: null,
      showFilter: false,
      showPromoOnly: false,
      sortBy: "default",
      showSortDropdown: false,
      isPageLoading: false,
      isLoading: false,
      sortOptions: [
        { value: "default", label: "Default" },
        { value: "price-low", label: "Harga Termurah" },
        { value: "price-high", label: "Harga Termahal" },
        { value: "newest", label: "Terbaru" },
        { value: "popular", label: "Terpopuler" },
      ],
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.categoryProducts;

      // Filter by promo
      if (this.showPromoOnly) {
        filtered = filtered.filter((product) => product.isPromo);
      }

      // Filter by price
      if (this.minPrice || this.maxPrice) {
        filtered = filtered.filter((product) => {
          const price = this.extractPrice(product.price);
          const priceMatch = (!this.minPrice || price >= this.minPrice) && (!this.maxPrice || price <= this.maxPrice);
          return priceMatch;
        });
      }

      return filtered;
    },
    sortedProducts() {
      const results = [...this.filteredProducts];

      switch (this.sortBy) {
        case "price-low":
          return results.sort((a, b) => this.extractPrice(a.price) - this.extractPrice(b.price));
        case "price-high":
          return results.sort((a, b) => this.extractPrice(b.price) - this.extractPrice(a.price));
        case "newest":
          return results.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        case "popular":
          return results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        default:
          return results;
      }
    },
    currentSortLabel() {
      const option = this.sortOptions.find((opt) => opt.value === this.sortBy);
      return option ? option.label : "Default";
    },
  },
  created() {
    // Ambil slug kategori dari parameter URL
    this.categorySlug = this.$route.params.slug;
    this.loadCategoryProducts();
  },
  methods: {
    async loadCategoryProducts() {
      this.isPageLoading = true;
      this.isLoading = true;

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      const name = this.categorySlug.toLowerCase();

      // Set nama kategori berdasarkan slug
      const categoryNames = {
        buku: "Buku",
        tas: "Tas",
        gelas: "Gelas & Mug",
        kalender: "Kalender",
        "alat-tulis": "Alat Tulis",
      };

      this.categoryName = categoryNames[name] || this.categorySlug;

      // Filter produk berdasarkan kategori
      this.categoryProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();

        switch (name) {
          case "buku":
            return productName.includes("buku") || productName.includes("novel") || productName.includes("calender");
          case "tas":
            return productName.includes("tas") || productName.includes("bag");
          case "gelas":
            return productName.includes("gelas") || productName.includes("mug") || productName.includes("tumbler");
          case "kalender":
            return productName.includes("kalender") || productName.includes("calender");
          case "alat-tulis":
            return productName.includes("tulis") || productName.includes("campus");
          default:
            return false;
        }
      });

      // Simulate additional loading time for skeleton
      setTimeout(() => {
        this.isLoading = false;
        this.isPageLoading = false;
      }, 500);
    },
    goBack() {
      this.$router.go(-1);
    },
    extractPrice(priceString) {
      return parseInt(priceString.replace(/[^0-9]/g, ""));
    },
    applyFilters() {
      // Method ini dipanggil saat filter berubah
    },
    resetFilters() {
      this.minPrice = null;
      this.maxPrice = null;
      this.showPromoOnly = false;
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },
    selectSort(value) {
      this.sortBy = value;
      this.showSortDropdown = false;
    },
  },
  watch: {
    // Perbarui produk jika slug kategori berubah
    async "$route.params.slug"(newSlug) {
      this.categorySlug = newSlug;
      await this.loadCategoryProducts();
    },
  },
};
</script>

<style scoped>
.category-page-container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 10rem 1rem;
  background-color: #fafafa;
  min-height: 100vh;
}

.category-content {
  display: flex;
  gap: 2rem;
  position: relative;
}

/* Filter Toggle Button untuk Mobile */
.filter-toggle {
  display: none;
  background: white;
  color: #333;
  border: 1px solid #e1e5e9;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: 500;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.filter-toggle:hover {
  border-color: #e85423;
  color: #e85423;
}

.filter-toggle i {
  font-size: 0.875rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .category-page-container {
    padding: 1rem;
  }

  .category-content {
    flex-direction: column;
  }

  .filter-toggle {
    display: flex;
  }
}
</style>
