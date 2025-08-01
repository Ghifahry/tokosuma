<template>
  <div class="search-results-container">
    <!-- Loading Skeleton -->
    <SearchResultsSkeleton v-if="isLoading" />

    <!-- Actual Search Results -->
    <div v-else>
      <!-- Modern Header Section -->
      <div class="search-header">
        <div class="results-summary">
          <div class="total-products">
            <span class="total-count">{{ filteredResults.length }}</span>
            <span class="total-label">Produk</span>
          </div>
        </div>

        <!-- Sorting Options -->
        <div class="sorting-section">
          <label class="sort-label">Urutkan:</label>
          <div class="sort-dropdown">
            <button @click="toggleSortDropdown" class="sort-button">
              {{ currentSortLabel }}
              <i class="fas fa-chevron-down" :class="{ rotate: showSortDropdown }"></i>
            </button>
            <div class="sort-options" v-if="showSortDropdown">
              <div v-for="option in sortOptions" :key="option.value" @click="selectSort(option.value)" class="sort-option" :class="{ active: sortBy === option.value }">
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="search-query-wrapper">
        <p class="search-query-text">hasil pencarian untuk</p>
        <h1 class="search-query">"{{ searchQuery }}"</h1>
      </div>

      <div class="search-content">
        <!-- Filter Button untuk Mobile -->
        <button class="filter-toggle" @click="toggleFilter"><i class="fas fa-filter"></i> Filter</button>

        <!-- Filter Sidebar -->
        <div class="filter-sidebar" :class="{ 'filter-active': showFilter }">
          <div class="filter-header">
            <h3>Filter</h3>
            <button class="close-filter" @click="toggleFilter">×</button>
          </div>

          <div class="filter-section">
            <h3>Promo</h3>
            <div class="promo-filter">
              <label class="checkbox-label">
                <input type="checkbox" v-model="showPromoOnly" @change="applyFilters" />
                <span class="checkmark"></span>
                Tampilkan produk promo saja
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3>Kategori</h3>
            <div class="filter-options">
              <label v-for="category in categories" :key="category" class="filter-option">
                <input type="checkbox" v-model="selectedCategories" :value="category" @change="applyFilters" />
                {{ category }}
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3>Harga</h3>
            <div class="price-range">
              <div class="price-inputs">
                <div class="price-input">
                  <label>Min</label>
                  <input type="number" v-model.number="minPrice" @change="applyFilters" placeholder="0" />
                </div>
                <div class="price-input">
                  <label>Max</label>
                  <input type="number" v-model.number="maxPrice" @change="applyFilters" placeholder="1000000" />
                </div>
              </div>
              <button class="apply-price" @click="applyFilters">Terapkan</button>
            </div>
          </div>

          <button class="reset-filter" @click="resetFilters">Reset Filter</button>
        </div>

        <!-- Products Grid -->
        <div class="products-container">
          <div class="products-grid" v-if="sortedResults.length > 0">
            <div v-for="product in sortedResults" :key="product.id" class="product-card">
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
                </div>
              </router-link>
            </div>
          </div>

          <div class="no-results" v-else>
            <div class="no-results-content">
              <i class="fas fa-search"></i>
              <h3>Tidak ditemukan hasil</h3>
              <p>Coba gunakan kata kunci lain atau periksa ejaan Anda</p>
              <button @click="goBack" class="back-button"><i class="fas fa-arrow-left"></i> Kembali</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Tambahkan Footer di sini -->
  <Footer />
</template>

<script>
import products from "@/data/products.js";
import Footer from "@/components/Footer.vue";
import SearchResultsSkeleton from "@/components/loading-screen/SearchResultsSkeleton.vue";

