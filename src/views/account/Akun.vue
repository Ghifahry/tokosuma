<template>
  <div class="header">
    <div class="title-info">
      <h2>Akun</h2>
    </div>
  </div>

  <div class="akun-container">
    <div class="row">
      <!-- Foto Profil -->
      <div class="foto-area" @click="triggerUpload">
        <img :src="form.foto" alt="Foto Profil" class="foto-preview" />
        <p class="ubah-text">Ubah Foto</p>
        <small class="foto-info">Format: .jpg, .jpeg, .png (maks. 2MB)</small>
        <input ref="fileInput" type="file" @change="unggahFoto" accept="image/*" hidden />
      </div>

      <!-- Form Data -->
      <form @submit.prevent="simpanPerubahan" class="akun-form">
        <div class="form-group">
          <label for="nama">Nama Lengkap</label>
          <input id="nama" v-model="form.nama" type="text" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" disabled />
        </div>

        <div class="form-group">
          <label for="gender">Jenis Kelamin</label>
          <select id="gender" v-model="form.gender">
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dob">Tanggal Lahir</label>
          <input id="dob" v-model="form.dob" type="date" />
          <label for="noTelepon">Nomor Telepon</label>
          <input id="noTelepon" v-model="form.noTelepon" type="tel" placeholder="0812xxxxxxx" @input="validateNomor" />
          <small v-if="error.noTelepon" style="color: red">{{ error.noTelepon }}</small>
        </div>

        <div class="form-group">
          <router-link to="/forgotpassword" class="forgot-link">Change Password? Click Here</router-link>
        </div>

        <button type="submit" class="simpan-btn">Simpan</button>
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

  if (!/^\d+$/.test(onlyDigits)) {
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

  console.log("Data dikirim ke backend:", { ...form });
  alert("Perubahan berhasil disimpan!");
}
</script>

<style scoped>
.akun-container {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0px 20px 20px 20px;
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 480px) {
  .akun-container {
    height: 100vh;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 8px;
    overflow-y: auto;
  }

  input,
  select {
    width: 100%;
    padding: 10px 12px;
    font-size: 15px;
  }

  .akun-form {
    width: 95%;
    padding: 0 8px;
  }

  .form-group {
    width: 95%;
  }
}

.row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: nowrap;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
}

.foto-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  gap: 6px;
  width: 140px;
  flex-shrink: 0;
}

.foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.ubah-text {
  font-size: 12px;
  color: #777;
}

.akun-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 12px;
  margin-bottom: 2px;
  color: #444;
}

input,
select {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}

input:focus,
select:focus {
  border-color: #e85423;
  outline: none;
}

.simpan-btn {
  padding: 8px;
  font-size: 13px;
  background-color: #eeebeb;
  color: rgb(0, 0, 0);
  border: none;
  border-color: #e85423;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 6px;
}

.simpan-btn:hover {
  background-color: #c9431c;
  color: #fff;
}

.foto-info {
  font-size: 11px;
  color: #999;
  text-align: center;
}

.forgot-link {
  font-size: 12px;
  color: #e85423;
  text-decoration: underline;
  cursor: pointer;
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
  margin-bottom: 26px;
}

.title-info h2 {
  font-size: 20px;
  margin: 10px 10px 10px 30px;
  color: #333;
}

.title-info p {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
