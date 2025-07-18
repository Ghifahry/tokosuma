// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AccountLayout from "@/AccountLayout.vue";
import Transaksi from "@/views/account/Transaksi.vue";
import Wishlist from "@/views/account/Wishlist.vue";
import Akun from "@/views/account/Akun.vue";
import Alamat from "@/views/account/Alamat.vue";
import Ulasan from "@/views/account/Ulasan.vue";

import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/account",
    component: AccountLayout,
    children: [
      { path: "transaksi", component: Transaksi },
      { path: "wishlist", component: Wishlist },
      { path: "akun", component: Akun },
      { path: "alamat", component: Alamat },
      { path: "ulasan", component: Ulasan },
    ],
    meta: { requiresAuth: true }, // Protect all /account routes
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: {
      template: "<div><h2>Product Detail Page (Placeholder)</h2><p>This page is not implemented yet.</p></div>",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/tokosuma/"),
  routes,
});

// Mock authentication check function
function isAuthenticated() {
  // TODO: Replace with real authentication check
  return true; // Changed to true to simulate authenticated user and fix loading loop
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      // User is not authenticated, redirect to home or login page
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
