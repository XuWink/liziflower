<template>
  <div class="detail">
      <div class="flower-contain">
        <el-space wrap :size="10">
          <el-card shadow="hover" v-for="(item , index) in cate" :key="index">
            <el-image
                fit="cover"
                :preview-src-list="[item.flowerimage]"
                hide-on-click-modal="ture"
                :src="item.flowerimage">
            </el-image>
            <div style="height: 35%">
              <div style="height: 25%">
                <span><el-link @click="goDetail(item)" style="font-size: 20px">{{ item.name }}</el-link></span>
              </div>
              <div class="details" style="height: 35%;overflow: hidden">
                <span style="color:lightcoral">{{ item.describe }}</span>
              </div>
              <div style="display: flex;width: 100%;height: 35%">
                <div class="price" style="width: 50%">
                  <span style="color: orangered;font-size: 18px">特价￥ {{ item.price }}</span>
                </div>
                <div class="add-cart" style="width: 50%">
                  <el-button @click="addCart(item)">
                    <el-icon style="right: 5px;color: orangered" size="large">
                      <ShoppingCart/>
                    </el-icon>
                  </el-button>
                </div>

              </div>
            </div>
          </el-card>
        </el-space>

      </div>


  </div>
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
      getFlowers()
    });

    const store = useStore();
    const route = useRoute()
    const cate = ref([]);

    const goDetail = (item) => {//跳转详情页
      // console.log(item)
      let id = item.flowerid;
      router.push({path: "/details", query: {flowerId: id}});
    }


    const getFlowers = async () => {
      await request
          .get(apiList.type + route.query.cateName)
          .then(res => {
            if (res.data.code === "200") {
              cate.value = res.data.data
              // location.reload()
              console.log(cate)
            } else {
              ElMessage.error("获取异常");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const addCart = async (item) => {//添加购物车
      console.log(item.flowerid)
      let sentData = {
        userid: store.state.userid,
        flowerid: item.flowerid
      }

      let response = await add_Cart(sentData);
      if (response.data.code === '200') {
        ElNotification({
          title: '添加',
          message: name + '成功添加',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '添加',
          message: name + '成功失败',
          type: 'error'
        })
      }


    }


    return {
      store,
      cate,
      getFlowers,
      addCart,
      goDetail
    };
  },
});
</script>

<style scoped>
.flower-contain {
  display: flex;
  flex: 1;
  width: 100%;
  /*margin-left: 35px;*/
}

.detail {
  display: flex;
  /*justify-content: center;*/
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  /*border: 1px solid black;*/
}

.el-card ::v-deep .el-card__body {
  width: 230px;
  height: 350px;
  padding: 5px;
  margin: 0px;
  border: none;
  overflow: hidden;
  /*margin-left: 25px;*/

}

.el-image ::v-deep {
  height: 65%;
  width: 100%;
  border: none;
  border-radius: 2px;
}

.el-button ::v-deep {
  border: none;
  font-size: 18px;

}

.details {
  display: flex;
}

.pagepluge {
  /*margin-top: 35px;*/
  /*position: fixed;*/
  /*bottom: 0;*/
  /*height: 40px;*/
  /*width: 90%;*/
  /*text-align: center;*/
}

.el-pagination {
  text-align: center;
}
</style>