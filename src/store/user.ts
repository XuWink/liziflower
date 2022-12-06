import Vuex, {useStore} from "vuex";
import request from "@/api/request";
import { apiList } from "@/enums/apiList";
import router from "@/router";
import { ElMessage } from "element-plus";

const store = useStore();


export default new Vuex.Store({
  state: {
    //全局状态
    userid: sessionStorage.userid || null,
    username: sessionStorage.username || null,
    phone: sessionStorage.phone || null,
    sex: sessionStorage.sex || null,
    avator: sessionStorage.avator || null,
    money: sessionStorage.money || 0,
    score: sessionStorage.score || 0,
    age: sessionStorage.age || 0,

    // flower: sessionStorage.flower || [],
  },
  mutations: {
    //同步的
    SETUSER(state, payload) {

      state.userid = payload.userid;
      sessionStorage.userid = payload.userid;

      state.username = payload.username;
      sessionStorage.username = payload.username;

      state.phone = payload.phone;
      sessionStorage.phone = payload.phone;

      state.sex = payload.sex;
      sessionStorage.sex = payload.sex;

      state.avator = payload.avator;
      sessionStorage.avator = payload.avator;

      state.money = payload.money;
      sessionStorage.money = payload.money;

      state.score = payload.score;
      sessionStorage.score = payload.score;
      state.age = payload.age;
      sessionStorage.age = payload.age;
    },
    //
    // SETFLOWERTYPE(state, payload) {
    //   state.flower = payload;
    //   sessionStorage.flower = payload;
    // },

    UPDATEINFO(state,payload){
      state.phone = payload.phone;
      sessionStorage.phone = payload.phone;

      state.sex = payload.sex;
      sessionStorage.sex = payload.sex;

      state.age = payload.age;
      sessionStorage.age = payload.age;

    }
  },
  actions: {
    //异步
    async userLogin(context, sendData) {
      const res = await request.post(apiList.login, sendData);
      if (res.data.code === "200") {
        // console.log(res.data.data)
        context.commit("SETUSER", res.data.data);
        ElMessage.success("登录成功");
        // setTimeout(() => {
        //   router.replace({ name: "li-zi-container" });
        // }, 1000);
        router.replace("/");
      } else {
        // console.log('error')
        ElMessage.error("登录失败");
      }
    },

    async updateInfo(context,value){ //更新用户信息
      await request.put(apiList.updateInfo, value)
          .then(res => {
            if (res.data.code === '200'){
              // console.log(res);
              context.commit("UPDATEINFO",value);
              ElMessage.success("更新成功");

            }else {
              ElMessage.error("更新失败");
            }
          }).catch(err => {
            console.log(err);
          })
    }
  },
  modules: {},
});
