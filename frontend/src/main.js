import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Crear la aplicación de Vue
const app = createApp(App);

// Inicializar Pinia
const pinia = createPinia();
app.use(pinia);

// Configurar el router
app.use(router);

// Montar la aplicación
app.mount("#app");
