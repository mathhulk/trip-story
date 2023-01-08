import { createRouter, createWebHashHistory } from "vue-router";
import TripView from "@/views/TripView.vue";
import CountriesView from "@/views/CountriesView.vue";
import CountryView from "@/views/CountryView.vue";
import CityView from "@/views/CityView.vue";
import LocationView from "@/views/LocationView.vue";
import countries from "@/countries";

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

router.beforeEach((to) => {
  const { country, city, location } = to.params;

  let countryIndex, cityIndex, cities;

  if (country) {
    countryIndex = countries.findIndex(item => item.title.toLowerCase() === country);
    if (countryIndex === -1) return { path: "/countries" };
  }

  if (city) {
    cities = countries[countryIndex].cities;
    cityIndex = cities.findIndex(item => item.title.toLowerCase() === city);
    if (cityIndex === -1) return { path: "/countries/" + country };
  }

  if (location) {
    const { locations } = cities[cityIndex];
    const locationIndex = locations.findIndex(item => item.title.toLowerCase() === location);
    if (locationIndex === -1) return { path: "/countries/" + country + "/" + city };
  }
});

export default router;