<template>
  <div class="search-results-container">
    <div class="search-header">
      <h1>Hasil Pencarian untuk "{{ searchQuery }}"</h1>
      <p v-if="filteredResults.length > 0">Ditemukan {{ filteredResults.length }} hasil</p>
      <p v-else>Tidak ditemukan hasil untuk pencarian Anda</p>
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
        <div class="products-grid" v-if="filteredResults.length > 0">
          <div v-for="product in filteredResults" :key="product.id" class="product-card">
            <router-link :to="`/product/${slugify(product.name)}`" class="product-link">
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">{{ product.price }}</p>
              </div>
            </router-link>
          </div>
        </div>

        <div class="no-results" v-else>
          <p>Coba gunakan kata kunci lain atau periksa ejaan Anda</p>
          <button @click="goBack" class="back-button"><i class="fas fa-arrow-left"></i> Kembali</button>
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

export default {
  name: "SearchResults",
  components: {
    Footer,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      selectedCategories: [],
      minPrice: null,
      maxPrice: null,
      categories: ["Buku", "Alat Tulis", "Aksesoris", "Tas", "Kalender", "Gelas"],
      showFilter: false,
    };
  },
  computed: {
    filteredResults() {
      if (!this.selectedCategories.length && !this.minPrice && !this.maxPrice) {
        return this.searchResults;
      }

      return this.searchResults.filter((product) => {
        // Filter berdasarkan kategori
        const categoryMatch = !this.selectedCategories.length || this.getCategoryFromProduct(product);

        // Filter berdasarkan harga
        const price = this.extractPrice(product.price);
        const priceMatch = (!this.minPrice || price >= this.minPrice) && (!this.maxPrice || price <= this.maxPrice);

        return categoryMatch && priceMatch;
      });
    },
  },
  created() {
    // Ambil query pencarian dari parameter URL
    this.searchQuery = this.$route.query.q || "";

    // Jika ada hasil pencarian di localStorage, gunakan itu
    const savedResults = localStorage.getItem("searchResults");
    if (savedResults) {
      this.searchResults = JSON.parse(savedResults);
    } else if (this.searchQuery) {
      // Jika tidak ada hasil tersimpan tapi ada query, lakukan pencarian
      this.performSearch();
    }
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
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
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
      this.searchQuery = newQuery || "";
      this.performSearch();
    },
  },
};
</script>

<style scoped>
.search-results-container {
  max-width: 1280px;
  margin: 3rem auto 40px;
  padding: 0 20px;
}

.search-header {
  margin-bottom: 30px;
  text-align: center;
}

.search-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.search-content {
  display: flex;
  gap: 30px;
  position: relative;
}

/* Filter Toggle Button untuk Mobile */
.filter-toggle {
  display: none;
  background-color: #e85423;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  font-weight: 500;
  align-items: center;
  gap: 5px;
}

.filter-toggle i {
  margin-right: 5px;
}

.filter-sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}

.filter-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.filter-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-filter {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-inputs {
  display: flex;
  gap: 10px;
}

.price-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price-input label {
  font-size: 12px;
  color: #666;
}

.price-input input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.apply-price {
  background-color: #e85423;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
}

.reset-filter {
  width: 100%;
  padding: 8px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.products-container {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-image {
  height: 200px;
  overflow: hidden;
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
  padding: 15px;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #333;
}

.product-price {
  font-weight: bold;
  color: #e85423;
}

.no-results {
  text-align: center;
  padding: 40px 0;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #e85423;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #c6481d;
}

@media (max-width: 768px) {
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
    max-height: 100%;
    border-radius: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 20px 30px; /* Menambah padding kanan untuk menjauhkan dari batas */
    box-sizing: border-box; /* Memastikan padding termasuk dalam lebar total */
    overflow-y: auto;
  }

  .filter-sidebar.filter-active {
    transform: translateX(0);
  }

  .filter-header {
    display: flex;
    padding: 10px;
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .close-filter {
    background-color: rgb(255, 255, 255);
    color: black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }

  .search-results-container {
    margin-top: 80px;
    margin: 1rem auto 40px;
  }

  .search-header h1 {
    font-size: 1.4rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .product-image {
    height: 150px;
  }
}
</style>
