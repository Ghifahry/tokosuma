<template>
  <div class="payment-details-container">
    <!-- Header -->
    <div class="payment-header">
      <h1 class="payment-title">Checkout</h1>
    </div>

    <div class="payment-content">
      <!-- Left Side - Address and Product Details -->
      <div class="payment-left">
        <AddressSection :addresses="addresses" :selected-address="selectedAddress" @show-address-modal="showAddressModal = true" @select-address="selectAddress" @edit-address="editAddress" />

        <ProductDetailsSection :selected-items="selectedItems" />
      </div>

      <!-- Right Side - Payment Summary -->
      <div class="payment-right">
        <PaymentSummary
          :payment-methods="paymentMethods"
          :selected-payment-method="selectedPaymentMethod"
          :applied-promo="appliedPromo"
          :selected-items="selectedItems"
          :shipping-cost="shippingCost"
          :can-proceed="canProceed"
          @select-payment-method="selectPaymentMethod"
          @apply-promo="applyPromo"
          @remove-promo="removePromo"
          @process-payment="processPayment"
        />
      </div>
    </div>

    <!-- Address Modal -->
    <AddressModal :show="showAddressModal" :editing-address="editingAddress" @close="closeAddressModal" @save-address="saveAddress" />
  </div>
</template>

<script>
import { AddressSection, ProductDetailsSection, PaymentSummary, AddressModal } from "../../components/payment-details";
import { useAddress } from "../../composables/useAddress";

export default {
  name: "PaymentDetails",
  components: {
    AddressSection,
    ProductDetailsSection,
    PaymentSummary,
    AddressModal,
  },
  errorCaptured(err, vm, info) {
    console.error("PaymentDetails error:", err, info);
    return false;
  },

  data() {
    try {
      return {
        selectedItems: [],
        selectedAddress: null,
        paymentMethods: [
          {
            id: 1,
            name: "Transfer Bank",
            description: "Transfer ke rekening bank",
            icon: "🏦",
          },
          {
            id: 2,
            name: "E-Wallet",
            description: "DANA, OVO, GoPay, LinkAja",
            icon: "📱",
          },
          {
            id: 3,
            name: "Kartu Kredit/Debit",
            description: "Visa, Mastercard, JCB",
            icon: "💳",
          },
        ],
        selectedPaymentMethod: null,
        appliedPromo: null,
        showAddressModal: false,
        editingAddress: null,
        shippingCost: 15000,
      };
    } catch (error) {
      console.error("Error initializing data:", error);
      return {
        selectedItems: [],
        selectedAddress: null,
        paymentMethods: [],
        selectedPaymentMethod: null,
        appliedPromo: null,
        showAddressModal: false,
        editingAddress: null,
        shippingCost: 0,
      };
    }
  },

  computed: {
    canProceed() {
      try {
        return this.selectedAddress && this.selectedPaymentMethod && this.selectedItems && this.selectedItems.length > 0;
      } catch (error) {
        console.error("Error calculating canProceed:", error);
        return false;
      }
    },

    addresses() {
      try {
        const { addresses } = useAddress();
        return addresses.value;
      } catch (error) {
        console.error("Error getting addresses:", error);
        return [];
      }
    },
  },

  methods: {
    selectAddress(address) {
      try {
        this.selectedAddress = address;
        console.log("Selected address:", address);
      } catch (error) {
        console.error("Error selecting address:", error);
      }
    },

    selectPaymentMethod(method) {
      try {
        this.selectedPaymentMethod = method;
        console.log("Selected payment method:", method);
      } catch (error) {
        console.error("Error selecting payment method:", error);
      }
    },

    applyPromo(promoCode) {
      try {
        if (promoCode.trim()) {
          this.appliedPromo = {
            name: promoCode.toUpperCase(),
            discount: 10000,
          };
          console.log("Applied promo:", this.appliedPromo);
        }
      } catch (error) {
        console.error("Error applying promo:", error);
      }
    },

    removePromo() {
      try {
        this.appliedPromo = null;
        console.log("Removed promo");
      } catch (error) {
        console.error("Error removing promo:", error);
      }
    },

    editAddress(address) {
      try {
        this.editingAddress = address;
        this.showAddressModal = true;
        console.log("Editing address:", address);
      } catch (error) {
        console.error("Error editing address:", error);
      }
    },

    closeAddressModal() {
      this.showAddressModal = false;
      this.editingAddress = null;
    },

    saveAddress(addressForm) {
      try {
        const { updateAddress, addAddress, saveAddressesToStorage } = useAddress();

        if (this.editingAddress) {
          updateAddress(this.editingAddress.id, addressForm);
        } else {
          addAddress(addressForm);
        }

        saveAddressesToStorage();
        this.showAddressModal = false;
        this.editingAddress = null;
        console.log("Address saved successfully");
      } catch (error) {
        console.error("Error saving address:", error);
      }
    },

    processPayment() {
      try {
        if (this.canProceed && this.selectedItems.length > 0) {
          alert(`Pembayaran sebesar Rp${this.formatPrice(this.calculateFinalTotal())} sedang diproses...`);
        } else {
          alert("Pilih produk dan metode pembayaran terlebih dahulu");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Terjadi kesalahan saat memproses pembayaran");
      }
    },

    loadSelectedItems() {
      try {
        const savedCart = localStorage.getItem("cart");
        console.log("Saved cart:", savedCart);
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          console.log("Cart items:", cartItems);
          this.selectedItems = cartItems.filter((item) => item.selected);
          console.log("Selected items after filter:", this.selectedItems);
        }
      } catch (error) {
        console.error("Error loading selected items:", error);
        this.selectedItems = [];
      }
    },

    formatPrice(price) {
      try {
        return new Intl.NumberFormat("id-ID").format(price || 0);
      } catch (error) {
        console.error("Error formatting price:", error);
        return "0";
      }
    },

    calculateFinalTotal() {
      try {
        const subtotal = this.selectedItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
        const discount = this.selectedItems.reduce((total, item) => {
          if (item.originalPrice) {
            return total + (item.originalPrice - (item.price || 0)) * (item.quantity || 0);
          }
          return total;
        }, 0);

        let total = subtotal - discount + (this.shippingCost || 0);
        if (this.appliedPromo && this.appliedPromo.discount) {
          total -= this.appliedPromo.discount;
        }
        return total;
      } catch (error) {
        console.error("Error calculating final total:", error);
        return 0;
      }
    },
  },

  mounted() {
    try {
      console.log("PaymentDetails component mounted");
      this.loadSelectedItems();
      console.log("Selected items:", this.selectedItems);

      // Use the global address composable
      const { primaryAddress } = useAddress();

      // Set primary address as selected
      if (primaryAddress.value) {
        this.selectedAddress = primaryAddress.value;
      }

      if (this.paymentMethods.length > 0) {
        this.selectedPaymentMethod = this.paymentMethods[0];
      }
    } catch (error) {
      console.error("Error in PaymentDetails mounted:", error);
    }
  },
};
</script>

<style scoped>
.payment-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 3rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.payment-header {
  margin-bottom: 2rem;
}

.payment-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.payment-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.payment-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.payment-right {
  position: sticky;
  top: 2rem;
}

@media (max-width: 1024px) {
  .payment-content {
    grid-template-columns: 1fr;
  }

  .payment-right {
    position: static;
  }
}

@media (max-width: 768px) {
  .payment-details-container {
    padding: 1rem;
  }

  .payment-title {
    font-size: 1.5rem;
  }
}
</style>
