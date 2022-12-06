<template>
  <el-container class="cont" element-loading-text="Loading..." v-loading.fullscreen.lock="fullscreenLoading">
    <el-main>
      <el-row :gutter="20" :style="{ display: 'flex' }">
        <el-col :span="4" v-for="(item, index) in cate" :key="index">
          <el-card :body-style="{ padding: '0px 0px 10px 0px' }" class="card" shadow="hover">
            <div>
              <el-image
                  class="image"
                  fit="cover"
                  :preview-src-list="[item.flowerimage]"
                  hide-on-click-modal="ture"
                  :src="item.flowerimage"
              />
            </div>

            <div style="height: 55%;text-align: center;">
              <div style="height: 30%;">
              <span>
                <el-link @click="goDetail(item)" style="font-size: 20px">{{
                    item.name
                  }}</el-link>
              </span>
              </div>
              <!-- <div style="height: 35%; overflow: hidden">
                <span style="font-size: small">{{ item.describe }}</span>
              </div> -->
              <div style="display: flex; width: 100%; height: 30%">
                <div class="price" style="width: 50%">
                <span style="color: orangered; font-size: 18px"
                >特价￥ {{ item.price }}</span
                >
                </div>
                <div class="add-cart" style="width: 50%">
                  <el-button @click="addCart(item)">
                    <el-icon style="right: 5px; color: black" size="large">
                      <ShoppingCart/>
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {defineComponent, onMounted} from "@vue/runtime-core";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import request from "@/api/request.ts";
import {apiList} from "@/enums/apiList.ts";
import {ElNotification, ElMessage} from "element-plus";
import {ref} from "vue";
import {add_Cart} from "@/mixins/mixins.ts";
import router from "@/router/index.ts";

export default defineComponent({
  setup() {
    onMounted(() => {
      getFlowers();
    });

    // const fullscreenLoading = ref(false);//加载动画
    const store = useStore();
    const route = useRoute();
    const cate = ref([]);
    const fullscreenLoading = ref(true);

    const goDetail = (item) => {
      //跳转详情页
      // console.log(item)
      let id = item.flowerid;
      router.push({path: "/details", query: {flowerId: id}});
    };

    const getFlowers = async () => {
      await request
          .get(apiList.type + route.query.cateName)
          .then((res) => {
            if (res.data.code === "200") {
              cate.value = res.data.data;
              fullscreenLoading.value = false;
            } else {
              ElMessage.error("获取异常");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };

    const addCart = async (item) => {
      if (!store.state.userid) {
        ElMessage.error("未登录");
        return;
      }
      //添加购物车
      console.log(item.flowerid);
      let sentData = {
        userid: store.state.userid,
        flowerid: item.flowerid,
      };

      let response = await add_Cart(sentData);
      if (response.data.code === "200") {
        ElNotification({
          title: "添加",
          message: name + "添加成功",
          type: "success",
        });
      } else {
        ElNotification({
          title: "添加",
          message: name + "添加失败失败",
          type: "error",
        });
      }
    };

    return {
      store,
      cate,
      getFlowers,
      addCart,
      goDetail,
      fullscreenLoading
    };
  },
});
</script>

<style scoped>
.el-card ::v-deep .el-card__body {
  height: 380px;
  padding: 0 0 15px 0;
  min-height: 380px;
  min-width: 260px;
  overflow: visible;
  margin-bottom: 5px;
}

.cont {
  background-color: white;
}

.image {
  width: 100%;
}
</style>