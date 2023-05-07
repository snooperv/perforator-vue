import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import VueTheMask from "vue-the-mask";

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookies)
  .use(VueTheMask)
  .mount("#app");
