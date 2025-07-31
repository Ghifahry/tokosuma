<template>
    <div class="about-page">
      <!-- Judul Tengah -->
      <h1 class="about-title">CARA PEMBAYARAN</h1>
  
      <!-- Konten Cara Pembayaran -->
      <div class="about-content">
        <!-- Logo Tokosuma -->
        <div class="about-image">
          <img
            src="https://tokosuma.co.id/assets/images/layout-5/logo/suma.png"
            alt="Logo Tokosuma"
            class="logo-img"
          />
        </div>
  
        <!-- Deskripsi Cara Pembayaran -->
        <div class="about-description">
          <h1>TOKO SUMA</h1>
          <p>
            Tokosuma memberikan kemudahan dalam bertransaksi secara online.
            Ikuti langkah-langkah berikut untuk menyelesaikan pembayaran:
          </p>
  
          <ol>
            <li><strong>Pilih produk</strong> yang ingin dibeli dan masukkan ke keranjang.</li>
            <li>Periksa kembali pesanan Anda di halaman checkout.</li>
            <li>Isi informasi pengiriman secara lengkap dan benar.</li>
            <li>
              Pilih <strong>metode pembayaran</strong> yang tersedia seperti:
              <ul>
                <li>Transfer Bank (BCA, BRI, Mandiri, dll)</li>
                <li>E-Wallet (OVO, Dana, GoPay)</li>
                <li>QRIS</li>
                <li>COD (untuk area tertentu)</li>
              </ul>
            </li>
            <li>Lakukan pembayaran sesuai instruksi yang ditampilkan.</li>
            <li>Kami akan memverifikasi pembayaran Anda secara otomatis atau manual.</li>
            <li>Pesanan akan segera diproses dan dikirim ke alamat tujuan.</li>
          </ol>
  
          <p>Jika mengalami kendala dalam pembayaran, silakan hubungi admin Tokosuma melalui WhatsApp yang tersedia.</p>
        </div>
      </div>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from "@/components/Footer.vue";

  
  export default {
    name: "CaraPembayaran",
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
  
  .about-description ol {
    padding-left: 20px;
    margin-top: 10px;
  }
  
  .about-description ul {
    list-style-type: disc;
    padding-left: 20px;
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