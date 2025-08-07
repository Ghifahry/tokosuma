<template>
  <aside class="sidebar mobile-hidden">
    <div class="sidebar-inner">
      <!-- Profile -->
      <div class="profile">
        <img :src="user.profilePicture" alt="Foto Profil" class="profile-img" />
        <div class="profile-text">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <!-- Menu -->
      <nav class="menu">
        <router-link to="/account/transaksi" class="menu-link" active-class="active-link">Transaksi</router-link>
        <router-link to="/account/wishlist" class="menu-link" active-class="active-link">Wishlist</router-link>
        <router-link to="/account/akun" class="menu-link" active-class="active-link">Akun</router-link>
        <router-link to="/account/alamat" class="menu-link" active-class="active-link">Alamat</router-link>
        <hr class="menu-separator" />
        <router-link to="/account/ulasan" class="menu-link" active-class="active-link">Ulasan Produk</router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { useAuth } from "@/composables/useAuth";

// Get user data from auth composable
const { userEmail, userFullName, profileImageUrl } = useAuth();

// Reactive user data
const user = {
  name: userFullName,
  email: userEmail,
  profilePicture: profileImageUrl,
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #ffffff;
  border-right: 1px solid #ffffff;
  display: flex;
  justify-content: flex-start; /* ⬅️ Changed to align top */
  box-sizing: border-box;
  padding: 40px 20px 0 20px; /* ⬅️ Added top padding */
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* ⬅️ Changed to align top */
  height: 100%;
  width: 100%;
}

/* Profil */
.profile {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.profile-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.profile-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.profile-text p {
  margin: 0;
  font-size: 14px;
  color: #777;
}

/* Menu */
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-link {
  text-decoration: none;
  color: #111;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 4px;
}

.menu-link:hover {
  background-color: #eee;
}

.active-link {
  background-color: #eef4fc;
  color: #e85423;
  font-weight: 600;
  border-left: 4px solid #e85423;
  padding-left: 12px;
}

.menu-separator {
  margin: 16px 0;
  border: none;
  border-top: 1px solid #ddd;
  width: 100%;
}

/* Responsif: Sidebar jadi baris atas */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
    justify-content: flex-start;
  }

  .sidebar-inner {
    flex-direction: column;
    height: auto;
  }

  .menu {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .menu-link {
    flex: 1 1 45%;
    text-align: center;
    padding: 12px 0;
  }
}

/* Tambahkan di bagian bawah CSS */
@media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>