export default {
  name: "SearchResults",
  components: {
    Footer,
    SearchResultsSkeleton,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      selectedCategories: [],
      minPrice: null,
      maxPrice: null,
      showPromoOnly: false,
      categories: ["Buku", "Alat Tulis", "Aksesoris", "Tas", "Kalender", "Gelas"],
      showFilter: false,
      sortBy: "default",
      showSortDropdown: false,
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
    filteredResults() {
      let filtered = this.searchResults;

      // Filter by promo
      if (this.showPromoOnly) {
        filtered = filtered.filter((product) => product.isPromo);
      }

      // Filter by category
      if (this.selectedCategories.length) {
        filtered = filtered.filter((product) => this.getCategoryFromProduct(product));
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
    sortedResults() {
      const results = [...this.filteredResults];

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
    // Ambil query pencarian dari parameter URL
    this.searchQuery = this.$route.query.q || "";
    this.isLoading = true;

    // Simulate loading time
    setTimeout(() => {
      // Jika ada hasil pencarian di localStorage, gunakan itu
      const savedResults = localStorage.getItem("searchResults");
      if (savedResults) {
        this.searchResults = JSON.parse(savedResults);
      } else if (this.searchQuery) {
        // Jika tidak ada hasil tersimpan tapi ada query, lakukan pencarian
        this.performSearch();
      }
      this.isLoading = false;
    }, 800);
  },
  methods: {
    performSearch() {
      const query = this.searchQuery.toLowerCase();
      this.searchResults = products.filter((product) => {
        return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getCategoryFromProduct(product) {
      const name = product.name.toLowerCase();

      // Cek kategori berdasarkan nama produk
      if (this.selectedCategories.includes("Buku") && (name.includes("buku") || name.includes("novel"))) {
        return true;
      }
      if (this.selectedCategories.includes("Alat Tulis") && (name.includes("tulis") || name.includes("pensil") || name.includes("pulpen"))) {
        return true;
      }
      if (this.selectedCategories.includes("Aksesoris") && name.includes("aksesoris")) {
        return true;
      }
      if (this.selectedCategories.includes("Tas") && name.includes("tas")) {
        return true;
      }
      if (this.selectedCategories.includes("Kalender") && (name.includes("calender") || name.includes("kalender"))) {
        return true;
      }
      if (this.selectedCategories.includes("Gelas") && name.includes("gelas")) {
        return true;
      }

      return false;
    },
    extractPrice(priceString) {
      // Mengekstrak angka dari format harga (misalnya "Rp25.000" menjadi 25000)
      return parseInt(priceString.replace(/[^0-9]/g, ""));
    },
    applyFilters() {
      // Method ini dipanggil saat filter berubah
      // Tidak perlu melakukan apa-apa karena kita menggunakan computed property
    },
    resetFilters() {
      this.selectedCategories = [];
      this.minPrice = null;
      this.maxPrice = null;
      this.showPromoOnly = false;
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applySorting() {
      // Method ini dipanggil saat sorting berubah
      // Tidak perlu melakukan apa-apa karena kita menggunakan computed property
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },
    selectSort(value) {
      this.sortBy = value;
      this.showSortDropdown = false;
    },
    getSortLabel(value) {
      console.log("getSortLabel called with:", value);
      const option = this.sortOptions.find((opt) => opt.value === value);
      console.log("found option:", option);
      return option ? option.label : "Default";
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Ganti spasi dengan -
        .replace(/[^\w-]+/g, "") // Hapus karakter yang tidak valid
        .replace(/--+/g, "-") // Ganti beberapa - dengan satu -
        .replace(/^-+/, "") // Pangkas - dari awal teks
        .replace(/-+$/, ""); // Pangkas - dari akhir teks
    },
  },
  watch: {
    // Perbarui hasil pencarian jika query berubah (misalnya jika user mengubah URL)
    "$route.query.q"(newQuery) {
      this.isLoading = true;
      this.searchQuery = newQuery || "";

      setTimeout(() => {
        this.performSearch();
        this.isLoading = false;
      }, 600);
    },
  },
};
</script>

<style scoped>
.search-results-container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 10rem 1rem;
  background-color: #fafafa;
  min-height: 100vh;
}

/* Modern Header Section */
.search-header {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.results-summary {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.total-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e85423;
  padding: 0.5rem;
  min-width: 40px;
}
.total-count {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}
.total-label {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
}

.search-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.search-query-text {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.search-query {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* Sorting Section */
.sorting-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.8rem;
  color: #888;
  font-weight: 400;
}

.sort-select {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 25px;
  background: #f8f9fa;
  font-size: 0.8rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.sort-select:hover {
  background: #e9ecef;
}

.sort-select:focus {
  outline: none;
  background: hsl(0, 0%, 100%);
  color: rgb(0, 0, 0);
}

/* Custom Dropdown Styling */
.sort-dropdown {
  position: relative;
}

.sort-button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 25px;
  background: #f8f9fa;
  font-size: 0.8rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.sort-button:hover {
  background: #e9ecef;
}

.sort-button i {
  transition: transform 0.2s ease;
}

.sort-button i.rotate {
  transform: rotate(180deg);
}

.sort-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  z-index: 100;
  overflow: hidden;
}

.sort-option {
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.8rem;
  color: #555;
}

.sort-option:hover {
  background: #f8f9fa;
}

.sort-option.active {
  background: #333;
  color: white;
}

.search-content {
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

.filter-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.filter-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e1e5e9;
  padding-bottom: 1rem;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.close-filter {
  background: #f8f9fa;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-filter:hover {
  background: #e85423;
  color: white;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #333;
  font-weight: 600;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0;
}

.filter-option input[type="checkbox"] {
  accent-color: #e85423;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-inputs {
  display: flex;
  gap: 0.75rem;
}

.price-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.price-input label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
}

.price-input input {
  padding: 0.5rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.price-input input:focus {
  outline: none;
  border-color: #e85423;
}

.apply-price {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s ease;
}

.apply-price:hover {
  background: #d1451a;
}

.reset-filter {
  width: 100%;
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #666;
  transition: all 0.2s ease;
}

.reset-filter:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

/* Promo Filter */
.promo-filter {
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
  background: white;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #e85423;
  border-color: #e85423;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.products-container {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
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
  height: 200px;
  overflow: hidden;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Promo Badge */
.promo-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
  z-index: 2;
}

.promo-text {
  font-size: 0.7rem;
  font-weight: 700;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-price {
  font-weight: 600;
  color: #e85423;
  font-size: 1rem;
  margin: 0;
}

.original-price {
  font-size: 0.8rem;
  color: #999;
  text-decoration: line-through;
  margin: 0;
  font-weight: 400;
}

/* No Results Styling */
.no-results {
  text-align: center;
  padding: 8rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.no-results-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.no-results-content i {
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.no-results-content h3 {
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.no-results-content p {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}

.back-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #e85423;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  background: #d1451a;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .search-results-container {
    padding: 4.5rem 1rem 1rem 1rem;
  }

  .search-header {
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }

  .results-summary {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    flex: 1;
  }

  .search-query-wrapper {
    margin-bottom: 0.5rem;
    padding: 0 0.25rem;
  }

  .total-products {
    min-width: 32px;
    padding: 0.25rem;
  }

  .total-count {
    font-size: 1.5rem;
  }

  .search-query {
    font-size: 1.25rem;
  }

  .sorting-section {
    justify-content: flex-end;
    min-width: fit-content;
  }

  .search-content {
    flex-direction: column;
  }

  .filter-toggle {
    display: flex;
  }

  .filter-sidebar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    max-height: 100vh;
    border-radius: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
    background: white;
  }

  .filter-sidebar.filter-active {
    transform: translateX(0);
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 10;
    border-radius: 8px;
    margin-bottom: 1rem;
    margin: -1rem -1rem 1rem -1rem;
  }

  .filter-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .close-filter {
    background: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .filter-section {
    margin-bottom: 1.5rem;
  }

  .filter-section h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .filter-options {
    gap: 0.75rem;
  }

  .filter-option {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }

  .price-inputs {
    flex-direction: column;
    gap: 0.75rem;
  }

  .price-input input {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .apply-price {
    padding: 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .reset-filter {
    padding: 0.75rem;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }

  .product-image {
    height: 160px;
  }

  .product-info {
    padding: 0.75rem;
  }

  .product-name {
    font-size: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.1;
    max-height: 1.7rem;
  }

  .product-price {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .product-image {
    height: 140px;
  }

  .search-header {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .results-summary {
    gap: 0.75rem;
  }

  .total-products {
    min-width: 40px;
    padding: 0.25rem 0.5rem;
  }

  .total-count {
    font-size: 1.1rem;
  }

  .search-query-text {
    font-size: 0.75rem;
    white-space: normal;
    line-height: 1.2;
  }

  .search-query {
    font-size: 1rem;
    white-space: normal;
    line-height: 1.2;
  }

  .sorting-section {
    gap: 0.5rem;
  }

  .sort-label {
    font-size: 0.75rem;
  }

  .sort-button {
    min-width: 100px;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }

  .search-query-wrapper {
    margin-bottom: 0.75rem;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
  }

  .search-query-text {
    font-size: 0.7rem;
    line-height: 1.1;
  }

  .search-query {
    font-size: 0.9rem;
    line-height: 1.1;
  }

  /* Filter improvements for very small screens */
  .filter-sidebar {
    padding: 0.75rem;
  }

  .filter-header {
    padding: 0.75rem;
    margin: -0.75rem -0.75rem 1rem -0.75rem;
  }

  .filter-header h3 {
    font-size: 1rem;
  }

  .close-filter {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }

  .filter-section {
    margin-bottom: 1.25rem;
  }

  .filter-section h3 {
    font-size: 0.9rem;
  }

  .filter-option {
    font-size: 0.85rem;
  }

  .price-input input {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .apply-price {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .reset-filter {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
}

.total-products .search-query-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  font-weight: 400;
}
.total-products .search-query {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0.1rem 0 0 0;
}
.search-query-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  margin-top: 0.5rem;
}
@media (max-width: 768px) {
  .search-query-wrapper {
    align-items: flex-start;
    margin-bottom: 0.75rem;
    padding: 0 0.25rem;
  }
}
.search-query-text {
  font-size: 0.85rem;
  color: #666;
  font-weight: 400;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-query {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0.1rem 0 0 0;
}
</style>
