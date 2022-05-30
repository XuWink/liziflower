import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import Vuex from "vuex";
import axios from "axios";
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

//导航守卫
router.beforeEach((to,from,next)=>{
  let userid = sessionStorage.userid;
  if (to.meta.needLogin){//需要登录的路由
    if (userid){
      next();
    }else {
      next({path: '/'})
    }
  }else {
    next();
  }
})

app.use(store).use(router).use(ElementPlus).mount("#app");
