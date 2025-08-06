<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <img src="https://tokosuma.co.id/assets/images/layout-5/logo/logo_tokosuma_coid.png" alt="Logo Toko Suma" class="logo" />
        <h2>Daftar Akun Baru</h2>
        <p>Bergabunglah dengan Toko Suma dan nikmati berbagai produk berkualitas!</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">Nama Depan</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input type="text" id="firstName" v-model="form.firstName" placeholder="Masukkan nama depan" required />
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Nama Belakang</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input type="text" id="lastName" v-model="form.lastName" placeholder="Masukkan nama belakang" required />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" id="email" v-model="form.email" placeholder="Masukkan email Anda" required />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Nomor Telepon</label>
          <div class="input-wrapper">
            <i class="fas fa-phone input-icon"></i>
            <input type="tel" id="phone" v-model="form.phone" placeholder="Masukkan nomor telepon" required />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" placeholder="Buat password minimal 8 karakter" required minlength="8" />
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="password-toggle" @click="togglePassword"></i>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Konfirmasi Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="form.confirmPassword" placeholder="Konfirmasi password Anda" required />
            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="password-toggle" @click="toggleConfirmPassword"></i>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="form.agreeTerms" required />
            <span class="checkmark"></span>
            Saya setuju dengan<a href="#" class="terms-link">Syarat & Ketentuan</a> dan <a href="#" class="terms-link">Kebijakan Privasi</a>
          </label>
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="form.newsletter" />
            <span class="checkmark"></span>
            Saya ingin menerima newsletter dan penawaran khusus
          </label>
        </div>

        <button type="submit" class="register-btn" :disabled="isLoading || !isFormValid">
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          {{ isLoading ? "Memproses..." : "Daftar Sekarang" }}
        </button>
      </form>

      <div class="divider">
        <span>atau</span>
      </div>

      <div class="social-register">
        <button class="social-btn google-btn">
          <i class="fab fa-google"></i>
          Daftar dengan Google
        </button>
        <button class="social-btn facebook-btn">
          <i class="fab fa-facebook-f"></i>
          Daftar dengan Facebook
        </button>
      </div>

      <div class="login-link">
        <p>Sudah punya akun? <router-link to="/login">Masuk di sini</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        newsletter: false,
      },
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.firstName &&
        this.form.lastName &&
        this.form.email &&
        this.form.phone &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.agreeTerms &&
        this.form.password === this.form.confirmPassword &&
        this.form.password.length >= 8
      );
    },
  },
  methods: {
    async handleRegister() {
      if (!this.isFormValid) {
        alert("Mohon lengkapi semua data dengan benar");
        return;
      }

      this.isLoading = true;

      try {
        // Simulasi register process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Set login status after successful registration
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", this.form.email);
        localStorage.setItem("userFullName", `${this.form.firstName} ${this.form.lastName}`);
        localStorage.setItem("username", this.form.firstName.toLowerCase());

        // Trigger custom event untuk update header
        window.dispatchEvent(
          new CustomEvent("loginStatusChanged", {
            detail: { isLoggedIn: true },
          })
        );

        // Show success message
        alert("Pendaftaran berhasil! Selamat datang di Toko Suma.");

        // Redirect to home page
        this.$router.push("/");
      } catch (error) {
        console.error("Register error:", error);
        alert("Gagal mendaftar. Silakan coba lagi.");
      } finally {
        this.isLoading = false;
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8f5 0%, #fff 100%);
  padding: 20px;
  padding-top: 150px; /* Tambahkan padding-top untuk menghindari header */
  font-family: "Poppins", sans-serif;
}

.register-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(232, 84, 35, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 550px;
  border: 1px solid #f0f0f0;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 180px;
  margin-bottom: 20px;
}

.register-header h2 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.register-header p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.register-form {
  margin-bottom: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
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
  margin-bottom: 15px;
  font-size: 0.85rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: #666;
  line-height: 1.4;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-right: 8px;
  margin-top: 2px;
  accent-color: #e85423;
}

.terms-link {
  color: #e85423;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #c6481d;
}

.register-btn {
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
  margin-top: 20px;
}

.register-btn:hover:not(:disabled) {
  background: #c6481d;
  transform: translateY(-1px);
}

.register-btn:disabled {
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

.social-register {
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

.login-link {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.login-link a {
  color: #e85423;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #c6481d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

@media (max-width: 480px) {
  .register-container {
    padding: 15px;
    padding-top: 100px; /* Kurangi padding-top untuk mobile */
  }

  .register-card {
    padding: 30px 25px;
  }

  .logo {
    width: 150px;
  }

  .register-header h2 {
    font-size: 1.3rem;
  }

  .checkbox-wrapper {
    font-size: 0.8rem;
  }
}
</style>
