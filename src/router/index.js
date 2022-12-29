import { createRouter, createWebHashHistory } from "vue-router";

import TripView from "@/views/TripView.vue";
import WorldView from "@/views/WorldView.vue";

const routes = [
  {
    path: "/",
    name: "Trip",
    component: TripView
  },
  {
    path: "/world",
    name: "World",
    component: WorldView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;