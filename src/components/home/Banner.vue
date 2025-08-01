<template>
  <div class="banner-container">
    <a :href="link" target="_blank" rel="noopener noreferrer">
      <img :src="imageSrc" alt="Promotional Banner" class="banner-image" />
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.banner-container {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  box-sizing: border-box;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .banner-container {
    margin: 0 auto;
    padding: 1rem 1rem;
    width: 100%;
  }
}
</style>
