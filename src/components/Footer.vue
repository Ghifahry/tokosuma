<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <router-link to="/" class="logo">
          <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" />
        </router-link>
        <p class="company-info">© 2024 Toko Suma. All rights reserved.</p>
      </div>
      <div class="footer-right">
        <a href="https://www.instagram.com/tokosuma" target="_blank" rel="noopener" aria-label="Instagram" class="social-icon">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/tokosuma" target="_blank" rel="noopener" aria-label="Facebook" class="social-icon">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/tokosuma" target="_blank" rel="noopener" aria-label="Twitter" class="social-icon">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
.footer {
  background-color: #fff;
  color: #333;
  padding: 20px 16px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 10;
}

.footer-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  width: 110px;
}

.company-info {
  color: #666;
  font-size: 0.9rem;
}

.footer-right {
  display: flex;
  gap: 1rem;
}

.social-icon {
  color: #e85423;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  color: #c6481d;
}

@media (max-width: 768px) {
  .footer {
    display: none;
  }
}

/* Responsive for mobile */
@media (max-width: 480px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-left {
    flex-direction: column;
    gap: 0.5rem;
  }

  .logo img {
    width: 90px;
  }
}
</style>
