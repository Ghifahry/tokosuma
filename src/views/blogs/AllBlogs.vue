<template>
  <div class="blogs-container">
    <CustomSidebar @sidebar-toggle="handleSidebarToggle" />

    <div class="blogs-main">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">TokoSuma Blog</h1>

          <!-- Search and Filter Bar -->
          <div class="search-filter-bar">
            <div class="search-container">
              <i class="fas fa-search search-icon"></i>
              <input type="text" v-model="searchQuery" placeholder="Cari artikel..." class="search-input" @input="filterBlogs" />
            </div>

            <div class="filter-container">
              <select v-model="selectedCategory" @change="filterBlogs" class="category-select">
                <option value="">Semua Kategori</option>
                <option value="musik">Musik</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="hiburan">Hiburan</option>
                <option value="teknologi">Teknologi</option>
                <option value="berita">Berita</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Grid Section -->
      <section class="blog-section">
        <div class="section-header">
          <h2 class="section-title">{{ filteredBlogs.length }} Artikel Ditemukan</h2>
          <div class="view-options">
            <button class="view-btn" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
              <i class="fas fa-th"></i>
            </button>
            <button class="view-btn" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>

        <!-- Blog Cards -->
        <div class="blog-grid" :class="viewMode">
          <article v-for="blog in filteredBlogs" :key="blog.id" class="blog-card" @click="navigateTo(blog.path)">
            <div class="card-image">
              <img :src="blog.image" :alt="blog.title" loading="lazy" />
              <div class="card-overlay">
                <span class="category-badge">{{ blog.category }}</span>
                <button class="read-btn">
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div class="card-content">
              <div class="card-meta">
                <span class="publish-date">
                  <i class="far fa-calendar-alt"></i>
                  {{ blog.date }}
                </span>
                <span class="read-time">
                  <i class="far fa-clock"></i>
                  {{ blog.readTime }}
                </span>
              </div>

              <h3 class="card-title">{{ blog.title }}</h3>
              <p class="card-excerpt">{{ blog.excerpt }}</p>

              <div class="card-footer">
                <div class="author">
                  <img :src="blog.author.avatar" :alt="blog.author.name" class="author-avatar" />
                  <span class="author-name">{{ blog.author.name }}</span>
                </div>
                <div class="card-stats">
                  <span class="stat">
                    <i class="far fa-eye"></i>
                    {{ blog.views }}
                  </span>
                  <span class="stat">
                    <i class="far fa-heart"></i>
                    {{ blog.likes }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div class="load-more-section" v-if="filteredBlogs.length > 0">
          <button class="load-more-btn" @click="loadMore">
            <i class="fas fa-plus"></i>
            Muat Lebih Banyak
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredBlogs.length === 0" class="empty-state">
          <i class="fas fa-search"></i>
          <h3>Tidak ada artikel ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau pilih kategori yang berbeda</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CustomSidebar from "@/components/CustomSidebar.vue";

export default {
  name: "AllBlogs",
  components: {
    CustomSidebar,
  },
  data() {
    return {
      sidebarExpanded: true,
      searchQuery: "",
      selectedCategory: "",
      viewMode: "grid",
      blogs: [
        {
          id: 1,
          title: "Ozzy Osbourne Tutup Usia: Pangeran Kegelapan Itu Akhirnya Pulang ke Altar Abadinya",
          excerpt: "Kehadiran Ozzy Osbourne sebagai Pangeran Kegelapan telah membawa secercah cahaya bagi aliran musik keras. Yuk, ikutin perjalanannya lewat artikel ini!",
          date: "23 Jul 2025",
          readTime: "5 min read",
          image: "https://image.gramedia.net/rs:fit:576:0/plain/https://www.gramedia.com/blog/content/images/2025/07/Desain-tanpa-judul--1--1.jpg",
          path: "/blog1",
          category: "musik",
          views: 1247,
          likes: 89,
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
          },
        },
        {
          id: 2,
          title: "Stimulasi Anak Lewat Bacaan: Tips dan Buku Rekomendasi untuk Si Kecil Biar Makin Kreatif!",
          excerpt: "Buku bacaan ternyata bisa menstimulasi fungsi kognitif anak, lho. Selain itu, masih banyak juga manfaat lainnya. Cek selengkapnya di sini!",
          date: "23 Jul 2025",
          readTime: "8 min read",
          image: "https://www.akudankau.co.id/sites/default/files/2024-07/Peran%20Orangtua%20menstimulasi%20Anak%20Bicara%20untuk%20Mendorong%20Perkembangan%20Bahasanya.jpg",
          path: "/blog2",
          category: "pendidikan",
          views: 2156,
          likes: 156,
          author: {
            name: "Dr. Maria Santos",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          },
        },
        {
          id: 3,
          title: "The Fantastic Four: A First Step, Segera Rilis! Tandai Awal Fase 6 Jagat Sinema Marvel",
          excerpt: "Fantastic Four akan kembali menghiasi layar bioskop, sebagai film yang digarap oleh Marvel Studios. Sekaligus mengawali fase enam di jagat sinematik mereka!",
          date: "22 Jul 2025",
          readTime: "6 min read",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UChG7W-8AxxOiFRRR4ivRnb2sjGK5V6TtQ&s",
          path: "/blog3",
          category: "hiburan",
          views: 3421,
          likes: 234,
          author: {
            name: "Alex Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          },
        },
        {
          id: 4,
          title: "Membuat Keresahan dan Merusak Fasilitas, Sound Horeg Diharamkan Ulama, Banyak Pro Kontra",
          excerpt: "Sound Horeg Diharamkan: Pemerintah Ambil Sikap Tegas demi Ketertiban Publik",
          date: "25 Jul 2025",
          readTime: "4 min read",
          image: "https://cdn-1.timesmedia.co.id/images/2024/05/22/Aksi-Damai.jpg",
          path: "/blog4",
          category: "berita",
          views: 1892,
          likes: 67,
          author: {
            name: "Rina Dewi",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
          },
        },
        {
          id: 5,
          title: "Perang Thailand 2025",
          excerpt: "Thailand Dilanda Konflik Bersenjata: Ketegangan Memuncak di Tahun 2025",
          date: "26 Jul 2025",
          readTime: "7 min read",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKQ_qRcPL3eZCtbaLjdILkGIWmVtan4d7Aw&s",
          path: "/blog5",
          category: "berita",
          views: 4567,
          likes: 312,
          author: {
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
          },
        },
        {
          id: 6,
          title: "Teknologi AI dalam Pendidikan: Masa Depan Pembelajaran yang Lebih Personal",
          excerpt: "Artificial Intelligence mengubah cara kita belajar dan mengajar. Bagaimana AI bisa membuat pendidikan lebih efektif dan personal?",
          date: "27 Jul 2025",
          readTime: "10 min read",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
          path: "/blog6",
          category: "teknologi",
          views: 2987,
          likes: 198,
          author: {
            name: "Prof. Lisa Wang",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
          },
        },
      ],
      filteredBlogs: [],
    };
  },
  mounted() {
    this.filteredBlogs = [...this.blogs];
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    handleSidebarToggle(isExpanded) {
      this.sidebarExpanded = isExpanded;
    },
    filterBlogs() {
      let filtered = [...this.blogs];

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((blog) => blog.title.toLowerCase().includes(query) || blog.excerpt.toLowerCase().includes(query) || blog.author.name.toLowerCase().includes(query));
      }

      // Filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter((blog) => blog.category === this.selectedCategory);
      }

      this.filteredBlogs = filtered;
    },
    loadMore() {
      // Simulate loading more content
      console.log("Loading more blogs...");
    },
  },
};
</script>

