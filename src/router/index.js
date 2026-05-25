import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Favorites from "../views/Favorites.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/detail/:id", name: "Detail", component: Detail },
  { path: "/favorites", name: "Favorites", component: Favorites },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
