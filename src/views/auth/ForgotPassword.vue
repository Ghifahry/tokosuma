<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <div class="forgot-password-header">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" class="logo" />
        <h2>Lupa Password</h2>
        <p>Masukkan email Anda untuk reset password</p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="forgot-password-form">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" id="email" v-model="form.email" placeholder="Masukkan email Anda" required />
          </div>
        </div>

        <button type="submit" class="reset-btn" :disabled="isLoading">
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          {{ isLoading ? "Mengirim..." : "Kirim Link Reset" }}
        </button>
      </form>

      <div class="back-to-login">
        <router-link to="/login" class="back-link">
          <i class="fas fa-arrow-left"></i>
          Kembali ke halaman login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      form: {
        email: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async handleForgotPassword() {
      this.isLoading = true;

      try {
        // Simulasi proses reset password
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        alert(`Link reset password telah dikirim ke email ${this.form.email}. Silakan cek inbox atau folder spam Anda.`);

        // Redirect to login page
        this.$router.push("/login");
      } catch (error) {
        console.error("Forgot password error:", error);
        alert("Gagal mengirim link reset. Silakan coba lagi.");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8f5 0%, #fff 100%);
  padding: 20px;
  padding-top: 120px; /* Tambahkan padding-top untuk menghindari header */
  font-family: "Poppins", sans-serif;
}

.forgot-password-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(232, 84, 35, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  border: 1px solid #f0f0f0;
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 180px;
  margin-bottom: 20px;
}

.forgot-password-header h2 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.forgot-password-header p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.forgot-password-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 25px;
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

.reset-btn {
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

.reset-btn:hover:not(:disabled) {
  background: #c6481d;
  transform: translateY(-1px);
}

.reset-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.back-to-login {
  text-align: center;
  margin-top: 20px;
}

.back-link {
  color: #e85423;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-link:hover {
  color: #c6481d;
}

/* Responsive Design */
@media (max-width: 480px) {
  .forgot-password-container {
    padding: 15px;
    padding-top: 100px; /* Kurangi padding-top untuk mobile */
  }

  .forgot-password-card {
    padding: 30px 25px;
  }

  .logo {
    width: 150px;
  }

  .forgot-password-header h2 {
    font-size: 1.3rem;
  }
}
</style>
