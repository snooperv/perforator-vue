import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/Login/LoginPage.vue";
import RegisterPage from "../pages/Login/RegisterPage.vue";
import Index from "@/pages/Index";
import SelfReview from "@/pages/SelfReview/SelfReview";
import NotFound from "@/components/layouts/NotFound";
import IRate from "@/pages/IRate/IRate";
import IManager from "@/pages/IManager/IManager";
import PeerApproval from "@/pages/IManager/PeerApproval/PeerApproval";

const routes = [
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
      {
        path: "/i-rate",
        component: IRate,
        meta: { title: "Я оцениваю" },
      },
      {
        path: "/i-manager",
        component: IManager,
        children: [
          {
            path: "approval",
            component: PeerApproval,
            meta: { title: "Я менеджер - утверждение пиров" },
          },
          {
            path: "my-team",
            component: PeerApproval,
            meta: { title: "Я менеджер - моя команда" },
          },
        ],
      },
      {
        path: "/page-not-found",
        component: NotFound,
        meta: { title: "Страница не найдена" },
      },
    ],
  },

  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: "/page-not-found",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " - Perforator";
  next();
});

export default router;
