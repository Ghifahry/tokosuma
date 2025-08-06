<template>
  <div class="cart-container">
    <CustomSidebar @sidebar-toggle="handleSidebarToggle" />

    <div class="cart-main">
      <!-- Cart Header -->
      <CartHeader />

      <div class="cart-content">
        <!-- Left Side - Product List -->
        <CartProductList
          :cart-items="cartItems"
          :select-all="selectAll"
          :has-selected-items="hasSelectedItems"
          @toggle-select-all="toggleSelectAll"
          @delete-selected="deleteSelected"
          @update-select-all="updateSelectAll"
          @delete-item="deleteItem"
          @decrease-quantity="decreaseQuantity"
          @increase-quantity="increaseQuantity"
        />

        <!-- Right Side - Cart Summary (Desktop) -->
        <CartSummary
          :total-items="totalItems"
          :subtotal="subtotal"
          :discount="discount"
          :shipping-cost="shippingCost"
          :final-total="totalAmount"
          :has-selected-items="hasSelectedItems"
          :selected-items-count="selectedItemsCount"
          @checkout="checkout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomSidebar from "@/components/CustomSidebar.vue";
import { CartHeader, CartProductList, CartSummary } from "@/components/cart";

export default {
  name: "Cart",
  components: {
    CustomSidebar,
    CartHeader,
    CartProductList,
    CartSummary,
  },
  errorCaptured(err, vm, info) {
    console.error("Cart error:", err, info);
    return false;
  },

  data() {
    return {
      sidebarExpanded: true,
      selectAll: false,
      cartItems: [],
      shippingCost: 0,
    };
  },
  computed: {
    selectedItems() {
      return this.cartItems.filter((item) => item.selected);
    },
    selectedItemsCount() {
      return this.selectedItems.length;
    },
    hasSelectedItems() {
      return this.selectedItemsCount > 0;
    },
    totalItems() {
      return this.selectedItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal() {
      return this.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    discount() {
      return this.selectedItems.reduce((total, item) => {
        if (item.originalPrice) {
          return total + (item.originalPrice - item.price) * item.quantity;
        }
        return total;
      }, 0);
    },
    totalAmount() {
      return this.subtotal - this.discount + this.shippingCost;
    },
  },
  methods: {
    handleSidebarToggle(isExpanded) {
      this.sidebarExpanded = isExpanded;
    },
    toggleSelectAll(checked) {
      this.selectAll = checked;
      this.cartItems.forEach((item) => {
        item.selected = checked;
      });
      this.saveCartItems();
    },
    updateSelectAll(item) {
      if (item) {
        // Toggle the selected state of the specific item
        item.selected = !item.selected;
      }

      // Update select all state based on all items
      this.selectAll = this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
      this.saveCartItems();
    },
    initializeSelectAll() {
      // Initialize select all state based on all items
      this.selectAll = this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
    },
    increaseQuantity(item) {
      if (item.quantity < item.stock) {
        item.quantity++;
        this.saveCartItems();
      }
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveCartItems();
      }
    },
    deleteItem(itemId) {
      const index = this.cartItems.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.initializeSelectAll();
        this.saveCartItems();
      }
    },
    deleteSelected() {
      this.cartItems = this.cartItems.filter((item) => !item.selected);
      this.initializeSelectAll();
      this.saveCartItems();
    },
    checkout() {
      if (this.hasSelectedItems) {
        this.$router.push("/checkout").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            alert("Error navigating to checkout page");
          }
        });
      } else {
        alert("Pilih produk terlebih dahulu untuk checkout");
      }
    },
    loadCartItems() {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        this.cartItems = [];
      }
    },
    saveCartItems() {
      try {
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
        // Dispatch event to update cart count in header
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    },
  },
  mounted() {
    this.loadCartItems();
    this.initializeSelectAll();
  },
};
</script>

<style scoped>
.cart-container {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.cart-main {
  flex: 1;
  padding: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  align-items: start;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .cart-main {
    padding: 1rem;
    padding-bottom: 140px; /* Add bottom padding for mobile summary */
  }
}
</style>
