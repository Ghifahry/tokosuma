<template>
  <nav class="bottom-bar">
    <router-link to="/account/transaksi" class="bottom-link" active-class="active-link">
      <i class="fas fa-shopping-bag"></i>
      <span>Transaksi</span>
    </router-link>
    <router-link to="/account/wishlist" class="bottom-link" active-class="active-link">
      <i class="fas fa-heart"></i>
      <span>Wishlist</span>
    </router-link>
    <router-link to="/account/akun" class="bottom-link" active-class="active-link">
      <i class="fas fa-user"></i>
      <span>Akun</span>
    </router-link>
    <router-link to="/account/ulasan" class="bottom-link" active-class="active-link">
      <i class="fas fa-star"></i>
      <span>Ulasan</span>
    </router-link>
    <router-link to="/account/alamat" class="bottom-link" active-class="active-link">
      <i class="fas fa-map-marker-alt"></i>
      <span>Alamat</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-bar {
  display: none;
}

@media (max-width: 768px) {
  .bottom-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    z-index: 1000;
  }

  .bottom-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #444;
    text-decoration: none;
    font-size: 12px;
  }

  .bottom-link i {
    font-size: 18px;
  }

  .active-link {
    color: #e85423;
  }
}
</style>
