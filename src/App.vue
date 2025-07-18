<template>
  <Header />
  <router-view />
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style>
/* Tambahkan styling global jika perlu */
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
}
</style>
