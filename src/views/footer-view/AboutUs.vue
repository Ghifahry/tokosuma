<template>
  <div class="about-page">
    <!-- Judul Tengah -->
    <h1 class="about-title">ABOUT US</h1>

    <!-- Konten About -->
    <div class="about-content">
      <!-- Logo Tokosuma -->
      <div class="about-image">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/suma.png" alt="Logo Tokosuma" class="logo-img" />
      </div>

      <!-- Deskripsi Tokosuma -->
      <div class="about-description">
        <h1>TOKO SUMA</h1>
        <p>Belanja & Cetak Online #dariRumahAja dengan Mudah. Tokosuma memberikan kemudahan dalam membuat kebutuhan personal maupun untuk usaha Anda yang lebih spesial.</p>
        <p>
          Tokosuma merupakan online store yang hadir memenuhi kebutuhan alat tulis, produk-produk custom maupun produk digital printing yang bisa mudah dipesan secara online. Tokosuma sangat mengedepankan kualitas produk dengan menggunakan
          material dan teknologi cetak printing terbaik.
        </p>
        <p>Dengan pengalaman lebih dari 20 tahun, kami memahami bahwa setiap ide memiliki potensi untuk menjadi sebuah trobosan dan layak untuk dikembangkan.</p>
        <p>
          Tokosuma juga memberikan jasa cetak online yang lebih mudah, cepat dan murah dengan menggunakan desain custom yang Anda miliki, sehingga Anda tidak perlu repot keluar ruangan, buang waktu, dan antri berjam-jam lagi hanya untuk
          pergi ke tempat percetakan.
        </p>
        <p>Anda yang ingin cetak desain custom untuk bisnis personal atau kebutuhan lainnya juga diberikan layanan desain dengan tim desain yang profesional di bidangnya.</p>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "AboutPage",
  components: {
    Footer,
  },
};
</script>

<style scoped>
.about-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  color: #333;
  min-height: 100vh;
}

.about-title {
  font-size: 36px;
  font-weight: normal;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.about-content {
  display: flex;
  padding: 20px 40px;
  gap: 60px;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.about-image {
  flex: 0 0 500px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: -20px; /* Menyatu dengan sidebar */
}

.logo-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  margin-top: -30px; /* Menyesuaikan dengan sidebar */
}

.about-description {
  flex: 1;
  min-width: 0;
  padding-right: 40px;
}

.about-description h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.about-description p {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 15px;
  text-align: justify;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .about-image {
    flex: 0 0 400px;
  }
}

@media (max-width: 992px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .about-image {
    flex: 0 0 auto;
    width: 100%;
    max-width: 450px;
    margin-left: 0;
    justify-content: center;
  }

  .logo-img {
    margin-top: 0;
  }

  .about-description {
    padding-right: 0;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .about-title {
    font-size: 28px;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .about-description h1 {
    font-size: 24px;
  }

  .about-description p {
    font-size: 15px;
  }
}
</style>
