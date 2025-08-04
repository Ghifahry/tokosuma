<template>
  <header class="navbar">
    <div class="navbar-content-wrapper">
      <!-- Baris Atas: Logo, Search, Ikon -->
      <div class="top-bar">
        <!-- Logo -->
        <router-link :to="{ name: 'home' }" class="logo">
          <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" />
        </router-link>
        <div class="search-section">
          <!-- Kategori button untuk desktop -->
          <div v-if="!isMobile" class="kategori-button-desktop">
            <div class="dropdown" @click="toggleKategori" ref="kategoriDropdownTriggerRef">
              <button class="kategori-btn">
                Kategori
                <i class="fas fa-chevron-down"></i>
              </button>
              <!-- Dropdown content untuk desktop -->
              <transition name="zoom-fade">
                <div v-if="showKategori" class="dropdown-content kategori-dropdown" @click.stop ref="kategoriDropdownContentRef">
                  <!-- ==== KIRI: Filter & Sort ==== -->
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

                  <!-- ==== KANAN: Daftar Kategori ==== -->
                  <ul class="kategori-list">
                    <li v-for="category in availableCategories" :key="category.slug">
                      <button @click="navigateTo(`/kategori/${category.slug}`)">
                        {{ category.name }}
                      </button>
                    </li>
                  </ul>

                  <button class="btn-continue" :disabled="!hasSelection" @click="applyKategori">Continue</button>
                </div>
              </transition>
            </div>
          </div>
          <div class="search">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Cari Produk atau Judul Buku...." v-model="searchQuery" @keyup.enter="searchProducts" @input="handleSearchInput" @focus="showSearchSuggestions = true" @blur="handleSearchBlur" ref="searchInput" />
            <!-- Search Suggestions Dropdown -->
            <transition name="zoom-fade">
              <div v-if="showSearchSuggestions && searchSuggestions.length > 0" class="search-suggestions" @click.stop>
                <ul class="suggestions-list">
                  <li v-for="suggestion in searchSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)" class="suggestion-item">
                    <div class="suggestion-content">
                      <i class="fas fa-search suggestion-icon"></i>
                      <div class="suggestion-details">
                        <div class="suggestion-name">{{ suggestion }}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
        <!-- Small Vertical Separator -->
        <div class="small-separator"></div>
        <!-- Ikon -->
        <div class="icons">
          <!-- Account -->
          <div v-if="isLoggedIn" class="dropdown profile-dropdown" @click="toggleAccount" ref="profileDropdownRef">
            <img :src="profileImageUrl" alt="User Profile" class="profile-pic" />
            <span class="username">{{ username }}</span>
            <i v-if="!showAccount" class="fas fa-chevron-down"></i>
            <transition name="zoom-fade">
              <div v-if="showAccount" class="dropdown-box account-dropdown" ref="accountDropdownRef">
                <div class="user-info">
                  <span class="user-full-name">{{ userFullName }}</span>
                  <span class="user-email">{{ userEmail }}</span>
                </div>
                <button @click="navigateTo('/account/akun')" class="account-btn">
                  <i class="fas fa-user"></i>
                  Akun
                </button>
                <button @click="navigateTo('/cart')" class="account-btn cart-btn">
                  <i class="fas fa-shopping-cart"></i>
                  Cart
                  <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                </button>
                <button @click="navigateTo('/account/wishlist')" class="account-btn wishlist-separator">
                  <i class="fas fa-heart"></i>
                  Wishlist
                </button>
                <button v-if="isSuperAdmin" @click="navigateTo('/admin/dashboard')" class="account-btn admin-btn">Dashboard</button>
                <button @click="logout" class="account-btn">Logout</button>
              </div>
            </transition>
          </div>
          <div v-else class="auth-buttons">
            <button @click="handleLoginClick" class="account-btn">Login</button>
            <button @click="handleRegisterClick" class="account-btn register-btn">Daftar</button>
          </div>
        </div>
        <!-- Tambahkan setelah div.icons -->
      </div>

      <!-- Baris Bawah: Menu Navigasi -->
      <nav class="menu" :class="{ open: showMobileMenu }">
        <div v-if="isMobile" class="dropdown" @click="toggleKategori" ref="kategoriDropdownTriggerRef">
          <router-link to="" class="dropdown-toggle"> Kategori <i class="fas fa-chevron-down"></i> </router-link>

          <!-- ⬇️ animasi scale/fade -->
          <transition name="zoom-fade">
            <div v-if="showKategori" class="dropdown-content kategori-dropdown" @click.stop ref="kategoriDropdownContentRef">
              <!-- ==== KIRI: Filter & Sort ==== -->
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

              <!-- ==== KANAN: Daftar Kategori ==== -->
              <ul class="kategori-list">
                <!-- Contoh kategori utama -->
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

              <button class="btn-continue" :disabled="!hasSelection" @click="applyKategori">Continue</button>
            </div>
          </transition>
        </div>

        <!-- link lain -->
      </nav>
    </div>
  </header>
