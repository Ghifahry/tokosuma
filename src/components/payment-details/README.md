# Payment Details Components

Komponen-komponen untuk halaman checkout/payment details yang telah dipisahkan untuk clean code dan maintainability yang lebih baik.

## Struktur Komponen

### 1. AddressSection.vue

Komponen untuk menampilkan dan memilih alamat pengiriman.

**Props:**

- `addresses` (Array): Daftar alamat pengguna
- `selectedAddress` (Object): Alamat yang dipilih

**Events:**

- `show-address-modal`: Emit ketika tombol tambah alamat diklik
- `select-address`: Emit ketika alamat dipilih
- `edit-address`: Emit ketika tombol edit alamat diklik

### 2. ProductDetailsSection.vue

Komponen untuk menampilkan detail produk yang dipilih untuk checkout.

**Props:**

- `selectedItems` (Array): Daftar produk yang dipilih

### 3. PaymentMethodSection.vue

Komponen untuk memilih metode pembayaran.

**Props:**

- `paymentMethods` (Array): Daftar metode pembayaran tersedia
- `selectedPaymentMethod` (Object): Metode pembayaran yang dipilih

**Events:**

- `select-payment-method`: Emit ketika metode pembayaran dipilih

### 4. PromoSection.vue

Komponen untuk memasukkan dan mengelola kode promo.

**Props:**

- `appliedPromo` (Object): Promo yang sedang diterapkan

**Events:**

- `apply-promo`: Emit ketika promo diterapkan
- `remove-promo`: Emit ketika promo dihapus

### 5. TransactionSummary.vue

Komponen untuk menampilkan ringkasan transaksi dan perhitungan total.

**Props:**

- `selectedItems` (Array): Daftar produk yang dipilih
- `shippingCost` (Number): Biaya pengiriman
- `appliedPromo` (Object): Promo yang diterapkan

### 6. AddressModal.vue

Modal untuk menambah atau mengedit alamat.

**Props:**

- `show` (Boolean): Status tampilan modal
- `editingAddress` (Object): Alamat yang sedang diedit (null jika menambah baru)

**Events:**

- `close`: Emit ketika modal ditutup
- `save-address`: Emit ketika alamat disimpan

### 7. PaymentButton.vue

Komponen untuk tombol pembayaran dan informasi keamanan.

**Props:**

- `canProceed` (Boolean): Status apakah pembayaran dapat diproses
- `selectedItems` (Array): Daftar produk yang dipilih

**Events:**

- `process-payment`: Emit ketika tombol pembayaran diklik

### 8. PaymentSummary.vue

Komponen wrapper yang menggabungkan semua komponen bagian kanan (payment summary).

**Props:**

- `paymentMethods` (Array): Daftar metode pembayaran
- `selectedPaymentMethod` (Object): Metode pembayaran yang dipilih
- `appliedPromo` (Object): Promo yang diterapkan
- `selectedItems` (Array): Daftar produk yang dipilih
- `shippingCost` (Number): Biaya pengiriman
- `canProceed` (Boolean): Status apakah pembayaran dapat diproses

**Events:**

- `select-payment-method`: Emit ketika metode pembayaran dipilih
- `apply-promo`: Emit ketika promo diterapkan
- `remove-promo`: Emit ketika promo dihapus
- `process-payment`: Emit ketika pembayaran diproses

## Penggunaan

```vue
<template>
  <div class="payment-details-container">
    <div class="payment-content">
      <!-- Left Side -->
      <div class="payment-left">
        <AddressSection :addresses="addresses" :selected-address="selectedAddress" @show-address-modal="showAddressModal = true" @select-address="selectAddress" @edit-address="editAddress" />

        <ProductDetailsSection :selected-items="selectedItems" />
      </div>

      <!-- Right Side -->
      <div class="payment-right">
        <PaymentSummary
          :payment-methods="paymentMethods"
          :selected-payment-method="selectedPaymentMethod"
          :applied-promo="appliedPromo"
          :selected-items="selectedItems"
          :shipping-cost="shippingCost"
          :can-proceed="canProceed"
          @select-payment-method="selectPaymentMethod"
          @apply-promo="applyPromo"
          @remove-promo="removePromo"
          @process-payment="processPayment"
        />
      </div>
    </div>

    <AddressModal :show="showAddressModal" :editing-address="editingAddress" @close="closeAddressModal" @save-address="saveAddress" />
  </div>
</template>

<script>
import { AddressSection, ProductDetailsSection, PaymentSummary, AddressModal } from "@/components/payment-details";

export default {
  components: {
    AddressSection,
    ProductDetailsSection,
    PaymentSummary,
    AddressModal,
  },
  // ... rest of component logic
};
</script>
```

## Keuntungan Refactoring

1. **Separation of Concerns**: Setiap komponen memiliki tanggung jawab yang spesifik
2. **Reusability**: Komponen dapat digunakan kembali di tempat lain
3. **Maintainability**: Lebih mudah untuk maintain dan debug
4. **Testability**: Setiap komponen dapat di-test secara terpisah
5. **Clean Code**: Kode lebih terorganisir dan mudah dibaca
6. **Scalability**: Mudah untuk menambah fitur baru tanpa mengubah komponen lain

## File Index

File `index.js` menyediakan export yang mudah untuk semua komponen:

```javascript
import { AddressSection, ProductDetailsSection, PaymentMethodSection, PromoSection, TransactionSummary, AddressModal, PaymentButton, PaymentSummary } from "@/components/payment-details";
```
