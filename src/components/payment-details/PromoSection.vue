<template>
  <div class="promo-section">
    <h3 class="section-title">Pilih Promo</h3>
    <div class="promo-input">
      <input type="text" v-model="promoCode" placeholder="Masukkan kode promo" class="promo-code-input" />
      <button class="apply-promo-btn" @click="applyPromo">Terapkan</button>
    </div>
    <div v-if="appliedPromo" class="applied-promo">
      <div class="promo-info">
        <span class="promo-name">{{ appliedPromo.name || "Promo" }}</span>
        <span class="promo-discount">-Rp{{ formatPrice(appliedPromo.discount || 0) }}</span>
      </div>
      <button class="remove-promo-btn" @click="$emit('remove-promo')">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoSection",
  props: {
    appliedPromo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      promoCode: "",
    };
  },
  emits: ["apply-promo", "remove-promo"],
  methods: {
    applyPromo() {
      if (this.promoCode.trim()) {
        this.$emit("apply-promo", this.promoCode);
        this.promoCode = "";
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
  },
};
</script>

<style scoped>
.promo-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #e85423;
}

.promo-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.promo-code-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.apply-promo-btn {
  background: #e85423;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.apply-promo-btn:hover {
  background: #d44a1f;
}

.applied-promo {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.promo-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.promo-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}

.promo-discount {
  font-size: 0.85rem;
  color: #28a745;
  font-weight: 500;
}

.remove-promo-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.remove-promo-btn:hover {
  background: #f8d7da;
}

@media (max-width: 768px) {
  .promo-input {
    flex-direction: column;
  }
}
</style>
