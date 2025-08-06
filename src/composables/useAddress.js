import { ref, computed } from "vue";

// Global address state
const addresses = ref([
  {
    id: 1,
    label: "Rumah Pribadi",
    detail: "Jalan Melati No. 123, Jakarta Selatan",
    kategori: "Rumah",
    kodepos: "12130",
    provinsi: "DKI Jakarta",
    utama: true,
    // Additional fields for payment integration
    recipientName: "John Doe",
    phoneNumber: "081234567890",
    fullAddress: "Jalan Melati No. 123, Jakarta Selatan, DKI Jakarta 12130",
    type: "Rumah",
    isPrimary: true,
  },
  {
    id: 2,
    label: "Alamat Kantor",
    detail: "Jl. Jendral Sudirman Kav. 45, Jakarta Pusat",
    kategori: "Kantor",
    kodepos: "10220",
    provinsi: "DKI Jakarta",
    utama: false,
    // Additional fields for payment integration
    recipientName: "Jane Smith",
    phoneNumber: "081234567891",
    fullAddress: "Jl. Jendral Sudirman Kav. 45, Jakarta Pusat, DKI Jakarta 10220",
    type: "Kantor",
    isPrimary: false,
  },
]);

export function useAddress() {
  // Computed properties
  const primaryAddress = computed(() => {
    return addresses.value.find((addr) => addr.utama) || addresses.value[0];
  });

  const addressCount = computed(() => addresses.value.length);

  // Methods
  const addAddress = (addressData) => {
    const newId = Math.max(...addresses.value.map((addr) => addr.id)) + 1;

    // Convert Alamat.vue format to payment format
    const newAddress = {
      id: newId,
      label: addressData.label,
      detail: addressData.detail,
      kategori: addressData.kategori,
      kodepos: addressData.kodepos,
      provinsi: addressData.provinsi,
      utama: addressData.utama,
      // Payment integration fields
      recipientName: addressData.recipientName || "Nama Penerima",
      phoneNumber: addressData.phoneNumber || "081234567890",
      fullAddress: `${addressData.detail}, ${addressData.provinsi} ${addressData.kodepos}`,
      type: addressData.kategori,
      isPrimary: addressData.utama,
    };

    addresses.value.push(newAddress);

    // If this is set as primary, unset others
    if (addressData.utama) {
      addresses.value.forEach((addr) => {
        if (addr.id !== newId) {
          addr.utama = false;
          addr.isPrimary = false;
        }
      });
    }

    return newAddress;
  };

  const updateAddress = (id, addressData) => {
    const index = addresses.value.findIndex((addr) => addr.id === id);
    if (index !== -1) {
      // Convert Alamat.vue format to payment format
      const updatedAddress = {
        ...addresses.value[index],
        label: addressData.label,
        detail: addressData.detail,
        kategori: addressData.kategori,
        kodepos: addressData.kodepos,
        provinsi: addressData.provinsi,
        utama: addressData.utama,
        // Payment integration fields
        recipientName: addressData.recipientName || addresses.value[index].recipientName,
        phoneNumber: addressData.phoneNumber || addresses.value[index].phoneNumber,
        fullAddress: `${addressData.detail}, ${addressData.provinsi} ${addressData.kodepos}`,
        type: addressData.kategori,
        isPrimary: addressData.utama,
      };

      addresses.value[index] = updatedAddress;

      // If this is set as primary, unset others
      if (addressData.utama) {
        addresses.value.forEach((addr) => {
          if (addr.id !== id) {
            addr.utama = false;
            addr.isPrimary = false;
          }
        });
      }

      return updatedAddress;
    }
    return null;
  };

  const deleteAddress = (id) => {
    const index = addresses.value.findIndex((addr) => addr.id === id);
    if (index !== -1) {
      const deletedAddress = addresses.value[index];
      addresses.value.splice(index, 1);

      // If deleted address was primary, set first address as primary
      if (deletedAddress.utama && addresses.value.length > 0) {
        addresses.value[0].utama = true;
        addresses.value[0].isPrimary = true;
      }

      return deletedAddress;
    }
    return null;
  };

  const getAddressById = (id) => {
    return addresses.value.find((addr) => addr.id === id);
  };

  const setPrimaryAddress = (id) => {
    addresses.value.forEach((addr) => {
      addr.utama = addr.id === id;
      addr.isPrimary = addr.id === id;
    });
  };

  // Load addresses from localStorage on initialization
  const loadAddressesFromStorage = () => {
    try {
      const savedAddresses = localStorage.getItem("userAddresses");
      if (savedAddresses) {
        addresses.value = JSON.parse(savedAddresses);
      }
    } catch (error) {
      console.error("Error loading addresses from storage:", error);
    }
  };

  // Save addresses to localStorage
  const saveAddressesToStorage = () => {
    try {
      localStorage.setItem("userAddresses", JSON.stringify(addresses.value));
    } catch (error) {
      console.error("Error saving addresses to storage:", error);
    }
  };

  // Initialize addresses
  loadAddressesFromStorage();

  return {
    // State
    addresses,

    // Computed
    primaryAddress,
    addressCount,

    // Methods
    addAddress,
    updateAddress,
    deleteAddress,
    getAddressById,
    setPrimaryAddress,
    saveAddressesToStorage,
  };
}
