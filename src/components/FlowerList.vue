<template>
  <el-space wrap style="width: 100%; display: flex" :size="22">
    <el-card class="card" shadow="hover" v-for="(item , index) in cate" :key="index">
      <div class="image" style="height: 65%">
        <el-image
            :style="{height:'100%'}"
            fit="cover"
            :preview-src-list="[item.flowerimage]"
            hide-on-click-modal="ture"
            :src="item.flowerimage">
        </el-image>
      </div>
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
            <!--              <el-check-tag style="width: 100%;text-align: center" @click="addCart">-->
            <el-button @click="addCart(item)">
              <el-icon style="right: 5px;color: orangered" size="large">
                <ShoppingCart/>
              </el-icon>
            </el-button>
            <!--              </el-check-tag>-->
          </div>

        </div>
      </div>
    </el-card>
  </el-space>

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
      getAll()
    });

    const store = useStore();
    const cate = ref([]);

    const goDetail = (item) => {//跳转详情页
      // console.log(item)
      let id = item.flowerid;
      router.push({path: "/details", query: {flowerId: id}});
    }


    const getAll = async () => {
      await request
          .get(apiList.getAllFlowers)
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
      addCart,
      goDetail
    };
  },
});
</script>

<style scoped>
.swiper-container {
  width: 90%;
  margin: auto;
  padding-top: 10px;
}

.flower-contain {
  display: flex;
  /*flex: 1;*/
  width: 100%;
  /*margin-left: 35px;*/
}

.card ::v-deep .el-card__body {
  width: 246px;
  height: 340px;
  padding: 5px;
  margin: 0px;
  border: none;

  /*margin-left: 25px;*/

}

.image {
  width: 100%;
  /*height: 65%;*/
}

.el-image ::v-deep {

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

.el-button ::v-deep {
  border: none;
  /*background-color: aquamarine;*/
}

.el-pagination {
  text-align: center;
}
</style>