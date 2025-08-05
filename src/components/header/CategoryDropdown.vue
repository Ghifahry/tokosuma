<template>
  <div class="category-dropdown-container">
    <!-- Desktop Category Button -->
    <div v-if="!isMobile" class="kategori-button-desktop">
      <div class="dropdown" @click="toggleKategori" ref="kategoriDropdownTriggerRef">
        <button class="kategori-btn">
          Kategori
          <i class="fas fa-chevron-down"></i>
        </button>

        <transition name="zoom-fade">
          <div v-if="showKategori" class="dropdown-content kategori-dropdown" @click.stop ref="kategoriDropdownContentRef">
            <!-- Filter & Sort Section -->
            <aside class="filter-sort">
              <h4>Filter</h4>
              <label><input type="checkbox" v-model="filter.terbaru" /> Terbaru</label>
              <label><input type="checkbox" v-model="filter.diskon" /> Diskon</label>

              <h4 class="mt-3">Sort</h4>
              <select v-model="sortBy">
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
                <option value="terlaris">Terlaris</option>
              </select>
            </aside>

            <!-- Category List -->
            <ul class="kategori-list">
              <li v-for="category in availableCategories" :key="category.slug">
                <button @click="navigateTo(`/kategori/${category.slug}`)">
                  {{ category.name }}
                </button>
              </li>
            </ul>

            <button class="btn-continue" :disabled="!hasSelection" @click="applyKategori">Continue</button>
          </div>
        </transition>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useResponsive } from "@/composables/useResponsive";
import products from "@/data/products.js";

const router = useRouter();
const { isMobile } = useResponsive();

const showKategori = ref(false);
const filter = ref({ terbaru: false, diskon: false });
const sortBy = ref("termurah");
const kategoriDropdownTriggerRef = ref(null);

const hasSelection = computed(() => {
  return filter.value.terbaru || filter.value.diskon || sortBy.value !== "termurah";
});

const availableCategories = computed(() => {
  const categories = [];
  const categoryMap = new Map();

  products.forEach((product) => {
    const name = product.name.toLowerCase();

    if (name.includes("buku") || name.includes("novel") || name.includes("calender")) {
      if (!categoryMap.has("buku")) {
        categoryMap.set("buku", { name: "Buku", slug: "buku", count: 0 });
      }
      categoryMap.get("buku").count++;
    }

    if (name.includes("tas") || name.includes("bag")) {
      if (!categoryMap.has("tas")) {
        categoryMap.set("tas", { name: "Tas", slug: "tas", count: 0 });
      }
      categoryMap.get("tas").count++;
    }

    if (name.includes("gelas") || name.includes("mug") || name.includes("tumbler")) {
      if (!categoryMap.has("gelas")) {
        categoryMap.set("gelas", { name: "Gelas & Mug", slug: "gelas", count: 0 });
      }
      categoryMap.get("gelas").count++;
    }

    if (name.includes("kalender") || name.includes("calender")) {
      if (!categoryMap.has("kalender")) {
        categoryMap.set("kalender", { name: "Kalender", slug: "kalender", count: 0 });
      }
      categoryMap.get("kalender").count++;
    }

    if (name.includes("tulis") || name.includes("campus")) {
      if (!categoryMap.has("alat-tulis")) {
        categoryMap.set("alat-tulis", { name: "Alat Tulis", slug: "alat-tulis", count: 0 });
      }
      categoryMap.get("alat-tulis").count++;
    }
  });

  return Array.from(categoryMap.values())
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);
});

const toggleKategori = () => {
  if (showKategori.value) {
    showKategori.value = false;
  } else {
    showKategori.value = true;
  }
};

const closeKategori = () => {
  showKategori.value = false;
};

const navigateTo = (path) => {
  router.push(path);
  showKategori.value = false;
};

const applyKategori = () => {
  console.log("Kategori applied:", { filter: filter.value, sortBy: sortBy.value });
  showKategori.value = false;
};

const handleClickOutside = (event) => {
  if (kategoriDropdownTriggerRef.value && !kategoriDropdownTriggerRef.value.contains(event.target)) {
    showKategori.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.category-dropdown-container {
  display: flex;
  align-items: center;
}

.kategori-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  background: rgb(255, 255, 255);
  color: black;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

.dropdown i.fa-chevron-down {
  font-size: 0.6rem;
  margin-left: 3px;
  vertical-align: middle;
}

.dropdown-content,
.kategori-dropdown {
  position: absolute;
  background: #fff;
  padding: 0.7rem 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  z-index: 999;
  margin-top: 0.2rem;
  font-size: 0.85rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.dropdown-content:hover,
.kategori-dropdown:hover {
  box-shadow: 0 4px 12px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
}

.kategori-dropdown {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  padding: 1rem 1.8rem;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  border-top: 1px solid #eee;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 12px 12px;
  z-index: 998;
}

.kategori-dropdown:hover {
  box-shadow: 0 6px 16px rgba(232, 84, 35, 0.12);
  background-color: #fff8f5;
}

.filter-sort {
  display: flex;
  flex-direction: column;
}

.filter-sort h4 {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.filter-sort label {
  font-weight: 400;
  margin-bottom: 0.3rem;
}

.filter-sort input {
  margin-right: 6px;
}

.kategori-list {
  list-style: none;
  padding: 0;
  margin: 0;
  columns: 2;
  column-gap: 1.5rem;
}

.kategori-list li button {
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.8rem;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  display: block;
}

.kategori-list li button:hover {
  background-color: #fff1ec;
  color: #e85423;
}

.btn-continue {
  margin-top: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 12px;
  border: none;
  background: #e85423;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 3px 6px rgba(232, 84, 35, 0.25);
}

.btn-continue:disabled {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-continue:not(:disabled):hover {
  background: #c6481d;
  box-shadow: 0 5px 10px rgba(198, 72, 29, 0.35);
}

/* Animations */
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .kategori-button-desktop {
    display: none;
  }

  .kategori-dropdown {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
    z-index: 998;
  }

  .kategori-list {
    columns: 1;
  }
}
</style>
