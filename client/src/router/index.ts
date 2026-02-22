import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import MasterItem from "../views/Master.Item.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/master_item", component: MasterItem },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
