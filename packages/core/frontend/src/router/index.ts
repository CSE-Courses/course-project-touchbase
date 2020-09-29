import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app/calendar",
    name: "Calendar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Calendar.vue"),
  },
  {
    path: "/register",
    name: "Registration",
    component: () => import(/* webpackChunkName: "registration" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Authentication",
    component: () => import(/* webpackChunkName "authentication" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