</template>
<script>
import products from "@/data/products.js";

export default {
  data() {
    return {
      showKategori: false,
      showCart: false,
      showAccount: false,
      filter: { terbaru: false, diskon: false },
      sortBy: "termurah",
      showMobileMenu: false,
      showWishlist: false,
      isMobile: window.innerWidth <= 768,
      isLoggedIn: false,
      profileImageUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      username: "",
      userFullName: "",
      userEmail: "",
      showLogoutConfirm: false,
      searchQuery: "", // Tambahkan searchQuery untuk menyimpan input pencarian
      products: products, // Impor data produk
      showSearchSuggestions: false,
      searchSuggestions: [],
      searchTimeout: null,
      userRole: "",
      cartItemCount: 0,
    };
  },
  computed: {
    isSuperAdmin() {
      return this.userRole === "super_admin";
    },
    hasSelection() {
      return this.filter.terbaru || this.filter.diskon || this.sortBy !== "termurah";
    },
    availableCategories() {
      const categories = [];
      const categoryMap = new Map();

      // Analisis produk untuk menentukan kategori yang ada
      this.products.forEach((product) => {
        const name = product.name.toLowerCase();

        // Deteksi kategori berdasarkan nama produk
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

      // Konversi Map ke Array dan urutkan berdasarkan jumlah produk
      return Array.from(categoryMap.values())
        .filter((category) => category.count > 0)
        .sort((a, b) => b.count - a.count);
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
      this.closeAll();
    },
    toggleKategori() {
      if (this.showKategori) {
        this.closeAll();
      } else {
        this.closeAll();
        this.showKategori = true;
      }
    },
    toggleAccount() {
      if (this.showAccount) {
        this.showAccount = false;
      } else {
        this.closeAll();
        this.showAccount = true;
      }
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    logout() {
      if (confirm("Apakah Anda yakin ingin keluar akun?")) {
        // Hapus semua data user dari localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFullName");
        localStorage.removeItem("username");

        // Trigger custom event untuk update header
        window.dispatchEvent(
          new CustomEvent("loginStatusChanged", {
            detail: { isLoggedIn: false },
          })
        );

        // Update status login
        this.checkLoginStatus();

        this.closeAll();
        // Arahkan ke halaman home setelah logout
        this.$router.push("/");
      }
    },
    handleLoginClick() {
      this.$router.push("/login");
    },
    handleRegisterClick() {
      this.$router.push("/register");
    },

    applyKategori() {
      // Handle kategori application
      console.log("Kategori applied:", { filter: this.filter, sortBy: this.sortBy });
      this.closeAll();
    },

    /** Tutup semua dropdown */
    closeAll() {
      this.showKategori = false;
      this.showCart = false;
      this.showAccount = false;
      this.showWishlist = false;
      this.showSearchSuggestions = false;
    },

    /** Handler global untuk klik‑di‑luar */
    handleClickOutside(event) {
      const clickedProfileTrigger = this.$refs.profileDropdownRef && this.$refs.profileDropdownRef.contains(event.target);
      const clickedAccountDropdown = this.$refs.accountDropdownRef && this.$refs.accountDropdownRef.contains(event.target);
      const clickedKategoriTrigger = this.$refs.kategoriDropdownTriggerRef && this.$refs.kategoriDropdownTriggerRef.contains(event.target);
      const clickedKategoriDropdown = this.$refs.kategoriDropdownContentRef && this.$refs.kategoriDropdownContentRef.contains(event.target);
      const clickedSearchInput = this.$refs.searchInput && this.$refs.searchInput.contains(event.target);

      if (!clickedProfileTrigger && !clickedAccountDropdown && !clickedKategoriTrigger && !clickedKategoriDropdown && !clickedSearchInput) {
        this.closeAll();
      }
    },

    /** Cek status login dan load data user */
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      // Load user data from localStorage
      if (this.isLoggedIn) {
        this.userEmail = localStorage.getItem("userEmail") || "";
        this.userFullName = localStorage.getItem("userFullName") || "";
        this.username = localStorage.getItem("username") || "";
        this.userRole = localStorage.getItem("userRole") || "";
      } else {
        // Reset user data jika logout
        this.userEmail = "";
        this.userFullName = "";
        this.username = "";
        this.userRole = "";
      }
    },

    // Handle search input untuk recommendations
    handleSearchInput() {
      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set new timeout untuk debounce
      this.searchTimeout = setTimeout(() => {
        this.generateSearchSuggestions();
      }, 300);
    },

    // Generate search suggestions
    generateSearchSuggestions() {
      if (!this.searchQuery.trim()) {
        this.searchSuggestions = [];
        return;
      }

      const query = this.searchQuery.toLowerCase();

      // Kata kunci rekomendasi berdasarkan kategori dan produk populer
      const keywordSuggestions = [
        "buku",
        "novel",
        "tas",
        "sekolah",
        "kalender",
        "alat tulis",
        "pulpen",
        "pensil",
        "notebook",
        "mug",
        "tumbler",
        "gelas",
        "sticker",
        "phone case",
        "plakat",
        "award",
        "merch",
        "corporate",
        "back to school",
        "perlengkapan sekolah",
        "buku novel",
        "tas sekolah",
        "kalender 2024",
        "set alat tulis",
        "mug custom",
        "tumbler stainless",
        "sticker vinyl",
        "case hp",
        "plakat acrylic",
        "merchandise",
      ];

      // Filter kata kunci yang cocok dengan query
      const filteredKeywords = keywordSuggestions.filter((keyword) => keyword.toLowerCase().includes(query));

      // Sort by relevance (exact matches first, then partial matches)
      filteredKeywords.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        // Exact match gets higher priority
        if (aLower === query && bLower !== query) return -1;
        if (bLower === query && aLower !== query) return 1;

        // Starts with query gets higher priority
        if (aLower.startsWith(query) && !bLower.startsWith(query)) return -1;
        if (bLower.startsWith(query) && !aLower.startsWith(query)) return 1;

        // Sort alphabetically for remaining items
        return aLower.localeCompare(bLower);
      });

      // Limit to 8 suggestions
      this.searchSuggestions = filteredKeywords.slice(0, 8);
    },

    // Handle search blur
    handleSearchBlur() {
      // Delay hiding suggestions to allow clicking on them
      setTimeout(() => {
        this.showSearchSuggestions = false;
      }, 200);
    },

    // Select a suggestion
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.showSearchSuggestions = false;
      this.searchProducts();
    },

    // Metode pencarian produk
    searchProducts() {
      if (!this.searchQuery.trim()) return; // Jangan lakukan pencarian jika query kosong

      // Simpan query pencarian di localStorage agar bisa diakses di halaman hasil pencarian
      localStorage.setItem("searchQuery", this.searchQuery);

      // Filter produk berdasarkan query pencarian
      const filteredProducts = this.products.filter((product) => {
        const query = this.searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      });

      // Simpan hasil pencarian di localStorage
      localStorage.setItem("searchResults", JSON.stringify(filteredProducts));

      // Tutup semua dropdown
      this.closeAll();

      // Navigasi ke halaman hasil pencarian dengan query sebagai parameter
      this.$router.push({
        path: "/search",
        query: { q: this.searchQuery },
      });

      // Tidak reset searchQuery agar tetap terlihat di input search
      // this.searchQuery = "";
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });

    // Cek status login saat komponen dimuat
    this.checkLoginStatus();

    // Listen untuk perubahan localStorage
    window.addEventListener("storage", this.checkLoginStatus);

    // Listen untuk custom event login status change
    window.addEventListener("loginStatusChanged", this.checkLoginStatus);

    // Clear search query on page refresh
    this.searchQuery = "";

    // Clear search-related localStorage on page refresh
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("searchResults");
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
    window.removeEventListener("storage", this.checkLoginStatus);
    window.removeEventListener("loginStatusChanged", this.checkLoginStatus);

    // Clear timeout on unmount
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  },
};
</script>

