<template>
  <footer class="footer">
    <div v-if="!usePrevious" class="footer-content">
      <div class="footer-logo-section">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/suma.png" alt="TokoSuma Logo" class="footer-logo" />
        <p>Dapatkan Kemudahan Mencetak Untuk Semua Kebutuhan Produk Custom Anda, Bersiaplah, Menyaksikan Ide Anda Menjadi Kenyataan.</p>
      </div>
      <div class="footer-links-section">
        <div class="footer-column">
          <h4>INFORMATION</h4>
          <ul>
            <li><router-link to="/about-us" class="active-link">About Us</router-link></li>
            <li><router-link to="/syarat-ketentuan">Syarat & Ketentuan</router-link></li>
            <li><router-link to="/cara-pemesanan">Cara Pemesanan</router-link></li>
            <li><router-link to="/cara-pembayaran">Cara Pembayaran</router-link></li>
            <li><router-link to="/account/akun">Akun</router-link></li>
            <li><router-link to="/kebijakan-privasi">Kebijakan Privasi</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>CONTACT US</h4>
          <p><strong class="highlighted-label">Toko Kami :</strong></p>
          <ul>
            <li>Office: PT. Gelora Aksara Pratama Jl. H. Baping Raya No.100 Ciracas Jakarta-Timur, 13740 - Indonesia</li>
            <li>Call Us: (021) 8710060 Ext 183</li>
            <li>Whatsapp: 0878 0168 1340</li>
            <li>Email: Tokosumaofficial@Gmail.com</li>
            <li>Jam Kerja: Senin - Jum'at: 8:00 - 16:00</li>
            <li>Sabtu: 8:00 - 13:00</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- New footer bottom detail section -->
    <div class="footer-bottom-detail">
      <div class="footer-follow-us">
        <span>FOLLOW US</span>
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="social-icon facebook">f</a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" class="social-icon twitter">t</a>
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="social-icon instagram">i</a>
        </div>
      </div>
      <div class="footer-copyright">COPYRIGHT © 2025 TOKO SUMA</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    usePrevious: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 30px 40px;
  background-color: #fff !important;
  font-size: 14px;
  color: #666;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border-top: 1px solid #ddd;
}

.footer-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-logo-section {
  flex: 1;
  max-width: 300px;
}

.footer-logo {
  width: 250px;
  height: auto;
  margin-bottom: 12px;
}

.footer-logo-section p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.footer-links-section {
  flex: 2;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-column {
  flex: 1;
  min-width: 220px;
}

.footer-column h4 {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
  border-bottom: 2px solid #00aaff;
  padding-bottom: 4px;
  text-transform: uppercase;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #666;
}

.footer-column ul li {
  margin-bottom: 8px;
  font-size: 14px;
}

.footer-column ul li a {
  color: #666;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.footer-column p strong {
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  display: block;
}

.active-link {
  color: #000;
  border-bottom: 2px solid #00aaff;
  padding-bottom: 2px;
  font-weight: 700;
}

.highlighted-label {
  color: #000;
  border-bottom: 2px solid #00aaff;
  padding-bottom: 2px;
  font-weight: 700;
}

.previous-footer-placeholder {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 40px 0;
}

.footer-bottom-detail {
  width: 100%;
  text-align: center;
  margin-top: 40px;
  color: #999;
  font-size: 14px;
}

.footer-follow-us {
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #999;
}

.social-icons {
  display: inline-flex;
  gap: 15px;
  margin-top: 5px;
}

.social-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background-color: #ddd;
  color: #666;
  text-align: center;
  font-weight: bold;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 18px;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
  background-color: #00aaff;
  color: #fff;
}

.social-icon.facebook {
  background-color: #3b5998;
  color: #fff;
}

.social-icon.twitter {
  background-color: #1da1f2;
  color: #fff;
}

.social-icon.instagram {
  background-color: #e4405f;
  color: #fff;
}

@media (max-width: 768px) {
  .footer {
    padding: 20px;
  }

  .footer-content {
    flex-direction: column;
    gap: 20px;
  }

  .footer-links-section {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
