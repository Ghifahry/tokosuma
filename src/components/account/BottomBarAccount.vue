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
/* Mobile Bottom Navigation */
.bottom-bar {
  display: none;
}

@media (max-width: 768px) {
  .bottom-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px 0 8px;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .bottom-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #666;
    text-decoration: none;
    font-size: 11px;
    font-weight: 500;
    transition: all 0.2s ease;
    padding: 4px 8px;
    border-radius: 8px;
    min-width: 60px;
  }

  .bottom-link:hover {
    color: #e85423;
    background-color: #fff5f2;
  }

  .bottom-link i {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .bottom-link span {
    line-height: 1.2;
  }

  .active-link {
    color: #e85423;
    background-color: #fff5f2;
  }
}
</style>
