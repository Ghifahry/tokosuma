import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);

// Cek status login saat aplikasi dimuat
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
app.config.globalProperties.$isLoggedIn = isLoggedIn;

app.mount("#app");
