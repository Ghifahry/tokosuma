<template>
  <header class="navbar">
    <div class="navbar-content-wrapper">
      <!-- Baris Atas: Logo, Search, Ikon -->
      <div class="top-bar">
        <!-- Logo -->
        <router-link :to="{ name: 'home' }" class="logo">
          <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" />
        </router-link>
        <div class="search">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Cari Produk atau Judul Buku...." />
        </div>
        <!-- Ikon -->
        <div class="icons">
          <!-- Cart -->

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
                <button @click="navigateTo('/account/akun')" class="account-btn">Akun</button>
                <button @click="navigateTo('/cart')" class="account-btn">Cart</button>
                <button @click="navigateTo('/account/wishlist')" class="account-btn wishlist-separator">Wishlist</button>
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
        <div class="dropdown" @click="toggleKategori" ref="kategoriDropdownTriggerRef">
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
                <li><button @click="navigateTo('/kategori/kaos')">Kaos Custom</button></li>
                <li><button @click="navigateTo('/kategori/hoodie')">Hoodie & Sweater</button></li>
                <li><button @click="navigateTo('/kategori/totebag')">Tote Bag</button></li>
                <li><button @click="navigateTo('/kategori/mug')">Mug & Tumbler</button></li>
                <li><button @click="navigateTo('/kategori/sticker')">Sticker</button></li>
                <li><button @click="navigateTo('/kategori/phonecase')">Phone Case</button></li>
                <li><button @click="navigateTo('/kategori/notebook')">Notebook</button></li>
                <li><button @click="navigateTo('/kategori/plakat')">Plakat & Award</button></li>
                <li><button @click="navigateTo('/kategori/merch')">Merch Corporate</button></li>
                <li><button @click="navigateTo('/kategori/others')">Lain‑lain…</button></li>
              </ul>

              <button class="btn-continue" :disabled="!hasSelection" @click="applyKategori">Continue</button>
            </div>
          </transition>
        </div>

        <!-- link lain -->
        <router-link to="/design-online">Design Online</router-link>
        <router-link to="/pricelist-digital">Pricelist Digital</router-link>
        <router-link to="/blogs">Blog</router-link>
      </nav>
    </div>
  </header>
</template>
<script>
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
      isLoggedIn: false, // Tambahkan isLoggedIn
      profileImageUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Default profile image
      username: "el", // Default username
      userFullName: "mhmdgabrielle ", // Placeholder for user's full name
      userEmail: "mhmdgabrielle@example.com", // Placeholder for user's email
      showLogoutConfirm: false, // Control popup visibility
    };
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
        this.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn"); // Hapus isLoggedIn dari local storage
        this.closeAll();
        // Opsional: Arahkan ke halaman home setelah logout
        this.$router.push({ name: "home" });
      }
    },
    handleLoginClick() {
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    },
    handleRegisterClick() {
      this.$router.push("/register");
    },

    /** Tutup semua dropdown */
    closeAll() {
      this.showKategori = false;
      this.showCart = false;
      this.showAccount = false;
      this.showWishlist = false;
    },

    /** Handler global untuk klik‑di‑luar */
    handleClickOutside(event) {
      if (this.$refs.profileDropdownRef && this.$refs.accountDropdownRef && !this.$refs.profileDropdownRef.contains(event.target) && !this.$refs.accountDropdownRef.contains(event.target)) {
        this.closeAll();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
    // Cek status login saat komponen dimuat
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
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
  padding: 0.5rem 1rem;
}

.logo img {
  width: 150px;
  justify-self: start;
  padding: 0.5rem 1rem;
  margin-top: 10px;
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
  height: 40px;
  font-size: 0.85rem;
}

.icons {
  justify-self: end;
  display: flex;
  gap: 2rem;
  padding: 1rem 5rem;
  margin-top: 15px;
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
/* dua kolom: filter (200 px) + list (sisanya) */
.kategori-dropdown {
  position: absolute;
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
    gap: 2rem;
    padding-right: 3.5rem;
  }

  .hamburger {
    margin-left: 0.5rem;
  }
}

/* 🌐 Ukuran layar kecil (HP) */
@media (max-width: 768px) {
  .top-bar {
    grid-template-columns: 1fr auto auto; /* Search, Logo (hidden), Icons */
    padding: 0.5rem 1rem;
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
  }

  .icons {
    padding: 0.5rem 2rem 1.5rem 1rem; /* Adjusted padding for mobile */
    gap: 0.5rem; /* Adjusted gap for mobile */
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
    padding: 0.3rem 0.8rem;
    font-size: 0.75rem;
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
</style>
