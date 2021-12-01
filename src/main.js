import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
