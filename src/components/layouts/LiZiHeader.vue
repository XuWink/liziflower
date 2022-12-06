<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router="false"
  >
    <el-menu-item index="/">
      <li-zi-icon></li-zi-icon>
    </el-menu-item>
    <el-menu-item style="min-width: 200px" index="/">
      <el-icon>
        <HomeFilled/>
      </el-icon>
      HoMe
    </el-menu-item>
    <el-sub-menu style="right: 15px" index="1">
      <template #title> 分类</template>
      <el-menu-item
          class="cate"
          v-for="item in category"
          :key="item.cateid"
          @click="handleToPage(item.name)"
          index="item"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/notice">
      <el-icon>
        <Cherry/>
      </el-icon>
      公告
    </el-menu-item>

    <el-menu-item index="/flower-art">
      <el-icon>
        <Cherry/>
      </el-icon>
      花艺花语
    </el-menu-item>

    <el-menu-item v-if="store.state.userid" index="/shopping-cart">
      <el-icon>
        <ShoppingCartFull/>
      </el-icon>
      购物车
    </el-menu-item>

    <el-sub-menu style="right: 15px" v-if="store.state.userid" index="2">
      <template #title>
        <el-avatar v-if="store.state.avator" shape="square" :size="35" :fit="fit" :src="url"/>
      </template>
      <el-menu-item index="/personal">
        <el-icon>
          <User/>
        </el-icon>
        个人信息
      </el-menu-item>


      <el-menu-item index="/money">
        <el-icon>
          <Money/>
        </el-icon>
        余额管理
      </el-menu-item>

      <el-menu-item @click="goToPage('/paid-orders',10)" index="/paid-orders">
        <el-icon>
          <Histogram/>
        </el-icon>
        我的订单
      </el-menu-item>


<!--      <el-menu-item index="/password">-->
<!--        <el-icon>-->
<!--          <Edit/>-->
<!--        </el-icon>-->
<!--        修改信息-->
<!--      </el-menu-item>-->
      <el-menu-item index="/address">
        <el-icon>
          <Location/>
        </el-icon>
        地址管理
      </el-menu-item>

      <el-menu-item @click="handleLogout" index="logout">
        退出登录
      </el-menu-item>


    </el-sub-menu>

    <el-menu-item v-if="!store.state.userid" index="/sign-in">
      登录
    </el-menu-item>
    <el-menu-item v-if="!store.state.userid" index="/sign-up">
      注册
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";

export default defineComponent({
  setup() {
    const store = useStore();
    const url = ref(store.state.avator);
    // const  proxy  = getCurrentInstance();
    // const router = useRouter()

    onMounted(() => {
      getCategory();
    });
    const category = ref([]); //分类
    const getCategory = () => {
      //获取分类
      request
          .get(apiList.flowerCategory)
          .then((res) => {
            if (res.data.code === "200") {
              category.value = res.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    //退出登录
    const handleLogout = () => {
      router.replace('home');
      window.sessionStorage.clear()//清空缓存
      window.location.reload();
    };

    const handleToPage = (value: string) => {
      // console.log(value)
      //跳转分类页面
      router.push({path: "/flower-category", query: {cateName: value}});
    };

    const goToPage = (path: any, status: number) => {
      router.push({path: path, query: {status: status}})
    }

    return {
      url, //头像
      store,
      handleLogout,
      category,
      handleToPage,
      goToPage,
    };
  },
});
</script>

<style scoped>
.cate {
  width: 5rem !important;
}

.el-menu-demo ::v-deep {
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  width: 100%;
  /*margin: 0 auto;*/
  border-bottom: 0.5px solid wheat;
  font-size: 25px;
  font-weight: bold;
}

.el-menu-item ::v-deep {
  /*width: 10%;*/
}

</style>