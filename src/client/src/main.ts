import { createApp } from "vue";
import { useUserFilterStore } from "@/stores/userFilter";
import router from "./router";
import App from "./App.vue";
import store from "@/store.js";
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
  },
  icons: {
    defaultSet: "mdi",
  },
  components,
  directives,
});

const app = createApp(App);

axios.defaults.withCredentials = true;

// Primero, registra las instancias de plugin y luego úsalas
app.use(router);
app.use(vuetify);
app.use(VueViewer);// Primero inicializa Pinia
app.use(store);
// Luego, accede a la tienda después de que Pinia esté inicializado
const userFilterStore = useUserFilterStore();

router.isReady().then(() => {
  app.mount("#app");
});

