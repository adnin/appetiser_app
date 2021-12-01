import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { guest: true }
  },
  {
    path: "/verification",
    name: "Verification",
    component: () => import("../views/Verification.vue"),
    meta: { toVerify: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/register");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.toVerify)) {
    console.log(store.getters.toVerify);
    if (store.getters.toVerify) {
      next();
      return;
    }
    next("/register");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated && store.getters.toVerify) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
