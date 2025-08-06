<template>
  <ul class="kategori-list">
    <li v-for="category in availableCategories" :key="category.slug">
      <button @click="$emit('navigate-to', `/kategori/${category.slug}`)">
        {{ category.name }}
      </button>
    </li>
    <li><button @click="$emit('navigate-to', '/kategori/totebag')">Tote Bag</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/mug')">Mug & Tumbler</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/sticker')">Sticker</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/phonecase')">Phone Case</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/notebook')">Notebook</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/plakat')">Plakat & Award</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/merch')">Merch Corporate</button></li>
    <li><button @click="$emit('navigate-to', '/kategori/others')">Lain‑lain…</button></li>
  </ul>
</template>

<script>
export default {
  name: "MobileCategoryList",
  props: {
    availableCategories: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["navigate-to"],
};
</script>

<style scoped>
.kategori-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kategori-list li {
  margin: 0;
}

.kategori-list button {
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.kategori-list button:hover {
  border-color: #e85423;
  background: #fff5f2;
  color: #e85423;
}

.kategori-list button:active {
  transform: scale(0.98);
}
</style>
