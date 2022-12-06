<template>
  <el-container class="detail">
    <div>


      <div style="height: 50px;">
        <span style="font-size: 25px;font-family:华文宋体">猜你喜欢</span>
        <el-tag style="border: none;background-color: white;">
          <span style="color:orangered;font-weight: bold;font-size: 18px">个性推荐</span>
        </el-tag>
      </div>
      <div>


        <el-row :gutter="20" :style="{ display: 'flex' }">
          <el-col :span="4" v-for="(item, index) in cate" :key="index">
            <div class="hov">
              <el-card shadow="never" class="card">
                <div>
                  <el-image
                      class="image"
                      :style="{ height: '100%' }"
                      fit="cover"
                      :preview-src-list="[item.flowerimage]"
                      hide-on-click-modal="ture"
                      :src="item.flowerimage"
                  >
                  </el-image>
                </div>

                <div style="height: 55%; text-align: center">
                  <div style="height: 30%">
              <span>
                <el-link @click="goDetail(item)" style="font-size: 20px">
                  {{ item.name }}
                </el-link>
              </span>
                  </div>
                  <!-- <div class="details" style="height: 35%; overflow: hidden">
                    <span style="color: lightcoral">{{ item.describe }}</span>
                  </div> -->
                  <div style="display: flex; width: 100%; height: 30%">
                    <div class="price" style="width: 50%">
                <span style="color: orangered; font-size: 18px"
                >特价￥ {{ item.price }}</span
                >
                    </div>
                    <div class="add-cart" style="width: 50%">
                      <el-button @click="addCart(item)">
                        <el-icon style="right: 5px; color: orangered" size="large">
                          <ShoppingCart/>
                        </el-icon>
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </el-container>
</template>

<script>
import {defineComponent, onMounted} from "@vue/runtime-core";
import {useStore} from "vuex";
import request from "@/api/request.ts";
import {apiList} from "@/enums/apiList.ts";
import {ElMessage, ElNotification} from "element-plus";
import {ref} from "vue";
import router from "@/router/index.ts";
import {add_Cart} from "@/mixins/mixins";

export default defineComponent({
  setup() {
    onMounted(() => {
      getAll();
    });

    const store = useStore();
    const cate = ref([]);

    const goDetail = (item) => {
      //跳转详情页
      // console.log(item)
      let id = item.flowerid;
      router.push({path: "/details", query: {flowerId: id}});
    };

    const getAll = async () => {
      await request
          .get(apiList.getAllFlowers)
          .then((res) => {
            if (res.data.code === "200") {
              cate.value = res.data.data;
              // location.reload()
              console.log(cate);
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
          message: name + "添加失败",
          type: "error",
        });
      }
    };

    return {
      store,
      cate,
      addCart,
      goDetail,
    };
  },
});
</script>

<style scoped>
.detail {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
}

.card {
  margin-bottom: 5px;
  border-radius: 15px;
}

.hov :hover {
  transform: translateZ(15px);
  border: rgb(255, 145, 94);
  background-color: rgb(247, 249, 250);
}

.el-card ::v-deep .el-card__body {
  height: 380px;
  padding: 0 0 15px 0;
  min-height: 380px;
  min-width: 260px;
  overflow: visible;
  border: none;

}

.image {
  width: 100%;
}
</style>