<template>
  <div class="payment-summary-card">
    <PaymentMethodSection :payment-methods="paymentMethods" :selected-payment-method="selectedPaymentMethod" @select-payment-method="$emit('select-payment-method', $event)" />

    <PromoSection :applied-promo="appliedPromo" @apply-promo="$emit('apply-promo', $event)" @remove-promo="$emit('remove-promo')" />

    <TransactionSummary :selected-items="selectedItems" :shipping-cost="shippingCost" :applied-promo="appliedPromo" />

    <PaymentButton :can-proceed="canProceed" :selected-items="selectedItems" @process-payment="$emit('process-payment')" />
  </div>
</template>

<script>
import PaymentMethodSection from "./PaymentMethodSection.vue";
import PromoSection from "./PromoSection.vue";
import TransactionSummary from "./TransactionSummary.vue";
import PaymentButton from "./PaymentButton.vue";

export default {
  name: "PaymentSummary",
  components: {
    PaymentMethodSection,
    PromoSection,
    TransactionSummary,
    PaymentButton,
  },
  props: {
    paymentMethods: {
      type: Array,
      default: () => [],
    },
    selectedPaymentMethod: {
      type: Object,
      default: null,
    },
    appliedPromo: {
      type: Object,
      default: null,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    canProceed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select-payment-method", "apply-promo", "remove-promo", "process-payment"],
};
</script>

<style scoped>
.payment-summary-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
