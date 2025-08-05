<template>
  <div class="search">
    <i class="fas fa-search search-icon"></i>
    <input type="text" placeholder="Cari Produk atau Judul Buku...." v-model="searchQuery" @keyup.enter="searchProducts" @input="handleSearchInput" @focus="showSearchSuggestions = true" @blur="handleSearchBlur" ref="searchInput" />

    <!-- Search Suggestions Dropdown -->
    <transition name="zoom-fade">
      <div v-if="showSearchSuggestions && searchSuggestions.length > 0" class="search-suggestions" @click.stop>
        <ul class="suggestions-list">
          <li v-for="suggestion in searchSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)" class="suggestion-item">
            <div class="suggestion-content">
              <i class="fas fa-search suggestion-icon"></i>
              <div class="suggestion-details">
                <div class="suggestion-name">{{ suggestion }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useSearch } from "@/composables/useSearch";

const { searchQuery, showSearchSuggestions, searchSuggestions, handleSearchInput, handleSearchBlur, selectSuggestion, searchProducts } = useSearch();
</script>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #aaa;
  font-size: 0.85rem;
}

.search input {
  padding: 0.25rem 1rem 0.25rem 2rem;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 400px;
  height: 45px;
  font-size: 0.85rem;
}

/* Search Suggestions Styles */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  margin-top: 5px;
  max-height: 400px;
  overflow-y: auto;
}

.suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestion-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.suggestion-icon {
  color: #e85423;
  font-size: 0.9rem;
  width: 16px;
  text-align: center;
}

.suggestion-details {
  flex: 1;
}

.suggestion-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
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
  .search {
    flex: 1;
    min-width: 175px;
  }

  .search input {
    width: 100%;
    padding: 0.4rem 1.5rem 0.4rem 1.8rem;
    font-size: 0.75rem;
    height: 38px;
    box-sizing: border-box;
  }

  .search-suggestions {
    width: 100%;
    max-height: 300px;
  }

  .suggestion-content {
    padding: 10px 12px;
  }

  .suggestion-icon {
    font-size: 0.8rem;
    width: 14px;
  }

  .suggestion-name {
    font-size: 0.8rem;
  }
}
</style>
