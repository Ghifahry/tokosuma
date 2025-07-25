<template>
  <section class="account-layout">
    <div class="main-content">
      <Sidebar class="mobile-hidden" />
      <div class="account-content">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <BottomBarAccount class="desktop-hidden" />
    <Footer />
  </section>
</template>

<script setup>
import Sidebar from "@/components/account/Sidebar.vue";
import BottomBarAccount from "@/components/account/BottomBarAccount.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.account-layout {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  padding-top: 90px; /* adjusted offset for fixed navbar height */
}

@media (max-width: 768px) {
  .account-layout {
    padding-top: 60px; /* adjusted offset for fixed navbar height on mobile */
  }
}

.main-content {
  display: flex;
  height: 100%;
  flex-grow: 1;
  /* allow flex children to shrink */
}

.account-content {
  flex: 1;
  padding: 24px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}

.Sidebar {
  flex: 0 0 250px; /* fixed width sidebar */
}

/* ⬇️ Sembunyikan BottomBar di desktop */
.desktop-hidden {
  display: none;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .account-content {
    padding: 16px;
    padding-bottom: 60px; /* agar tidak ketutup BottomBar */
  }

  .desktop-hidden {
    display: flex;
  }
}
</style>
