<template>
  <div>
    <div class="contact-us-container">
      <h1>Hubungi Kami</h1>
      <div class="contact-info">
        <div class="info-item" v-for="(item, index) in contactInfo" :key="index">
          <i :class="item.icon"></i>
          <p>{{ item.text }}</p>
        </div>
      </div>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Pesan</label>
          <textarea id="message" v-model="form.message" rows="5" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Kirim Pesan</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { contactInfoData } from "@/data/top-header/data.js";

export default {
  name: "ContactUs",
  components: {
    Footer,
  },
  data() {
    return {
      contactInfo: contactInfoData,
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Di sini Anda dapat menambahkan logika untuk mengirim formulir
      // misalnya, menggunakan axios untuk mengirim data ke backend
      alert("Pesan Anda telah terkirim!");
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.contact-us-container {
  max-width: 800px;
  margin: 6rem auto;
  padding: 2rem;
  font-family: "Poppins", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.contact-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  text-align: center;
}

.info-item {
  flex: 1;
}

.info-item i {
  font-size: 2rem;
  color: #e85423;
  margin-bottom: 0.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: #e85423;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #d44a1e;
}
</style>
