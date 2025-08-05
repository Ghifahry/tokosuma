import { ref, onMounted, onUnmounted } from "vue";

export function useAuth() {
  const isLoggedIn = ref(false);
  const userEmail = ref("");
  const userFullName = ref("");
  const username = ref("");
  const userRole = ref("");
  const profileImageUrl = ref("https://cdn-icons-png.flaticon.com/512/149/149071.png");

  const checkLoginStatus = () => {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn.value) {
      userEmail.value = localStorage.getItem("userEmail") || "";
      userFullName.value = localStorage.getItem("userFullName") || "";
      username.value = localStorage.getItem("username") || "";
      userRole.value = localStorage.getItem("userRole") || "";
    } else {
      userEmail.value = "";
      userFullName.value = "";
      username.value = "";
      userRole.value = "";
    }
  };

  const logout = () => {
    if (confirm("Apakah Anda yakin ingin keluar akun?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userFullName");
      localStorage.removeItem("username");
      localStorage.removeItem("userRole");

      window.dispatchEvent(
        new CustomEvent("loginStatusChanged", {
          detail: { isLoggedIn: false },
        })
      );

      checkLoginStatus();
    }
  };

  const isSuperAdmin = () => {
    return userRole.value === "super_admin";
  };

  // Initialize immediately if localStorage is available
  if (typeof localStorage !== "undefined") {
    checkLoginStatus();
  }

  onMounted(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("loginStatusChanged", checkLoginStatus);
  });

  onUnmounted(() => {
    window.removeEventListener("storage", checkLoginStatus);
    window.removeEventListener("loginStatusChanged", checkLoginStatus);
  });

  return {
    isLoggedIn,
    userEmail,
    userFullName,
    username,
    userRole,
    profileImageUrl,
    checkLoginStatus,
    logout,
    isSuperAdmin,
  };
}
