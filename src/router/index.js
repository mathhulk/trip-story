import { createRouter, createWebHashHistory } from "vue-router";

import TripView from "@/views/TripView.vue";
import CountriesView from "@/views/CountriesView.vue";
import CountryView from "@/views/CountryView.vue";
import CityView from "@/views/CityView.vue";
import LocationView from "@/views/LocationView.vue";

const routes = [
  {
    path: "/",
    name: "Trip",
    component: TripView
  },
  {
    path: "/countries",
    name: "Countries",
    component: CountriesView
  },
  {
    path: "/countries/:country",
    name: "Country",
    component: CountryView,
    props: true
  },
  {
    path: "/countries/:country/:city",
    name: "City",
    component: CityView,
    props: true
  },
  {
    path: "/countries/:country/:city/:location",
    name: "Location",
    component: LocationView,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;