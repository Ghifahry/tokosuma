const products = [
  { id: 1, name: "Buku Premium Tahan Air Dan Api", price: "Rp25.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/24042025082812-50660.png", description: "Buku ini terbuat dari bahan khusus yang tahan air dan api, menjadikannya pilihan sempurna untuk petualangan ekstrem atau penggunaan sehari-hari yang membutuhkan durabilitas tinggi. Desainnya elegan dan ringan, mudah dibawa ke mana saja. Cocok untuk catatan penting, jurnal perjalanan, atau sekadar buku sketsa.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.2 kg", tinggi: "20 cm", lebar: "15 cm", bahan: "Kertas Sintetis" }, reviews: [
    { reviewerName: "Budi Santoso", rating: 5, date: "2024-07-20", comment: "Buku ini sangat inovatif! Tahan air dan api, cocok untuk petualangan saya. Kualitas kertasnya juga bagus." },
    { reviewerName: "Siti Aminah", rating: 4, date: "2024-07-18", comment: "Desainnya elegan, ringan, dan praktis. Sangat membantu untuk mencatat ide-ide di luar ruangan." }
  ], stock: 50 },
  { id: 2, name: "Calender Bisa Di Taruh Di Dinding", price: "Rp30.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/23082023145505-90668.jpg", description: "Kalender dinding multifungsi dengan desain modern dan minimalis. Dilengkapi dengan ruang untuk catatan harian dan penanda tanggal penting. Terbuat dari kertas berkualitas tinggi yang tidak mudah robek. Ideal untuk mengatur jadwal keluarga, kantor, atau sebagai hadiah.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.3 kg", tinggi: "40 cm", lebar: "30 cm", bahan: "Kertas Art Paper" }, reviews: [
    { reviewerName: "Dewi Lestari", rating: 5, date: "2024-07-15", comment: "Kalender ini sangat membantu saya mengatur jadwal. Desainnya juga cantik!" },
    { reviewerName: "Andi Wijaya", rating: 4, date: "2024-07-10", comment: "Kualitas kertas bagus, tapi pengiriman agak lama." }
  ], stock: 50 },
  { id: 3, name: "Gelas Gambar K‑pop Bisa Di Custom", price: "Rp40.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/09092021084017-31752.jpeg", description: "Gelas keramik berkualitas tinggi dengan desain K-pop yang bisa di-custom sesuai keinginanmu! Tambahkan nama bias, lirik lagu favorit, atau gambar grup kesayanganmu. Cocok untuk minuman panas maupun dingin, dan aman dicuci di mesin pencuci piring. Hadiah sempurna untuk para penggemar K-pop.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.4 kg", tinggi: "10 cm", diameter: "8 cm", bahan: "Keramik" }, reviews: [
    { reviewerName: "Rina Fitri", rating: 5, date: "2024-07-22", comment: "Gelasnya lucu banget! Bisa custom gambar bias, jadi makin semangat minum." },
    { reviewerName: "Kevin Sanjaya", rating: 4, date: "2024-07-19", comment: "Kualitas cetaknya bagus, tapi pengiriman agak lama." }
  ], stock: 50 },
  { id: 4, name: "New Normal", price: "Rp50.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/02092021160002-80908.jpeg", description: "Buku 'New Normal' membahas adaptasi kehidupan di era pasca-pandemi. Menawarkan panduan praktis dan wawasan mendalam tentang perubahan sosial, ekonomi, dan psikologis yang terjadi. Wajib dibaca bagi siapa saja yang ingin memahami dan menavigasi tantangan serta peluang di dunia yang terus berubah ini.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.3 kg", tinggi: "21 cm", lebar: "14 cm", halaman: "250" }, reviews: [
    { reviewerName: "Putri Indah", rating: 5, date: "2024-07-21", comment: "Buku yang sangat relevan dengan kondisi saat ini. Banyak insight baru!" },
    { reviewerName: "Bayu Prakoso", rating: 4, date: "2024-07-17", comment: "Isinya bagus, tapi covernya kurang menarik." }
  ], stock: 50 },
  { id: 5, name: "Buku Tulis Campus", price: "Rp15.000", image: "https://tokosuma.co.id/../toko-suma/storage/app/public/thumbnail/29062022094902-28336.jpeg", description: "Buku tulis Campus dengan sampul tebal dan kertas berkualitas tinggi, cocok untuk mahasiswa dan pelajar. Tersedia dalam berbagai ukuran dan garis. Kertasnya halus, nyaman untuk menulis dengan pena atau pensil, dan tidak mudah tembus. Pilihan ideal untuk mencatat kuliah, membuat rangkuman, atau mengerjakan tugas.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.15 kg", tinggi: "25 cm", lebar: "18 cm", jumlah_lembar: "50" }, reviews: [
    { reviewerName: "Fajar Nugraha", rating: 5, date: "2024-07-16", comment: "Buku tulisnya bagus, kertasnya tebal, nyaman buat nulis." },
    { reviewerName: "Citra Dewi", rating: 4, date: "2024-07-14", comment: "Lumayan, tapi sampulnya gampang lecek." }
  ], stock: 50 },
  {
    id: 6,
    name: "Seni Mengolah Emosi",
    price: "Rp75.000",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/items/9786230300271_KETIKA_SARAH_MARAH.jpg",
    description: "Buku 'Seni Mengolah Emosi' adalah panduan komprehensif untuk memahami, menerima, dan mengelola emosi secara sehat. Ditulis dengan bahasa yang mudah dicerna, buku ini menawarkan teknik praktis dan studi kasus yang relevan untuk membantu Anda mencapai keseimbangan emosional dan meningkatkan kualitas hidup. Pelajari cara mengubah emosi negatif menjadi kekuatan positif, membangun hubungan yang lebih baik, dan menemukan kedamaian batin. Sangat direkomendasikan bagi siapa saja yang ingin mengembangkan kecerdasan emosional.",
    soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.4 kg", tinggi: "20 cm", lebar: "13 cm", halaman: "300" }, reviews: [
      { reviewerName: "Dian Permata", rating: 5, date: "2024-07-23", comment: "Buku ini mengubah cara pandang saya tentang emosi. Sangat mencerahkan!" },
      { reviewerName: "Rio Pratama", rating: 4, date: "2024-07-20", comment: "Isinya bagus, tapi butuh waktu untuk mencerna semua informasinya." }
    ],
    stock: 50,
  },
  { id: 7, name: "Seprosi Mie Ayam Sebelum Mati", price: "Rp120.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/products/95ob5m98ur.jpg", description: "Novel 'Seporsi Mie Ayam Sebelum Mati' adalah kisah yang menyentuh hati tentang perjalanan seorang individu dalam menghadapi hidup dan kematian, dengan mie ayam sebagai metafora. Cerita ini penuh dengan refleksi mendalam, humor gelap, dan karakter yang relatable. Mengajak pembaca untuk merenungkan makna kehidupan, persahabatan, dan warisan yang ditinggalkan. Sebuah bacaan yang akan membuat Anda tertawa, menangis, dan berpikir.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.35 kg", tinggi: "20 cm", lebar: "13 cm", halaman: "280" }, reviews: [
    { reviewerName: "Agus Setiawan", rating: 5, date: "2024-07-19", comment: "Novel yang sangat menyentuh dan penuh makna. Rekomendasi banget!" },
    { reviewerName: "Maya Sari", rating: 4, date: "2024-07-16", comment: "Ceritanya bagus, tapi ada beberapa bagian yang bikin sedih." }
  ], stock: 50 },
  {
    id: 8,
    name: "Sisi Tergelap Surga",
    price: "Rp200.000",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/10/30/debsfyx6tcwnvbwdteeakv.jpg",
    description: "Buku 'Sisi Tergelap Surga' adalah eksplorasi mendalam tentang sisi-sisi tersembunyi dari konsep surga dalam berbagai kepercayaan dan mitologi. Penulis mengajak pembaca untuk mempertanyakan narasi konvensional dan melihat surga dari perspektif yang lebih kompleks dan filosofis. Sebuah karya yang provokatif dan mencerahkan, cocok bagi mereka yang tertarik pada teologi, filsafat, dan studi perbandingan agama. Buku ini akan membuka wawasan baru dan memicu diskusi yang menarik.",
    soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.45 kg", tinggi: "22 cm", lebar: "15 cm", halaman: "350" }, reviews: [
      { reviewerName: "Fahmi Rahman", rating: 5, date: "2024-07-24", comment: "Buku ini membuka wawasan saya tentang surga dari sudut pandang yang berbeda. Sangat direkomendasikan!" },
      { reviewerName: "Lina Susanti", rating: 4, date: "2024-07-21", comment: "Cukup berat untuk dibaca, tapi isinya sangat berbobot." }
    ],
    stock: 50,
  },
  { id: 9, name: "Tas Mclaren", price: "Rp700.000", image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/items/208090415-3.png", description: "Tas ransel McLaren resmi, dirancang dengan material premium dan detail yang terinspirasi dari mobil balap Formula 1. Tahan air, ringan, dan memiliki banyak kompartimen untuk menyimpan laptop, tablet, dan perlengkapan lainnya. Ideal untuk penggemar otomotif, perjalanan, atau penggunaan sehari-hari yang stylish.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.8 kg", tinggi: "45 cm", lebar: "30 cm", kapasitas: "25 L", bahan: "Polyester" }, reviews: [
    { reviewerName: "Gilang Dirga", rating: 5, date: "2024-07-20", comment: "Tasnya keren banget! Kualitas premium, cocok buat penggemar F1." },
    { reviewerName: "Dina Amelia", rating: 4, date: "2024-07-17", comment: "Desainnya bagus, tapi harganya lumayan." }
  ], stock: 50 },
  { id: 10, name: "Tas Jansport", price: "Rp200.000", image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/208090417-3.png", description: "Tas ransel Jansport klasik, dikenal karena durabilitas dan desainnya yang timeless. Terbuat dari bahan berkualitas tinggi, tahan lama, dan nyaman dipakai. Cocok untuk sekolah, kuliah, atau aktivitas sehari-hari. Tersedia dalam berbagai warna dan motif untuk menyesuaikan gaya pribadimu.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "0.6 kg", tinggi: "42 cm", lebar: "33 cm", kapasitas: "20 L", bahan: "Cordura" }, reviews: [
    { reviewerName: "Rizky Pratama", rating: 5, date: "2024-07-18", comment: "Tas Jansport memang tidak pernah mengecewakan. Kuat dan nyaman dipakai." },
    { reviewerName: "Sarah Wijaya", rating: 4, date: "2024-07-15", comment: "Warnanya bagus, tapi ukurannya agak kecil untuk bawa banyak buku." }
  ], stock: 50 },
  { id: 11, name: "Tas Mechanical", price: "Rp450.000", image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/HAPPY_RED_BLACK_2HYBvws.png", description: "Tas ransel dengan desain industrial dan fitur mekanis yang unik. Dilengkapi dengan kompartimen khusus untuk alat-alat, laptop, dan barang-barang penting lainnya. Materialnya kuat dan tahan banting, cocok untuk pekerja kreatif, teknisi, atau siapa saja yang membutuhkan tas fungsional dengan gaya yang berbeda.", soldCount: 10, rating: { value: 4.5, count: 20 }, details: { berat: "1.2 kg", tinggi: "50 cm", lebar: "35 cm", kapasitas: "30 L", bahan: "Nylon Balistik" }, reviews: [
    { reviewerName: "Joko Susilo", rating: 5, date: "2024-07-22", comment: "Tasnya sangat fungsional dan desainnya unik. Cocok untuk pekerjaan saya." },
    { reviewerName: "Maria Ulfa", rating: 4, date: "2024-07-19", comment: "Agak berat, tapi kualitasnya sangat bagus." }
  ], stock: 50 },
];

export default products;
