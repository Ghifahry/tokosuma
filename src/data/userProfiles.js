// Data user profiles berdasarkan email
export const userProfiles = {
  "mhmdgabrielle@gmail.com": {
    foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nama: "Muhammad Gabrielle",
    email: "mhmdgabrielle@gmail.com",
    gender: "Laki-laki",
    dob: "2000-01-01",
    noTelepon: "081234567890",
    username: "mhmdgabrielle",
    role: "user",
  },
  "john.doe@example.com": {
    foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nama: "John Doe",
    email: "john.doe@example.com",
    gender: "Laki-laki",
    dob: "1995-05-15",
    noTelepon: "081234567891",
    username: "johndoe",
    role: "user",
  },
  "jane.smith@example.com": {
    foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nama: "Jane Smith",
    email: "jane.smith@example.com",
    gender: "Perempuan",
    dob: "1992-08-20",
    noTelepon: "081234567892",
    username: "janesmith",
    role: "user",
  },
  "admin@tokosuma.com": {
    foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nama: "Admin Toko Suma",
    email: "admin@tokosuma.com",
    gender: "Laki-laki",
    dob: "1985-12-10",
    noTelepon: "081234567893",
    username: "admin",
    role: "admin",
  },
};

// Function untuk mendapatkan data user berdasarkan email
export const getUserProfile = (email) => {
  return (
    userProfiles[email] || {
      foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      nama: "User Baru",
      email: email,
      gender: "Laki-laki",
      dob: "2000-01-01",
      noTelepon: "081234567890",
      username: email.split("@")[0],
      role: "user",
    }
  );
};

// Function untuk menyimpan data user ke localStorage
export const saveUserToLocalStorage = (email) => {
  const userProfile = getUserProfile(email);

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", userProfile.email);
  localStorage.setItem("userFullName", userProfile.nama);
  localStorage.setItem("username", userProfile.username);
  localStorage.setItem("userRole", userProfile.role);
  localStorage.setItem("userData", JSON.stringify(userProfile));

  return userProfile;
};

// Function untuk register user baru
export const registerNewUser = (userData) => {
  const { firstName, lastName, email, phone, password, gender = "Laki-laki", dob = "2000-01-01" } = userData;

  // Validasi data
  if (!firstName || !lastName || !email || !phone || !password) {
    throw new Error("Semua field harus diisi");
  }

  if (password.length < 8) {
    throw new Error("Password minimal 8 karakter");
  }

  if (!isValidEmail(email)) {
    throw new Error("Format email tidak valid");
  }

  if (!isValidPhone(phone)) {
    throw new Error("Format nomor telepon tidak valid");
  }

  // Cek apakah email sudah terdaftar
  const existingUser = localStorage.getItem(`user_${email}`);
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // Buat user profile baru
  const newUserProfile = {
    foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nama: `${firstName} ${lastName}`,
    email: email,
    gender: gender,
    dob: dob,
    noTelepon: phone,
    username: firstName.toLowerCase(),
    role: "user",
    password: password, // Dalam aplikasi nyata, password harus di-hash
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  // Simpan ke localStorage
  localStorage.setItem(`user_${email}`, JSON.stringify(newUserProfile));

  // Simpan ke userProfiles untuk akses cepat
  userProfiles[email] = newUserProfile;

  // Login user setelah register
  saveUserToLocalStorage(email);

  return newUserProfile;
};

// Function untuk validasi email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function untuk validasi nomor telepon
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,13}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

// Function untuk mendapatkan semua user yang terdaftar
export const getAllRegisteredUsers = () => {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("user_")) {
      try {
        const userData = JSON.parse(localStorage.getItem(key));
        users.push(userData);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }
  return users;
};

// Function untuk cek apakah user sudah terdaftar
export const isUserRegistered = (email) => {
  return localStorage.getItem(`user_${email}`) !== null;
};

// Function untuk update user profile
export const updateUserProfile = (email, updatedData) => {
  console.log("updateUserProfile called with email:", email);
  console.log("updatedData:", updatedData);

  // Cek apakah user ada di localStorage dengan format user_${email}
  let existingUser = localStorage.getItem(`user_${email}`);
  let userData = null;

  if (existingUser) {
    try {
      userData = JSON.parse(existingUser);
      console.log("Found user in user_${email} format:", userData);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  // Jika tidak ditemukan, cek di userData
  if (!userData) {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const storedUserData = JSON.parse(userDataString);
        if (storedUserData.email === email) {
          userData = storedUserData;
          console.log("Found user in userData:", userData);
        }
      } catch (e) {
        console.error("Error parsing userData:", e);
      }
    }
  }

  // Jika masih tidak ditemukan, buat user baru
  if (!userData) {
    console.log("User not found, creating new user profile");
    userData = {
      foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      nama: updatedData.nama || "User",
      email: email,
      gender: updatedData.gender || "Laki-laki",
      dob: updatedData.dob || "2000-01-01",
      noTelepon: updatedData.noTelepon || "",
      username: email.split("@")[0],
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true,
    };
  }

  // Update user data
  const updatedUser = { ...userData, ...updatedData, updatedAt: new Date().toISOString() };

  // Simpan ke localStorage dengan format user_${email}
  localStorage.setItem(`user_${email}`, JSON.stringify(updatedUser));

  // Update userProfiles object
  userProfiles[email] = updatedUser;

  // Update localStorage auth data
  localStorage.setItem("userData", JSON.stringify(updatedUser));
  localStorage.setItem("userFullName", updatedUser.nama);
  localStorage.setItem("userEmail", email);

  console.log("User profile updated successfully:", updatedUser);
  return updatedUser;
};
