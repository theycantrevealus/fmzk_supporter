import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver(),
        (componentName) => {
          if (componentName === "Select") {
            return {
              name: "default",
              from: "primevue/select",
            };
          } else if (componentName === "Stepper") {
            return {
              name: "default",
              from: "primevue/stepper",
            };
          } else if (componentName === "StepList") {
            return {
              name: "default",
              from: "primevue/steplist",
            };
          } else if (componentName === "StepPanels") {
            return {
              name: "default",
              from: "primevue/steppanels",
            };
          } else if (componentName === "StepItem") {
            return {
              name: "default",
              from: "primevue/stepitem",
            };
          } else if (componentName === "Step") {
            return {
              name: "default",
              from: "primevue/step",
            };
          } else if (componentName === "StepPanel") {
            return {
              name: "default",
              from: "primevue/steppanel",
            };
          } else if (componentName === "ToggleSwitch") {
            return {
              name: "default",
              from: "primevue/toggleswitch",
            };
          } else if (componentName === "Tabs") {
            return {
              name: "default",
              from: "primevue/tabs",
            };
          } else if (componentName === "TabList") {
            return {
              name: "default",
              from: "primevue/tablist",
            };
          } else if (componentName === "Tab") {
            return {
              name: "default",
              from: "primevue/tab",
            };
          } else if (componentName === "TabPanels") {
            return {
              name: "default",
              from: "primevue/tabpanels",
            };
          } else if (componentName === "TabPanel") {
            return {
              name: "default",
              from: "primevue/tabpanel",
            };
          }
        },
      ],
    }),
  ],
});
