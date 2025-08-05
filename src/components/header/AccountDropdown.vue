<template>
  <div class="account-dropdown-container">
    <!-- Account Dropdown for Desktop -->
    <div v-if="isLoggedIn && !isMobile" class="dropdown profile-dropdown" @click="toggleAccount" ref="profileDropdownRef">
      <img :src="profileImageUrl" alt="User Profile" class="profile-pic" />
      <span class="username">{{ username }}</span>
      <i v-if="!showAccount" class="fas fa-chevron-down"></i>

      <transition name="zoom-fade">
        <div v-if="showAccount" class="dropdown-box account-dropdown" ref="accountDropdownRef">
          <div class="user-info">
            <span class="user-full-name">{{ userFullName }}</span>
            <span class="user-email">{{ userEmail }}</span>
          </div>

          <button @click.stop="navigateTo('/account/akun')" class="account-btn">
            <i class="fas fa-user"></i>
            Akun
          </button>

          <button @click.stop="navigateTo('/cart')" class="account-btn cart-btn">
            <i class="fas fa-shopping-cart"></i>
            Cart
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </button>

          <button @click.stop="navigateTo('/account/wishlist')" class="account-btn wishlist-separator">
            <i class="fas fa-heart"></i>
            Wishlist
          </button>

          <button v-if="isSuperAdmin()" @click.stop="navigateTo('/admin/dashboard')" class="account-btn admin-btn">Dashboard</button>

          <button @click.stop="logout" class="account-btn">Logout</button>
        </div>
      </transition>
    </div>

    <!-- Auth Buttons for Desktop -->
    <div v-else-if="!isMobile" class="auth-buttons">
      <button @click="handleLoginClick" class="account-btn">Login</button>
      <button @click="handleRegisterClick" class="account-btn register-btn">Daftar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useCart } from "@/composables/useCart";
import { useResponsive } from "@/composables/useResponsive";

const router = useRouter();
const { isLoggedIn, userEmail, userFullName, username, profileImageUrl, logout, isSuperAdmin } = useAuth();
const { cartItemCount } = useCart();
const { isMobile } = useResponsive();

const showAccount = ref(false);
const profileDropdownRef = ref(null);

const toggleAccount = () => {
  if (showAccount.value) {
    showAccount.value = false;
  } else {
    showAccount.value = true;
  }
};

const navigateTo = (path) => {
  router.push(path);
  showAccount.value = false;
};

const handleLoginClick = () => {
  router.push("/login");
};

const handleRegisterClick = () => {
  router.push("/register");
};

const handleClickOutside = (event) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
    showAccount.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.account-dropdown-container {
  display: flex;
  align-items: center;
}

.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: gap 0.2s ease;
  position: relative;
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

.account-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
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
  gap: 10px;
}

.account-dropdown:hover {
  box-shadow: 0 4px 12px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
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
  margin-bottom: 8px;
}

.user-info .user-email {
  font-size: 0.85rem;
  color: #777;
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
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
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

.account-btn.wishlist-separator {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons .account-btn {
  border: 1px solid #e85423;
  color: #e85423;
  background: transparent;
  padding: 0.4rem 1rem;
  width: auto;
  text-align: center;
}

.auth-buttons .account-btn:hover {
  background-color: #e85423;
  color: white;
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

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e85423;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Animations */
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .profile-pic {
    width: 25px;
    height: 25px;
  }

  .username {
    font-size: 0.75rem;
  }

  .auth-buttons {
    flex-direction: row;
    gap: 5px;
  }

  .auth-buttons .account-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
