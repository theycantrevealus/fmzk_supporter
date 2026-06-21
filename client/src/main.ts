import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/table.css";
import "./assets/game.css";

import App from "./App.vue";

import router from "./router";

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false || "none",
      },
    },
  })
  .use(router)
  .mount("#app");
