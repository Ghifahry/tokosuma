<template>
  <div class="cart-header">
    <h1 class="cart-title">Keranjang</h1>
  </div>
</template>

<script>
export default {
  name: "CartHeader",
};
</script>

<style scoped>
.cart-header {
  margin-bottom: 5rem;
}

.cart-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

@media (max-width: 768px) {
  .cart-header {
    margin-bottom: 3rem;
  }

  .cart-title {
    font-size: 1.5rem;
  }
}
</style>
