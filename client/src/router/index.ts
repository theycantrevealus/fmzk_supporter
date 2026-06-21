import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import MasterItem from "../views/Master.Item.vue";
import CraftingPlan from "../views/Crafting.Plan.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/master_item", component: MasterItem },
  { path: "/crafting_plan", component: CraftingPlan },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