<style scoped>
.navbar {
  font-family: "Poppins", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1000;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  align-items: center; /* ini penting untuk center isi anak (menu) */
}

.navbar-content-wrapper {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

/* Baris atas */
.top-bar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 150px;
  justify-self: start;
  padding: 0.5rem 1rem;
  margin-left: 50px;
}

.search-section {
  display: flex;
  align-items: center;
  padding-right: 50px;
  gap: 25px;
}

.kategori-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  background: rgb(255, 255, 255);
  color: black;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.search-section {
  padding-top: 10px; /* Reduced from 20px to move search bar higher */
}
.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #aaa;
  font-size: 0.85rem;
}

.search input {
  padding: 0.25rem 1rem 0.25rem 2rem; /* padding kiri lebih besar */
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 400px;
  height: 45px; /* Increased from 40px to make search bar taller */
  font-size: 0.85rem;
}

/* Search Suggestions Styles */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  margin-top: 5px;
  max-height: 400px;
  overflow-y: auto;
}

.suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestion-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.suggestion-icon {
  color: #e85423;
  font-size: 0.9rem;
  width: 16px;
  text-align: center;
}

.suggestion-details {
  flex: 1;
}

.suggestion-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}

/* Tambahkan style untuk tombol pencarian */

.search-button:hover {
  background: #c6481d;
}

