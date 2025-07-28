// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AccountLayout from "@/views/AccountLayout.vue";
import Transaksi from "@/components/account/Transaksi.vue";
import Wishlist from "@/components/account/Wishlist.vue";
import Akun from "@/components/account/Akun.vue";
import Alamat from "@/components/account/Alamat.vue";
import Ulasan from "@/components/account/Ulasan.vue";

import Home from "@/views/Home.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import Register from "@/views/Register.vue";
import AllBlogs from "@/views/AllBlogs.vue";

import PricelistDigital from "@/components/pricelist-digital/table.vue";

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
    path: "/product/:name",
    name: "product-detail",
    component: ProductDetail,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/pricelist-digital",
    name: "pricelist-digital",
    component: PricelistDigital,
  },
  {
    path: "/blogs",
    name: "all-blogs",
    component: AllBlogs,
    meta: { hideHeader: true },
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
