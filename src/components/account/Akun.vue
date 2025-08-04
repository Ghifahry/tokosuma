<template>
  <div class="header">
    <div class="title-info">
      <h2>Akun</h2>
    </div>
  </div>

  <div class="akun-container">
    <div class="profile-section">
      <!-- Profile Photo Section -->
      <div class="photo-container" @click="triggerUpload">
        <div class="photo-wrapper">
          <img :src="form.foto" alt="Foto Profil" class="profile-photo" />
          <div class="photo-overlay">
            <div class="upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L12 8M12 8L15 11M12 8L9 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M3 15V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <p class="photo-text">Ubah Foto</p>
        <small class="photo-info">Format: .jpg, .jpeg, .png (maks. 2MB)</small>
        <input ref="fileInput" type="file" @change="unggahFoto" accept="image/*" hidden />
      </div>

      <!-- User Info Card -->
      <div class="user-info-card">
        <div class="card-header">
          <h3>Informasi Pribadi</h3>
          <p>Kelola data pribadi Anda</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <form @submit.prevent="simpanPerubahan" class="modern-form">
        <div class="form-row">
          <div class="form-group">
            <label for="nama">Nama Lengkap</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input id="nama" v-model="form.nama" type="text" required placeholder="Masukkan nama lengkap" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input id="email" v-model="form.email" type="email" disabled placeholder="Email Anda" />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="gender">Jenis Kelamin</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <select id="gender" v-model="form.gender" required>
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="dob">Tanggal Lahir</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input id="dob" v-model="form.dob" type="date" required />
            </div>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="noTelepon">Nomor Telepon</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0973 21.9452 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09494 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65189C2.82196 2.44708 3.0498 2.28367 3.30379 2.17189C3.55778 2.0601 3.83233 2.00252 4.10999 2.002H7.10999C7.59522 1.99522 8.06574 2.16708 8.43376 2.48353C8.80178 2.79999 9.042 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97348 7.27675 9.89382 7.65353C9.81416 8.03032 9.62984 8.38332 9.35999 8.67L8.08999 9.94C9.51355 12.3635 11.6365 14.4865 14.06 15.91L15.33 14.64C15.6167 14.3702 15.9697 14.1858 16.3465 14.1062C16.7233 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input id="noTelepon" v-model="form.noTelepon" type="tel" placeholder="0812xxxxxxx" @input="validateNomor" required />
          </div>
          <small v-if="error.noTelepon" class="error-message">{{ error.noTelepon }}</small>
        </div>

        <div class="password-section">
          <router-link to="/forgotpassword" class="password-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Ubah Password
          </router-link>
        </div>

        <button type="submit" class="save-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  nama: "mhmdgabrielle",
  email: "mhmdgabrielle@gmail.com",
  gender: "Laki-laki",
  dob: "2000-01-01",
  noTelepon: "081234567890",
});

const error = reactive({
  noTelepon: "",
});

const fileInput = ref(null);

function triggerUpload() {
  fileInput.value.click();
}

function unggahFoto(event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file melebihi 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      form.foto = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function validateNomor(event) {
  const angka = event.target.value;
  const onlyDigits = angka.replace(/\D/g, "");
  form.noTelepon = onlyDigits;

  if (onlyDigits.length < 10) {
    error.noTelepon = "Nomor telepon minimal 10 digit.";
  } else if (onlyDigits.length > 13) {
    error.noTelepon = "Nomor telepon maksimal 13 digit.";
  } else if (!/^\d+$/.test(onlyDigits)) {
    error.noTelepon = "Nomor telepon hanya boleh berisi angka.";
  } else {
    error.noTelepon = "";
  }
}

function simpanPerubahan() {
  if (error.noTelepon) {
    alert("Periksa kembali inputan Anda.");
    return;
  }

  if (!form.nama.trim()) {
    alert("Nama lengkap harus diisi.");
    return;
  }

  if (!form.gender) {
    alert("Jenis kelamin harus dipilih.");
    return;
  }

  if (!form.dob) {
    alert("Tanggal lahir harus diisi.");
    return;
  }

  console.log("Data dikirim ke backend:", { ...form });
  alert("Perubahan berhasil disimpan!");
}
</script>

<style scoped>
.akun-container {
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 30px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.photo-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.photo-wrapper:hover {
  transform: scale(1.05);
}

.profile-photo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.photo-wrapper:hover .photo-overlay {
  opacity: 1;
}

.upload-icon {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 8px;
  backdrop-filter: blur(5px);
}

.photo-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 0;
}

.photo-info {
  font-size: 11px;
  color: #999;
  text-align: center;
  margin: 0;
}

.user-info-card {
  flex: 1;
}

.card-header h3 {
  font-size: 24px;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: 600;
}

.card-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.form-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 4px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #666;
  z-index: 1;
}

input,
select {
  width: 100%;
  padding: 12px 12px 12px 40px;
  font-size: 14px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  background: #fff;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus,
select:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.password-section {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.password-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #e85423;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.password-link:hover {
  background: rgba(255, 255, 255, 0.2);
  }

.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #e85423 0%, #fa6e44 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.save-button:active {
  transform: translateY(0);
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
}

.title-info {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.title-info h2 {
  font-size: 20px;
  margin: 35px 10px 10px 30px;
  color: #333;
}

.title-info p {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .akun-container {
    margin: 0 15px;
    padding: 20px;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-section {
    padding: 20px;
  }

  .modern-form {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .akun-container {
    margin: 0 10px;
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .title-info h2 {
    margin: 20px 10px 10px 15px;
    font-size: 18px;
  }

  .profile-photo {
    width: 100px;
    height: 100px;
  }

  .card-header h3 {
    font-size: 20px;
  }

  input,
  select {
    padding: 10px 10px 10px 35px;
    font-size: 13px;
  }

  .input-icon {
    left: 10px;
    width: 16px;
    height: 16px;
  }
}
</style>
