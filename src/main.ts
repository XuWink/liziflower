import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./store/user";
import { Store } from "vuex";
import App from "./App.vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

declare module "@vue/runtime-core" {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}



app.use(store).use(router).use(ElementPlus, { locale: zhCn }).mount("#app");
