<template>
  <section class="pricelist-container">
    <h2 class="main-title">Pricelist Digital</h2>
    <div class="table-section" v-for="(table, index) in tableList" :key="index">
      <h3 class="table-title">{{ table.title }}</h3>
      <div class="table-wrapper">
        <table class="price-table">
          <thead>
            <tr>
              <th>SHEET</th>
              <th>Print 4/0</th>
              <th>Print 4/4</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in table.data" :key="i">
              <td>{{ row.sheet }}</td>
              <td>{{ row.print40.toLocaleString() }}</td>
              <td>{{ row.print44.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PricelistTable",
  data() {
    const sampleData = [
      { sheet: "1-10", print40: 3400, print44: 6500 },
      { sheet: "11-25", print40: 2900, print44: 5400 },
      { sheet: "26-50", print40: 2800, print44: 5300 },
      { sheet: "51-100", print40: 2650, print44: 4300 },
      { sheet: ">100", print40: 1850, print44: 3350 },
    ];

    return {
      tableList: [
        { title: "HVS 70-80 GR", data: sampleData },
        { title: "Art Paper 120 GR", data: sampleData },
        { title: "Art Carton 210 GR", data: sampleData },
        { title: "Art Carton 260 GR", data: sampleData },
        { title: "Art Carton 310 GR", data: sampleData },
        { title: "Ivory 230 GR", data: sampleData },
        { title: "Ivory 260 GR", data: sampleData },
        { title: "Ivory 310 GR", data: sampleData },
        { title: "Linen 250 GR", data: sampleData },
        { title: "Concorde 220 GR", data: sampleData },
      ],
    };
  },
};
</script>

<style scoped>
.pricelist-container {
  padding: 7rem 1rem;
  text-align: center;
}

.main-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.table-section {
  margin-bottom: 3rem;
}

.table-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
}

.price-table {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.price-table th,
.price-table td {
  border: 1px solid #ccc;
  padding: 0.8rem;
  text-align: center;
  font-size: 1rem;
}

.price-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style>
