import { createApp } from "vue";

import router from "./router";

import App from "./App.vue";

import "mapbox-gl/dist/mapbox-gl.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/900.css";

import "@/assets/reset.css";

createApp(App).use(router).mount("#app");
