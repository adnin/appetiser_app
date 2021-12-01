import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";
// import { CHECK_AUTH } from "./store/actions.type";
// import ApiService from "./common/api.service";

axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Token ${JwtService.getToken()}` }
});

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios); // provide 'axios'

// Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) =>
//   Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
// );

app.mount("#app");
