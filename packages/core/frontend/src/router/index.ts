import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import api from "@/api";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/workspace",
  },
  {
    path: "/workspace",
    beforeEnter: async (to, from, next) => {
      const settingsService = api.service("settings");
      const authRes = await api.get("authentication");
      const settingsData = await settingsService.find({
        query: {
          ownerID: authRes.user.id,
        },
      });
      const settings = settingsData.data[0];
      next({ name: "Workspace", params: { workspace: settings.lastWorkspaceID } });
    },
  },
  {
    path: "/workspace/:workspace",
    name: "Workspace",
    component: () => import(/* webpackChunkName: "Workspace" */ "@/views/Workspace.vue"),
    redirect: (to) => {
      return { name: "Browse", params: { workspace: to.params.workspace } };
    },
    children: [
      {
        path: "resource/:id",
        name: "Resource",
        component: () => import("../views/Resource.vue"),
      },
      {
        path: "browse/:collectionID?",
        name: "Browse",
        component: () => import(/* webpackChunkName: "Browse" */ "@/views/lists/BrowseList.vue"),
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import(/* webpackChunkName: "Browse" */ "@/views/lists/CalendarList.vue"),
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

router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  let loggedIn = true;
  try {
    await api.reAuthenticate();
  } catch {
    loggedIn = false;
  }

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else if (!authRequired && loggedIn) {
    next("/workspace");
  } else {
    next();
  }
});
