<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" class="logo" />
        <h2>Masuk ke Akun Anda</h2>
        <p>Selamat datang kembali! Silakan masuk ke akun Anda.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" id="email" v-model="form.email" placeholder="Masukkan email Anda" required />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" placeholder="Masukkan password Anda" required />
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="password-toggle" @click="togglePassword"></i>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="form.rememberMe" />
            <span class="checkmark"></span>
            Ingat saya
          </label>
          <router-link to="/forgot-password" class="forgot-link">Lupa password?</router-link>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          {{ isLoading ? "Memproses..." : "Masuk" }}
        </button>
      </form>

      <div class="divider">
        <span>atau</span>
      </div>

      <div class="social-login">
        <button class="social-btn google-btn">
          <i class="fab fa-google"></i>
          Masuk dengan Google
        </button>
        <button class="social-btn facebook-btn">
          <i class="fab fa-facebook-f"></i>
          Masuk dengan Facebook
        </button>
      </div>

      <div class="register-link">
        <p>Belum punya akun? <router-link to="/register">Daftar sekarang</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        rememberMe: false,
      },
      showPassword: false,
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;

      try {
        // Simulasi login process
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Regular user login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", this.form.email);
        localStorage.setItem("userFullName", "mhmdgabrielle");
        localStorage.setItem("username", "TOKOSUMAVIEWER");
        localStorage.setItem("userRole", "user");

        // Trigger custom event untuk update header
        window.dispatchEvent(
          new CustomEvent("loginStatusChanged", {
            detail: { isLoggedIn: true },
          })
        );

        // Redirect to home page
        this.$router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        alert("Gagal masuk. Silakan coba lagi.");
      } finally {
        this.isLoading = false;
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8f5 0%, #fff 100%);
  padding: 20px;
  padding-top: 150px; /* Tambahkan padding-top untuk menghindari header */
  font-family: "Poppins", sans-serif;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(232, 84, 35, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  border: 1px solid #f0f0f0;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 180px;
  margin-bottom: 20px;
}

.login-header h2 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.login-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #aaa;
  font-size: 0.9rem;
  z-index: 1;
}

.password-toggle {
  position: absolute;
  right: 12px;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #e85423;
}

.form-group input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: #fafafa;
}

.form-group input:focus {
  outline: none;
  border-color: #e85423;
  box-shadow: 0 0 0 3px rgba(232, 84, 35, 0.1);
  background: white;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 0.85rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #666;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #e85423;
}

.forgot-link {
  color: #e85423;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #c6481d;
}

.login-btn {
  width: 100%;
  background: #e85423;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  background: #c6481d;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.divider {
  text-align: center;
  margin: 25px 0;
  position: relative;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #eee;
}

.divider span {
  background: white;
  padding: 0 15px;
  color: #999;
  font-size: 0.85rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: white;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-btn:hover {
  border-color: #db4437;
  color: #db4437;
  background: #f8f8f8;
}

.facebook-btn:hover {
  border-color: #4267b2;
  color: #4267b2;
  background: #f8f8f8;
}

.register-link {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.register-link a {
  color: #e85423;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #c6481d;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-container {
    padding: 15px;
    padding-top: 80px; /* Kurangi padding-top untuk mobile */
  }

  .login-card {
    padding: 30px 25px;
  }

  .logo {
    width: 150px;
  }

  .login-header h2 {
    font-size: 1.3rem;
  }

  .form-options {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
