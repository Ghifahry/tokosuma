<template>
  <div class="toko-suma-blog-container">
    <CustomSidebar @sidebar-toggle="handleSidebarToggle" />

    <div class="toko-suma-blog-page">
      <header class="blog-header">
        <div class="header-content">
          <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Tokosuma Logo" class="header-logo" />
          <h3 class="page-title">Blog & Berita Terkini</h3>
        </div>
      </header>

      <section class="blog-list">
        <div class="blog-card" v-for="blog in blogs" :key="blog.id" @click="navigateTo(blog.path)">
          <img :src="blog.image" :alt="blog.title" class="blog-image" loading="lazy" />
          <div class="blog-content">
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-excerpt">{{ blog.excerpt }}</p>
            <div class="blog-meta">
              <span class="blog-date">{{ blog.date }}</span>
              <span class="read-more">Baca Selengkapnya →</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CustomSidebar from "@/components/CustomSidebar.vue";

export default {
  name: "TokoSumaBlog",
  components: {
    CustomSidebar,
  },
  data() {
    return {
      sidebarExpanded: true,
      blogs: [
        {
          id: 1,
          title: "Ozzy Osbourne Tutup Usia: Pangeran Kegelapan Itu Akhirnya Pulang ke Altar Abadinya",
          excerpt: "Kehadiran Ozzy Osbourne sebagai Pangeran Kegelapan telah membawa secercah cahaya bagi aliran musik keras. Yuk, ikutin perjalanannya lewat artikel ini!",
          date: "23 Jul 2025",
          image: "https://image.gramedia.net/rs:fit:576:0/plain/https://www.gramedia.com/blog/content/images/2025/07/Desain-tanpa-judul--1--1.jpg",
          path: "/blog1",
        },
        {
          id: 2,
          title: "Stimulasi Anak Lewat Bacaan: Tips dan Buku Rekomendasi untuk Si Kecil Biar Makin Kreatif!",
          excerpt: "Buku bacaan ternyata bisa menstimulasi fungsi kognitif anak, lho. Selain itu, masih banyak juga manfaat lainnya. Cek selengkapnya di sini!",
          date: "23 Jul 2025",
          image: "https://www.akudankau.co.id/sites/default/files/2024-07/Peran%20Orangtua%20menstimulasi%20Anak%20Bicara%20untuk%20Mendorong%20Perkembangan%20Bahasanya.jpg",
          path: "/blog2",
        },
        {
          id: 3,
          title: "The Fantastic Four: A First Step, Segera Rilis! Tandai Awal Fase 6 Jagat Sinema Marvel",
          excerpt: "Fantastic Four akan kembali menghiasi layar bioskop, sebagai film yang digarap oleh Marvel Studios. Sekaligus mengawali fase enam di jagat sinematik mereka!",
          date: "22 Jul 2025",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UChG7W-8AxxOiFRRR4ivRnb2sjGK5V6TtQ&s",
          path: "/blog3",
        },
        {
          id: 4,
          title: "Membuat Keresahan dan Merusak Fasilitas, Sound Horeg Diharamkan Ulama, Banyak Pro Kontra",
          excerpt: "Sound Horeg Diharamkan: Pemerintah Ambil Sikap Tegas demi Ketertiban Publik",
          date: "25 Jul 2025",
          image: "https://cdn-1.timesmedia.co.id/images/2024/05/22/Aksi-Damai.jpg",
          path: "/blog4",
        },
        {
          id: 5,
          title: "Perang Thailand 2025",
          excerpt: "Thailand Dilanda Konflik Bersenjata: Ketegangan Memuncak di Tahun 2025",
          date: "26 Jul 2025",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKQ_qRcPL3eZCtbaLjdILkGIWmVtan4d7Aw&s",
          path: "/blog5",
        },
      ],
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    handleSidebarToggle(isExpanded) {
      this.sidebarExpanded = isExpanded;
    },
  },
};
</script>

<style scoped>
.toko-suma-blog-container {
  display: flex;
  font-family: "Poppins", sans-serif;
  color: #333;
  overflow-x: hidden;
}

.toko-suma-blog-page {
  flex: 1;
  padding: 30px;
}

.blog-header {
  margin-bottom: 30px;
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.header-logo {
  height: 70px;
  width: auto;
  margin-bottom: 10px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin: 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
  width: 100%;
  text-align: center;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.blog-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
}

.blog-content {
  padding: 20px;
}

.blog-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #888;
}

.read-more {
  color: #1e88e5;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 1024px) {
  .blog-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-list {
    grid-template-columns: 1fr;
  }

  .header-logo {
    height: 50px;
  }

  .page-title {
    font-size: 20px;
  }
}
</style>
