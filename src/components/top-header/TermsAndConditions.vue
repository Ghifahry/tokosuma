<template>
  <div>
    <div class="terms-container">
      <h1>{{ terms.title }}</h1>
      <div class="terms-content" v-for="(section, index) in terms.sections" :key="index">
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import { termsData } from '@/data/top-header/data.js';

export default {
  name: 'TermsAndConditions',
  components: {
    Footer
  },
  data() {
    return {
      terms: termsData
    };
  }
};
</script>

<style scoped>
.terms-container {
  max-width: 800px;
  margin: 6rem auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.terms-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #e85423;
}

.terms-content p {
  margin-bottom: 1rem;
  text-align: justify;
}
</style>