<style scoped>
.blogs-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.blogs-main {
  flex: 1;
  padding: 0;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* Search and Filter Bar */
.search-filter-bar {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.search-container {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  -webkit-appearance: none;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.category-select {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  -webkit-appearance: none;
  box-sizing: border-box;
}

.category-select:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Blog Section */
.blog-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  color: white;
  border-color: #667eea;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-grid.grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.blog-grid.list {
  grid-template-columns: 1fr;
}

.blog-grid.list .blog-card {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
}

.blog-grid.list .card-image {
  width: 300px;
  flex-shrink: 0;
}

.blog-grid.list .card-content {
  flex: 1;
}

/* Blog Card */
.blog-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #e6997f00 0%, #cacaca 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

.category-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.read-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-btn:hover {
  transform: scale(1.1);
}

/* Card Content */
.card-content {
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.card-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.card-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.card-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #666;
}

/* Load More Section */
.load-more-section {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  background: linear-gradient(135deg, #e85423 0%, #ed8562 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-state p {
  font-size: 1rem;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .blog-grid.grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-filter-bar {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .blog-grid.grid {
    grid-template-columns: 1fr;
  }

  .blog-grid.list .blog-card {
    flex-direction: column;
  }

  .blog-grid.list .card-image {
    width: 100%;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .search-filter-bar {
    padding: 1rem;
  }

  .blog-section {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .card-content {
    padding: 1rem;
  }

  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
