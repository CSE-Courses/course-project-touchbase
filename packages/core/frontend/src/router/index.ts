import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/app/browse",
  },
  {
    path: "/app/",
    name: "Workspace",
    component: () => import(/* webpackChunkName: "Workspace" */ "@/views/Workspace.vue"),
    redirect: "/app/browse",
    children: [
      {
        path: "/app/resource/:id",
        name: "Resource",
        component: () => import("../views/Resource.vue"),
      },
      {
        path: "/app/browse/:collectionID?",
        name: "Browse",
        component: () => import(/* webpackChunkName: "Browse" */ "@/views/lists/BrowseList.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "Register" */ "@/views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("auth");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else if (!authRequired && loggedIn) {
    next("/app");
  } else {
    next();
  }
});