.search-button i {
  font-size: 0.75rem;
}

.icons {
  justify-self: end;
  display: flex;
  gap: 2rem;
  padding: 2rem 5rem;
  margin-top: 5px; /* Reduced from 15px to align with raised search bar */
}

/* Small Vertical Separator */
.small-separator {
  position: absolute;
  right: 300px; /* Position it before the icons section */
  top: 45%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background: #ddd;
  z-index: 1;
}

.icons i {
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  color: #e85423;
}

.icons i:hover {
  color: #6e6866;
}

/* Parent untuk semua ikon dropdown di bar kanan */
.icons .dropdown {
  position: relative; /* <— kunci agar .dropdown-box diposisikan relatif */
}

.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: gap 0.2s ease; /* Add transition for smooth gap changes */
}

.profile-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e68463;
}

.username {
  color: #000000;
  font-weight: 500;
}

.user-info {
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.user-info .user-full-name {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px; /* Increased spacing */
}

.user-info .user-email {
  font-size: 0.85rem;
  color: #777;
}

/* Baris bawah: menu navigasi */
.menu {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  padding: 0.1rem 0.4rem 0.9rem;
  font-size: 0.85rem;
  width: 100%;
}

.menu :deep(a),
.dropdown-box :deep(a) {
  text-decoration: none !important;
  color: inherit !important;
  transition: color 0.3s ease;
}
.menu :deep(a:hover),
.dropdown-box :deep(a:hover) {
  color: #e85423 !important;
}

.menu router-link:hover,
.dropdown-box router-link:hover {
  color: #e85423; /* opsional, bisa disesuaikan */
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dropdown i.fa-chevron-down {
  font-size: 0.6rem;
  margin-left: 3px;
  vertical-align: middle;
}

.dropdown-content,
.dropdown-box {
  position: absolute;
  background: #fff;
  padding: 0.7rem 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  z-index: 999;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.dropdown-content:hover,
.dropdown-box:hover {
  box-shadow: 0 4px 12px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
}

.dropdown-content {
  display: flex;
  gap: 1.5rem;
}

/* Hanya untuk dropdown akun */
/* Parent harus relative agar position absolute bekerja */
.account-dropdown-wrapper {
  position: relative;
}

/* Dropdown-nya muncul di bawah, dan nempel ke kanan */
.account-dropdown {
  position: absolute;
  top: 100%; /* muncul tepat di bawah */
  right: 0; /* nempel ke kanan elemen pemicu */
  background: #fff;
  padding: 0.7rem 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  z-index: 999;
  font-size: 0.85rem;
  min-width: 200px;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Increased gap between dropdown items */
}

.account-dropdown:hover {
  box-shadow: 0 4px 12px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
}

.dropdown-content {
  display: flex;
  gap: 2zrem;
}

.filter-sort {
  display: flex;
  flex-direction: column;
}

.kategori-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.kategori-list li {
  cursor: pointer;
  margin: 0.5rem 0;
}

.account-dropdown router-link {
  display: block;
  padding: 0.4rem 0;
  color: inherit;
  text-decoration: none;
}

.account-dropdown router-link:hover {
  color: #e85423;
}

/* ----- ukuran & posisi khusus dropdown Kategori ----- */
/* dua kolom: filter (200 px) + list (sisanya) */
.kategori-dropdown {
  position: absolute;
  top: 93%;
  left: 0;
  right: 0;
  width: 100vw; /* ⬅️ Lebar full satu layar */
  max-width: none;
  background: #fff;
  padding: 1rem 1.8rem;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  border-top: 1px solid #eee;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 12px 12px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.kategori-dropdown:hover {
  box-shadow: 0 6px 16px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
}

.filter-sort h4 {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}
.filter-sort label {
  font-weight: 400;
  margin-bottom: 0.3rem;
}
.filter-sort input {
  margin-right: 6px;
}

.kategori-list {
  list-style: none;
  padding: 0;
  margin: 0;
  columns: 2; /* jadi 2 kolom otomatis */
  column-gap: 1.5rem;
}
.kategori-list li button {
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.8rem;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  display: block; /* ⬅️ buat tombol selebar li */
}

.kategori-list li button:hover {
  background-color: #fff1ec;
  color: #e85423;
}

.kategori-list a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}
.kategori-list a:hover {
  color: #e85423;
}

/* ----- animasi zoom‑fade ----- */
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.kategori-panel {
  display: flex;
  flex-direction: column;
}

.btn-continue {
  margin-top: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 12px;
  border: none;
  background: #e85423;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 3px 6px rgba(232, 84, 35, 0.25);
}
.btn-continue:disabled {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}
.btn-continue:not(:disabled):hover {
  background: #c6481d;
  box-shadow: 0 5px 10px rgba(198, 72, 29, 0.35);
}

.hamburger {
  display: none;
}

/* 📱 Ukuran layar sangat kecil (e.g. Fold) */
@media (max-width: 480px) {
  .top-bar {
    padding: 0rem 0.75rem;
  }

  .search input {
    font-size: 0.75rem;
    padding-left: 1.8rem;
  }

  .search-icon {
    font-size: 0.75rem;
  }

  .icons {
    gap: 1rem;
    padding: 0.5rem 1rem;
    align-items: center;
  }

  .hamburger {
    margin-left: 0.5rem;
  }

  /* Mobile search suggestions */
  .search-suggestions {
    width: 100%;
    max-height: 300px;
  }

  .suggestion-content {
    padding: 10px 12px;
  }

  .suggestion-icon {
    font-size: 0.8rem;
    width: 14px;
  }

  .suggestion-name {
    font-size: 0.8rem;
  }
}

/* 🌐 Ukuran layar kecil (HP) */
@media (max-width: 768px) {
  .profile-dropdown {
    padding-top: 0; /* Remove top padding to align with search bar */
    position: relative; /* Ensure proper positioning for dropdown */
  }
  .top-bar {
    grid-template-columns: 1fr auto auto; /* Search, Logo (hidden), Icons */
    padding: 0.5rem 1rem;
    align-items: center; /* Ensure vertical alignment */
  }

  .search-section {
    flex-direction: column;
    gap: 8px; /* Reduced gap to move search bar higher */
    width: 100%;
    align-items: stretch;
    padding-top: 5px; /* Added padding-top for mobile */
  }

  .kategori-button-desktop {
    display: none; /* Hide kategori button on mobile */
  }

  .logo {
    display: none !important;
  }
  .logo img {
    width: 90px;
    padding: 0.5rem 1rem;
  }

  .search {
    justify-self: start; /* Align search to the start of its grid column */
  }

  .search {
    justify-self: start;
    width: 100%;
  }

  .search input {
    width: 100%; /* Make input take full width of its parent (.search) */
    padding: 0.4rem 1.5rem 0.4rem 1.8rem; /* Adjust padding */
    font-size: 0.75rem;
    height: 38px; /* Increased height for mobile to match desktop proportion */
    box-sizing: border-box;
  }

  .icons {
    padding: 0.5rem 1rem; /* Adjusted padding to align with search bar */
    gap: 0.5rem; /* Adjusted gap for mobile */
    align-items: center; /* Ensure vertical alignment */
  }

  .small-separator {
    display: none; /* Hide separator on mobile */
  }

  .profile-pic {
    width: 25px;
    height: 25px;
  }

  .username {
    font-size: 0.75rem;
  }

  .auth-buttons {
    flex-direction: row; /* Keep them in a row */
    gap: 5px; /* Adjust gap for mobile */
  }

  .auth-buttons .account-btn {
    padding: 0.4rem 0.8rem; /* Increased padding to match search bar height */
    font-size: 0.75rem;
    height: 38px; /* Match search bar height */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    display: none; /* Hide menu on mobile */
  }

  .menu .dropdown,
  .menu router-link {
    margin: 0.2rem 0.5rem; /* Adjust margins for horizontal layout */
  }

  .kategori-dropdown {
    position: absolute;
    width: auto;
    max-width: none;
    left: 0;
    right: auto;
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }

  .kategori-list {
    columns: 1;
  }

  /* Account dropdown styling for mobile */
  .account-dropdown {
    position: absolute;
    top: calc(100% + 5px); /* Position below the profile dropdown with small gap */
    right: -10px; /* Slight offset to align with search bar */
    width: 280px; /* Increased width for mobile */
    min-width: 280px; /* Ensure minimum width */
    background: #fff;
    padding: 1rem;
    border: 1px solid #eee;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    z-index: 999;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .account-dropdown .user-info {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    text-align: center;
  }

  .account-dropdown .user-info .user-full-name {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    margin-bottom: 6px;
  }

  .account-dropdown .user-info .user-email {
    font-size: 0.85rem;
    color: #777;
  }

  .account-dropdown .account-btn {
    padding: 10px 12px;
    font-size: 0.9rem;
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
  }

  .account-dropdown .account-btn:hover {
    background-color: #f5f5f5;
    color: #e85423;
  }
}
.account-btn {
  width: 100%;
  background: transparent;
  border: none;
  padding: 0.4rem 0;
  text-align: left;
  font-size: 0.85rem;
  cursor: pointer;
  color: inherit;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.account-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.account-btn i {
  width: 16px;
  text-align: center;
  color: #666;
}

.account-btn.cart-btn {
  color: #666;
  font-weight: 500;
}

.account-btn.cart-btn i {
  color: #666;
}

.account-btn.wishlist-separator {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px; /* Add some space below the line */
}

.auth-buttons .account-btn {
  border: 1px solid #e85423;
  color: #e85423;
  background: transparent;
  padding: 0.4rem 1rem; /* Add padding to make it look like a button */
  width: auto; /* Override width: 100% from .account-btn */
  text-align: center; /* Center text */
}

.auth-buttons .account-btn:hover {
  background-color: #e85423;
  color: white;
}

.auth-buttons {
  display: flex;
  gap: 10px; /* Adjust gap as needed */
}

.register-btn {
  background-color: #e85423;
  color: rgb(0, 0, 0);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.register-btn:hover {
  background-color: #c6481d;
}

.admin-btn {
  background-color: #2c3e50 !important;
  color: white !important;
  font-weight: 600;
}

.admin-btn:hover {
  background-color: #34495e !important;
}
</style>
