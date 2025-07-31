<template>
  <div class="about-page">
    <!-- Judul Tengah -->
    <h1 class="about-title">SYARAT & KETENTUAN</h1>

    <!-- Konten Syarat & Ketentuan -->
    <div class="about-content">
      <!-- Logo Tokosuma -->
      <div class="about-image">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/suma.png" alt="Logo Tokosuma" class="logo-img" />
      </div>

      <!-- Deskripsi Syarat & Ketentuan -->
      <div class="about-description">
        <h1>TOKO SUMA</h1>

        <section>
          <h2><strong>Ketentuan Penggunaan</strong></h2>
          <p>
            Terima kasih telah mengunjungi situs bukusekolahku.com. Pada halaman ini akan dijelaskan ketentuan-ketentuan terkait dengan penggunaan bukusekolahku.com. Dengan Anda menggunakan situs ini, maka Anda telah setuju dan tunduk
            kepada Ketentuan Penggunaan situs ini. Bila Anda tidak setuju dengan Ketentuan Penggunaan yang dijelaskan, maka Anda tidak diperkenankan menggunakan situs ini. Ketentuan-ketentuan dalam situs ini dapat ditambahkan, dikurangkan,
            disesuaikan, ataupun diubah kapan pun berdasarkan kebijakan bukusekolahku.com.
          </p>
        </section>

        <section>
          <h2><strong>Hak Cipta</strong></h2>
          <p>
            Semua isi dan konten yang terdapat dalam situs ini merupakan hak cipta bukusekolahku.com dan ditujukan sebagai bagian dari kepemilikan PT Penerbit Erlangga. Penggunaan isi dan konten situs tunduk dan mengacu kepada Ketentuan
            Penggunaan ini. Isi, konten, gambar, suara, dan video dalam situs ini hanya boleh digunakan utuh apa adanya tanpa ada perubahan, untuk kebutuhan penggunaan pribadi dan non-komersial. Dilarang untuk melakukan pengunduhan
            (download) dan penggunaan lainnya yang melanggar Ketentuan Penggunaan.
          </p>
        </section>

        <!-- Other sections remain unchanged -->
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "SyaratKetentuan",
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

.about-description h2 {
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 10px;
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

  .about-description h2 {
    font-size: 18px;
  }

  .about-description p {
    font-size: 15px;
  }
}
</style>
