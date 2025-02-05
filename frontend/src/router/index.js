import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  { path: "/", component: HomeView, meta: { title: "Inicio - LeGame" } },
  {
    path: "/login",
    component: LoginView,
    meta: { title: "Iniciar Sesión - LeGame" },
  },
  {
    path: "/register",
    component: RegisterView,
    meta: { title: "Registro - LeGame" },
  },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { title: "Dashboard - LeGame", requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "LeGame";
});

export default router;
