<template>
  <div class="top-header">
    <div class="top-header-content">
      <nav class="top-menu">
        <router-link to="/faq" class="top-menu-item">FAQ</router-link>
        <router-link to="/terms-and-conditions" class="top-menu-item">Terms & Conditions</router-link>
        <router-link to="/contact-us" class="top-menu-item">Contact Us</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this simple header
</script>

<style scoped>
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f2f4f7;
  border-bottom: 1px solid #e0e0e0;
  z-index: 1001;
  font-family: "Poppins", sans-serif;
}

.top-header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.top-menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 0;
}

.top-menu-item {
  font-size: 0.75rem;
  color: #646b7a;
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.top-menu-item:hover {
  color: #e85423;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .top-header {
    display: none;
  }
}
</style>
