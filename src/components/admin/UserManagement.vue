<template>
  <div class="user-management">
    <div class="header">
      <h2>Manajemen User</h2>
      <p>Kelola data user yang terdaftar</p>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <h3>Total User</h3>
        <p class="stat-number">{{ users.length }}</p>
      </div>
      <div class="stat-card">
        <h3>User Aktif</h3>
        <p class="stat-number">{{ activeUsers.length }}</p>
      </div>
      <div class="stat-card">
        <h3>User Baru (Hari Ini)</h3>
        <p class="stat-number">{{ newUsersToday.length }}</p>
      </div>
    </div>

    <div class="filters">
      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="Cari user berdasarkan nama atau email..." @input="filterUsers" />
      </div>
      <div class="filter-options">
        <select v-model="statusFilter" @change="filterUsers">
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>
    </div>

    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No. Telepon</th>
            <th>Role</th>
            <th>Status</th>
            <th>Tanggal Daftar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.email">
            <td>
              <img :src="user.foto" :alt="user.nama" class="user-avatar" />
            </td>
            <td>{{ user.nama }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.noTelepon }}</td>
            <td>
              <span :class="`role-badge ${user.role}`">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span :class="`status-badge ${user.isActive ? 'active' : 'inactive'}`">
                {{ user.isActive ? "Aktif" : "Tidak Aktif" }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>
              <div class="action-buttons">
                <button @click="viewUser(user)" class="btn-view">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="editUser(user)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="toggleUserStatus(user)" class="btn-toggle">
                  <i :class="user.isActive ? 'fas fa-ban' : 'fas fa-check'"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Detail Modal -->
    <div v-if="selectedUser" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detail User</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-detail">
            <img :src="selectedUser.foto" :alt="selectedUser.nama" class="detail-avatar" />
            <div class="detail-info">
              <h4>{{ selectedUser.nama }}</h4>
              <p><strong>Email:</strong> {{ selectedUser.email }}</p>
              <p><strong>No. Telepon:</strong> {{ selectedUser.noTelepon }}</p>
              <p><strong>Jenis Kelamin:</strong> {{ selectedUser.gender }}</p>
              <p><strong>Tanggal Lahir:</strong> {{ formatDate(selectedUser.dob) }}</p>
              <p><strong>Role:</strong> {{ selectedUser.role }}</p>
              <p><strong>Status:</strong> {{ selectedUser.isActive ? "Aktif" : "Tidak Aktif" }}</p>
              <p><strong>Tanggal Daftar:</strong> {{ formatDate(selectedUser.createdAt) }}</p>
              <p v-if="selectedUser.updatedAt"><strong>Terakhir Update:</strong> {{ formatDate(selectedUser.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAllRegisteredUsers, updateUserProfile } from "@/data/userProfiles";

const users = ref([]);
const filteredUsers = ref([]);
const searchQuery = ref("");
const statusFilter = ref("");
const selectedUser = ref(null);

// Computed properties
const activeUsers = computed(() => {
  return users.value.filter((user) => user.isActive);
});

const newUsersToday = computed(() => {
  const today = new Date().toDateString();
  return users.value.filter((user) => {
    const userDate = new Date(user.createdAt).toDateString();
    return userDate === today;
  });
});

// Methods
const loadUsers = () => {
  users.value = getAllRegisteredUsers();
  filteredUsers.value = users.value;
};

const filterUsers = () => {
  let filtered = users.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((user) => user.nama.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter((user) => {
      if (statusFilter.value === "active") return user.isActive;
      if (statusFilter.value === "inactive") return !user.isActive;
      return true;
    });
  }

  filteredUsers.value = filtered;
};

const viewUser = (user) => {
  selectedUser.value = user;
};

const editUser = (user) => {
  // Implementasi edit user
  console.log("Edit user:", user);
  alert("Fitur edit user akan diimplementasikan");
};

const toggleUserStatus = async (user) => {
  try {
    const newStatus = !user.isActive;
    await updateUserProfile(user.email, { isActive: newStatus });

    // Reload users
    loadUsers();
    filterUsers();

    alert(`Status user ${user.nama} berhasil diubah menjadi ${newStatus ? "Aktif" : "Tidak Aktif"}`);
  } catch (error) {
    console.error("Error toggling user status:", error);
    alert("Gagal mengubah status user");
  }
};

const closeModal = () => {
  selectedUser.value = null;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Lifecycle
onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.user-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  color: #333;
  margin-bottom: 10px;
}

.header p {
  color: #666;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #e85423;
  margin: 0;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.search-box {
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.filter-options select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.users-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.user {
  background: #e3f2fd;
  color: #1976d2;
}

.role-badge.admin {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background: #e8f5e8;
  color: #2e7d32;
}

.status-badge.inactive {
  background: #ffebee;
  color: #c62828;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.action-buttons button {
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.btn-view {
  background: #e3f2fd;
  color: #1976d2;
}

.btn-edit {
  background: #fff3e0;
  color: #f57c00;
}

.btn-toggle {
  background: #f3e5f5;
  color: #7b1fa2;
}

.action-buttons button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.user-detail {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.detail-info h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.detail-info p {
  margin: 8px 0;
  color: #666;
}

.detail-info strong {
  color: #333;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .users-table {
    overflow-x: auto;
  }

  .user-detail {
    flex-direction: column;
    text-align: center;
  }
}
</style>
