<template>
  <div class="header">
    <button @click="$emit('go-back')" class="back-button">
      <i class="fas fa-arrow-left"></i>
    </button>
    <h1>Kategori</h1>
  </div>
</template>

<script>
export default {
  name: "MobileCategoryHeader",
  emits: ["go-back"],
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #f0f0f0;
}

.header h1 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}
</style>
