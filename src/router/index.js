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
import Login from "@/views/Login.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import AllBlogs from "@/views/AllBlogs.vue";
import SearchResults from "@/views/SearchResults.vue"; // Impor komponen hasil pencarian
import SyaratKetentuan from "@/views/Footer-View/SyaratKetentuan.vue";
import KebijakanPrivasi from "@/views/Footer-View/KebijakanPrivasi.vue";
import CaraPemesanan from "@/views/Footer-View/CaraPemesanan.vue";
import CaraPembayaran from "@/views/Footer-View/CaraPembayaran.vue";
import AboutUs from "@/views/Footer-View/AboutUs.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search",
    name: "search-results",
    component: SearchResults,
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
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/blogs",
    name: "all-blogs",
    component: AllBlogs,
    meta: { hideHeader: true },
  },
  {
    path: "/syarat-ketentuan",
    name: "syarat-ketentuan",
    component: SyaratKetentuan,
  },
  {
    path: "/kebijakan-privasi",
    name: "kebijakan-privasi",
    component: KebijakanPrivasi,
  },
  {
    path: "/cara-pemesanan",
    name: "cara-pemesanan",
    component: CaraPemesanan,
  },
  {
    path: "/cara-pembayaran",
    name: "cara-pembayaran",
    component: CaraPembayaran,
  },
  {
    path: "/about-us",
    name: "about-us",
    component: AboutUs,
  },
];

const router = createRouter({
  history: createWebHistory("/tokosuma/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
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
