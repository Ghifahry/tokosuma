import { ref } from "vue";
import products from "@/data/products.js";

export function useSearch() {
  const searchQuery = ref("");
  const showSearchSuggestions = ref(false);
  const searchSuggestions = ref([]);
  const searchTimeout = ref(null);

  const keywordSuggestions = [
    "buku",
    "novel",
    "tas",
    "sekolah",
    "kalender",
    "alat tulis",
    "pulpen",
    "pensil",
    "notebook",
    "mug",
    "tumbler",
    "gelas",
    "sticker",
    "phone case",
    "plakat",
    "award",
    "merch",
    "corporate",
    "back to school",
    "perlengkapan sekolah",
    "buku novel",
    "tas sekolah",
    "kalender 2024",
    "set alat tulis",
    "mug custom",
    "tumbler stainless",
    "sticker vinyl",
    "case hp",
    "plakat acrylic",
    "merchandise",
  ];

  const generateSearchSuggestions = () => {
    if (!searchQuery.value.trim()) {
      searchSuggestions.value = [];
      return;
    }

    const query = searchQuery.value.toLowerCase();
    const filteredKeywords = keywordSuggestions.filter((keyword) => keyword.toLowerCase().includes(query));

    filteredKeywords.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      if (aLower === query && bLower !== query) return -1;
      if (bLower === query && aLower !== query) return 1;
      if (aLower.startsWith(query) && !bLower.startsWith(query)) return -1;
      if (bLower.startsWith(query) && !aLower.startsWith(query)) return 1;

      return aLower.localeCompare(bLower);
    });

    searchSuggestions.value = filteredKeywords.slice(0, 8);
  };

  const handleSearchInput = () => {
    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value);
    }

    searchTimeout.value = setTimeout(() => {
      generateSearchSuggestions();
    }, 300);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      showSearchSuggestions.value = false;
    }, 200);
  };

  const selectSuggestion = (suggestion) => {
    searchQuery.value = suggestion;
    showSearchSuggestions.value = false;
    searchProducts();
  };

  const searchProducts = () => {
    if (!searchQuery.value.trim()) return;

    localStorage.setItem("searchQuery", searchQuery.value);

    const filteredProducts = products.filter((product) => {
      const query = searchQuery.value.toLowerCase();
      return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    });

    localStorage.setItem("searchResults", JSON.stringify(filteredProducts));

    // Use router instead of window.location.href for better navigation
    if (typeof window !== "undefined" && window.location) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`;
    }
  };

  const clearSearch = () => {
    searchQuery.value = "";
    searchSuggestions.value = [];
    showSearchSuggestions.value = false;
  };

  return {
    searchQuery,
    showSearchSuggestions,
    searchSuggestions,
    searchTimeout,
    handleSearchInput,
    handleSearchBlur,
    selectSuggestion,
    searchProducts,
    clearSearch,
  };
}
