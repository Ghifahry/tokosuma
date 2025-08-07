<template>
  <div class="about-page">
    <!-- Mobile Header -->
    <FooterViewMobileHeader title="KEBIJAKAN PRIVASI" />

    <!-- Konten Kebijakan Privasi -->
    <div class="about-content">
      <!-- Logo Tokosuma -->
      <div class="about-image">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/suma.png" alt="Logo Tokosuma" class="logo-img" />
      </div>

      <!-- Deskripsi Kebijakan Privasi -->
      <div class="about-description">
        <h1>TOKO SUMA</h1>
        <p>Kami menjaga privasi pelanggan dengan serius dan hanya akan mengumpulkan, merekam, menahan, menyimpan, mengungkapkan, dan menggunakan informasi pribadi Anda seperti yang diuraikan di bawah.</p>
        <p>
          Perlindungan data adalah masalah kepercayaan dan privasi Anda sangat penting bagi kami. Kami hanya akan menggunakan nama Anda dan informasi yang berhubungan dengan Anda sebagaimana yang dinyatakan dalam Kebijakan Privasi berikut.
          Kami hanya akan mengumpulkan informasi yang kami perlukan dan kami hanya akan mengumpulkan informasi yang relevan dengan transaksi antara kami dengan Anda.
        </p>
        <p>Kami hanya akan menyimpan informasi privasi Anda selama diwajibkan oleh hukum atau selama informasi tersebut masih relevan dengan tujuan pengumpulan informasi.</p>
        <p>
          Anda dapat mengunjungi Platform kami (Seperti yang dijelaskan pada Syarat & Ketentuan) dan menjelajahinya tanpa harus memberikan informasi pribadi. Selama kunjungan Anda ke situs kami, identitas Anda akan tetap terjaga dan kami
          tidak akan bisa mengidentifikasi Anda kecuali Anda memiliki akun dalam situs kami dan masuk dengan menggunakan username dan password Anda.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import FooterViewMobileHeader from "@/components/header/FooterViewMobileHeader.vue";

export default {
  name: "KebijakanPrivasi",
  components: {
    Footer,
    FooterViewMobileHeader,
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
}

.logo-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
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
  }

  .about-description {
    padding-right: 0;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .about-description h1 {
    font-size: 24px;
  }

  .about-description p {
    font-size: 15px;
  }
}
</style>
