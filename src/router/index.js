import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import PayrollView from "../views/PayrollView.vue";
import AttendanceView from "../views/AttendanceView.vue";
import LeaveView from "../views/LeaveView.vue";
import ReportsView from "../views/ReportsView.vue";

const routes = [
  {
    path: "/",
    component: LoginView,
  },

  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },

  {
    path: "/employees",
    component: EmployeesView,
    meta: { requiresAuth: true },
  },

  {
    path: "/payroll",
    component: PayrollView,
    meta: { requiresAuth: true },
  },

  {
    path: "/attendance",
    component: AttendanceView,
    meta: { requiresAuth: true },
  },

  {
    path: "/leave",
    component: LeaveView,
    meta: { requiresAuth: true },
  },

  {
    path: "/reports",
    component: ReportsView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (to.meta.requiresAuth && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
