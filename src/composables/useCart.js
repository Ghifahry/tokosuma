import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export function useCart() {
  const cartItemCount = ref(0);
  const router = useRouter();

  const loadCart = () => {
    const cart = cartAPI.getCart();
    cartItems.value = cart;
    cartItemCount.value = cartAPI.getItemCount();
    cartTotal.value = cartAPI.getTotal();
  };

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

  // Function untuk mengecek status login
  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn;
  };

  // Function untuk redirect ke login dengan pesan
  const redirectToLogin = (message = "Silakan login terlebih dahulu untuk melanjutkan") => {
    // Simpan pesan untuk ditampilkan di halaman login
    localStorage.setItem("loginRedirectMessage", message);
    router.push("/login");
  };

  // Function untuk menambah ke cart dengan validasi login
  const addToCartWithAuth = (product, quantity = 1) => {
    if (!checkLoginStatus()) {
      redirectToLogin("Silakan login terlebih dahulu untuk menambahkan produk ke keranjang");
      return false;
    }

    // Proses add to cart
    const cartItem = {
      id: Date.now(),
      name: product.name,
      variant: product.variant || null,
      price: parseFloat(product.price.replace(/[^\d]/g, "")),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice.replace(/[^\d]/g, "")) : null,
      quantity: quantity,
      stock: product.stock,
      image: product.image,
      store: product.store || "TokoSuma Official Store",
      selected: false,
    };

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.name === cartItem.name && item.variant === cartItem.variant);

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Add new item
      cart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    loadCartItemCount();

    // Dispatch event to update cart count in header
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    return true;
  };

  // Function untuk checkout dengan validasi login
  const checkoutWithAuth = () => {
    if (!checkLoginStatus()) {
      redirectToLogin("Silakan login terlebih dahulu untuk melakukan checkout");
      return false;
    }

    // Check if cart has items
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      alert("Keranjang belanja kosong");
      return false;
    }

    const cartItems = JSON.parse(savedCart);
    if (cartItems.length === 0) {
      alert("Keranjang belanja kosong");
      return false;
    }

    // Navigate to checkout
    router.push("/payment-details");
    return true;
  };

  // Function untuk beli sekarang dengan validasi login
  const buyNowWithAuth = (product, quantity = 1) => {
    if (!checkLoginStatus()) {
      redirectToLogin("Silakan login terlebih dahulu untuk membeli produk");
      return false;
    }

    // Add to cart first
    const added = addToCartWithAuth(product, quantity);
    if (added) {
      // Navigate to checkout
      router.push("/payment-details");
      return true;
    }
    return false;
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
    checkLoginStatus,
    redirectToLogin,
    addToCartWithAuth,
    checkoutWithAuth,
    buyNowWithAuth,
  };
}
