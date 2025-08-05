import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export function useCart() {
  const cartItemCount = ref(0);
  const router = useRouter();

  const loadCartItemCount = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItemCount.value = cartItems.length;
    } else {
      cartItemCount.value = 0;
    }
  };

  const navigateToCart = () => {
    router.push("/cart");
  };

  // Initialize immediately if localStorage is available
  if (typeof localStorage !== "undefined") {
    loadCartItemCount();
  }

  onMounted(() => {
    loadCartItemCount();
    window.addEventListener("storage", loadCartItemCount);
    window.addEventListener("cartUpdated", loadCartItemCount);
  });

  onUnmounted(() => {
    window.removeEventListener("storage", loadCartItemCount);
    window.removeEventListener("cartUpdated", loadCartItemCount);
  });

  return {
    cartItemCount,
    loadCartItemCount,
    navigateToCart,
  };
}
