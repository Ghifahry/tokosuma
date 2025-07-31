<template>
    <div class="about-page">
      <!-- Judul Tengah -->
      <h1 class="about-title">CARA PEMESANAN</h1>
  
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
            Belanja & Cetak Online #dariRumahAja dengan Mudah. Tokosuma memberikan kemudahan dalam memenuhi kebutuhan alat tulis, produk custom, serta cetakan digital printing secara online.
          </p>
          
          <p><strong>1. Pilih Produk</strong><br />
            Telusuri katalog produk Tokosuma dan klik produk yang diinginkan untuk melihat detailnya, termasuk harga, berat, dan ketersediaan.
          </p>
          
          <p><strong>2. Tambahkan ke Keranjang</strong><br />
            Klik tombol "Tambah ke Keranjang" untuk melanjutkan belanja atau "Beli Sekarang" jika ingin langsung melakukan pembayaran.
          </p>
          
          <p><strong>3. Isi Data Pengiriman</strong><br />
            Masukkan informasi pengiriman secara lengkap dan benar, termasuk nama, alamat, dan nomor HP yang aktif.
          </p>
          
          <p><strong>4. Pilih Metode Pembayaran</strong><br />
            Kami menyediakan berbagai metode pembayaran seperti transfer bank, e-wallet, dan pembayaran COD untuk area tertentu.
          </p>
          
          <p><strong>5. Konfirmasi dan Proses Pesanan</strong><br />
            Setelah melakukan pembayaran, pesanan akan segera kami proses. Anda akan menerima notifikasi status pemesanan melalui email atau WhatsApp.
          </p>
          
          <p><strong>6. Pengiriman Produk</strong><br />
            Produk dikirim menggunakan ekspedisi terpercaya. Nomor resi akan diberikan untuk memudahkan pelacakan pesanan.
          </p>
          
          <p><strong>7. Terima & Beri Ulasan</strong><br />
            Setelah produk sampai, Anda dapat memberikan ulasan sebagai bentuk dukungan dan masukan untuk layanan kami.
          </p>
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
    flex-wrap: wrap;
    padding: 20px;
    gap: 30px;
    align-items: flex-start;
    justify-content: center;
  }
  
  .about-image {
    flex: 1 1 350px;
    display: flex;
    justify-content: center;
  }
  
  .about-image img {
    width: 100%;
    max-width: 450px;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
  }
  
  .about-description {
    flex: 2 1 500px;
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
  </style>