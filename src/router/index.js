import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/Login/LoginPage.vue";
import RegisterPage from "../pages/Login/RegisterPage.vue";
import Index from "@/pages/Index";
import SelfReview from "@/pages/SelfReview";

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { title: "Вход" },
  },
  {
    path: "/registration",
    name: "registration",
    component: RegisterPage,
    meta: { title: "Регистрация" },
  },
  {
    path: "/",
    name: "home",
    component: Index,
    children: [
      {
        path: "/self-review",
        component: SelfReview,
        meta: { title: "Self Review" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " - Perforator";

  next();
});

export default router;
