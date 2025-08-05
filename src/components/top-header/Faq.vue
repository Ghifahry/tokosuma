<template>
  <div>
    <div class="faq-container">
      <h1>Frequently Asked Questions (FAQ)</h1>
      <div class="faq-item" v-for="(item, index) in faqs" :key="index">
        <div class="faq-question" @click="toggle(index)">
          <span>{{ item.question }}</span>
          <span class="faq-icon">{{ activeIndex === index ? '-' : '+' }}</span>
        </div>
        <div class="faq-answer" v-show="activeIndex === index">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import { faqData } from '@/data/top-header/data.js';

export default {
  name: 'Faq',
  components: {
    Footer
  },
  data() {
    return {
      activeIndex: null,
      faqs: faqData
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  }
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 6rem auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.faq-item {
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: 600;
  color: #555;
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.faq-answer {
  padding: 0 1rem 1rem;
  color: #666;
  line-height: 1.6;
}
</style>

