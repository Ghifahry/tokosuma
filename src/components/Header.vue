<template>
  <TopHeader />
  <header class="navbar">
    <div class="navbar-content-wrapper">
      <!-- Main Header: Logo, Search, Icons -->
      <div class="top-bar">
        <!-- Logo -->
        <router-link :to="{ name: 'home' }" class="logo">
          <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" />
        </router-link>

        <div class="search-section">
          <!-- Mobile Header Elements -->
          <MobileHeader />

          <!-- Category Dropdown (Desktop Only) -->
          <div class="desktop-only">
            <CategoryDropdown />
          </div>

          <!-- Search Bar -->
          <SearchBar />

          <!-- Cart Button for Mobile -->
          <div v-if="isLoggedIn" class="mobile-cart-container">
            <button @click="navigateToCart" class="cart-btn-mobile">
              <i class="fas fa-shopping-cart"></i>
              <span v-if="cartItemCount > 0" class="cart-count-mobile">{{ cartItemCount }}</span>
            </button>
          </div>

          <!-- Small Vertical Separator -->
          <div class="small-separator"></div>
        </div>

        <!-- Icons Section -->
        <div class="icons">
          <AccountDropdown v-if="isLoggedIn" />
          <div v-else class="auth-buttons">
            <button @click="navigateToLogin" class="login-btn">Login</button>
            <button @click="navigateToRegister" class="register-btn">Register</button>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation Menu -->
      <nav class="menu" :class="{ open: showMobileMenu }">
        <!-- Mobile Category Menu -->
        <!-- CategoryDropdown sudah ada di search-section, tidak perlu duplikasi -->
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";
import { useAuth } from "@/composables/useAuth";
import SearchBar from "./header/SearchBar.vue";
import CategoryDropdown from "./header/CategoryDropdown.vue";
import AccountDropdown from "./header/AccountDropdown.vue";
import MobileHeader from "./header/MobileHeader.vue";
import TopHeader from "./top-header/TopHeader.vue";

const router = useRouter();
const showMobileMenu = ref(false);
const { cartItemCount, navigateToCart } = useCart();
const { isLoggedIn } = useAuth();

const navigateToLogin = () => {
  router.push("/login");
};

const navigateToRegister = () => {
  router.push("/register");
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
  align-items: center;
}

.navbar-content-wrapper {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

/* Main Header */
.top-bar {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding-top: 5px;
  margin: 0.5rem auto -1rem;
}

.logo img {
  width: 150px;
  justify-self: start;
  padding: 0.5rem 1rem;
  margin-left: 50px;
}

.search-section {
  display: flex;
  top: 0.45rem;
  align-items: center;
  padding-right: 40px;
  gap: 25px;
  position: relative;
}

/* Small Vertical Separator */
.small-separator {
  position: absolute;
  right: -50px;
  top: 55%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background: #ddd;
}

.icons {
  justify-self: end;
  display: flex;
  gap: 2rem;
  padding: 2.5rem 5rem 1.7rem 7rem;
  margin-top: 5px;
  margin-left: -20px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.login-btn,
.register-btn {
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn {
  background: transparent;
  border: 1px solid #e85423;
  color: #e85423;
}

.login-btn:hover {
  background: #e85423;
  color: white;
}

.register-btn {
  background: #e85423;
  border: 1px solid #e85423;
  color: white;
}

.register-btn:hover {
  background: #d44a1f;
  border-color: #d44a1f;
}

.mobile-cart-container {
  display: none;
}

/* Bottom Navigation Menu */
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .top-bar {
    grid-template-columns: 1fr auto;
    padding: 0.5rem 1rem;
    align-items: center;
    margin: 0.2rem auto 1rem;
  }

  .search-section {
    flex-direction: row;
    gap: 12px;
    width: 100%;
    align-items: center;
    padding-top: 5px;
    padding-right: 0;
    justify-content: space-between;
    margin-bottom: 1px;
  }

  .logo {
    display: none !important;
  }

  .desktop-only {
    display: none;
  }

  .mobile-cart-container {
    display: flex;
    align-items: center;
  }

  .cart-btn-mobile {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    position: relative;
    flex-shrink: 0;
  }

  .cart-btn-mobile:hover {
    background-color: #f5f5f5;
  }

  .cart-btn-mobile i {
    font-size: 1rem;
  }

  .cart-count-mobile {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #e85423;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .icons {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    align-items: center;
    margin-right: 2px;
  }

  .small-separator {
    display: none;
  }

  .menu {
    display: none;
  }
}

/* Small Screen Responsive */
@media (max-width: 480px) {
  .top-bar {
    padding: 0rem 0.75rem;
  }

  .icons {
    gap: 1rem;
    padding: 0rem 0.9rem;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
