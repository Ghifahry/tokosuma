<template>
  <div class="mobile-akun-container">
    <!-- Header -->
    <div class="mobile-header">
      <button class="back-button" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <h1 class="page-title">Akun</h1>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-photo-container">
        <img :src="userProfile.foto || defaultProfileImage" alt="Profile" class="profile-photo" />
      </div>
      <h2 class="user-name">{{ userProfile.nama || "Nama Pengguna" }}</h2>
      <p class="user-email">{{ userProfile.email || "email@example.com" }}</p>
    </div>

    <!-- Sub Menu Section -->
    <div class="sub-menu-section">
      <button class="menu-button" @click="navigateTo('transaksi')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span>Transaksi</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button class="menu-button" @click="navigateTo('wishlist')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span>Wishlist</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button class="menu-button" @click="navigateTo('alamat')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span>Alamat</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button class="menu-button" @click="navigateTo('akun-detail')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span>Akun</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button class="menu-button" @click="navigateTo('ulasan')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span>Alasan Produk</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Toko Kami Button - Changed to menu button style -->

      <!-- Separator -->
      <div class="separator"></div>

      <!-- Additional Menu Section -->
      <div class="additional-menu-section">
        <button class="menu-button" @click="showLiveChat">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span>Live Chat</span>
          <small class="construction-badge">Under Construction</small>
          <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <button class="menu-button" @click="navigateTo('info-berbelanja')">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span>Info Berbelanja</span>
          <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <button class="menu-button" @click="navigateTo('kebijakan-privasi')">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <span>Kebijakan Privasi</span>
          <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <button class="menu-button" @click="navigateTo('toko-kami')">
        <div class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span>Toko Kami</span>
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="separator"></div>
      <!-- Logout Button - Now part of scrollable content -->
      <div class="logout-section">
        <button class="logout-button" @click="logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Keluar Akun</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { userEmail, userFullName, logout: authLogout } = useAuth();

const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const userProfile = reactive({
  foto: "",
  nama: "",
  email: "",
});

const loadUserData = () => {
  userProfile.email = userEmail.value || localStorage.getItem("userEmail") || "";
  userProfile.nama = userFullName.value || localStorage.getItem("userFullName") || "";

  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    try {
      const userData = JSON.parse(storedUserData);
      userProfile.foto = userData.foto || defaultProfileImage;
      userProfile.nama = userData.nama || userProfile.nama;
      userProfile.email = userData.email || userProfile.email;
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }
};

const goBack = () => {
  router.back();
};

const navigateTo = (page) => {
  const routes = {
    transaksi: "/account/transaksi",
    wishlist: "/account/wishlist",
    alamat: "/account/alamat",
    "akun-detail": "/account/akun",
    ulasan: "/account/ulasan",
    "info-berbelanja": "/cara-pemesanan",
    "kebijakan-privasi": "/kebijakan-privasi",
    "toko-kami": "/toko-suma",
  };

  if (routes[page]) {
    router.push(routes[page]);
  }
};

const showLiveChat = () => {
  alert("Fitur Live Chat sedang dalam pengembangan. Silakan hubungi kami melalui WhatsApp di 0812-xxxx-xxxx");
};

const openTokoKami = () => {
  window.open("https://maps.google.com/?q=Toko+Suma", "_blank");
};

const logout = () => {
  if (confirm("Apakah Anda yakin ingin keluar akun?")) {
    authLogout();
    router.push("/");
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.mobile-akun-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
  position: relative;
}

/* Header */
.mobile-header {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-left: 16px;
  color: #333;
}

/* Profile Section */
.profile-section {
  background-color: white;
  padding: 32px 16px;
  text-align: center;
  margin-bottom: 8px;
}

.profile-photo-container {
  margin-bottom: 16px;
}

.profile-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e85423;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.user-email {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Menu Sections */
.sub-menu-section,
.additional-menu-section {
  background-color: white;
  margin-bottom: 8px;
}

.menu-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: #f9f9f9;
}

.menu-button:last-child {
  border-bottom: none;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-right: 12px;
  color: #000000;
}

.menu-button span {
  flex: 1;
  text-align: left;
  font-size: 16px;
  color: #333;
}

.arrow-icon {
  color: #999;
}

.construction-badge {
  background-color: #ff9800;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  margin-right: 8px;
}

.separator {
  height: 8px;
  background-color: #f5f5f5;
}

/* Logout Button - Now part of scrollable content */
.logout-section {
  background-color: white;
  padding: 16px;
  margin-bottom: 8px;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  background: none;
  border: 1px solid #dc3545;
  border-radius: 8px;
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #fef2f2;
}

.logout-button svg {
  margin-right: 8px;
}

/* Responsive */
@media (max-width: 480px) {
  .mobile-akun-container {
    padding-bottom: 70px;
  }

  .profile-section {
    padding: 24px 16px;
  }

  .profile-photo {
    width: 70px;
    height: 70px;
  }

  .user-name {
    font-size: 16px;
  }

  .user-email {
    font-size: 13px;
  }
}
</style>
