<template>
  <div class="detail"
       :style="{
          boxShadow: `var(--el-box-shadow-light)`,
        }">
    <div class="detail-silde">
      <div>
        <el-image :src="data.flowerimage"
                  fit="cover"
                  :preview-src-list="[data.flowerimage]"
                  hide-on-click-modal="ture">
        </el-image>
      </div>
      <div style="margin-left: 35px;">
        <ul>
          <li><span>名字：{{ data.name }}</span></li>
          <li><span>描述：{{ data.describe }}</span></li>
          <li style="height: 55px"><span>花语：{{ data.language }}</span></li>
          <li><span>价格：{{ data.price }} ￥</span></li>
          <li><span>库存：{{ data.stocknumber }} 件</span></li>
          <li>
            <el-button @click="addCart(data)" type="primary"><span>加入购物车</span></el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="comment"
       :style="{
          boxShadow: `var(--el-box-shadow-lighter)`,
        }">
    <div style="margin-top: 20px;width:100%;height: 50px;justify-content: center;text-align: center;display: flex">
      <el-tag style="width: 100%;height: 100%"><span style="font-size: 25px;color: orangered">用户评价</span></el-tag>
    </div>
    <div style="width: 100%;">
      <el-empty v-if="comments.length===0" description="暂无评价" :image-size="200"/>
      <el-card v-for="( item , index ) in comments" :key="index" class="comment-card" shadow="false">
        <template #header>
          <div style="display: flex">
            <div>
              <el-avatar shape="square" :size="30" :src="lizilogo"/>
            </div>
            <span style="margin-left: 5px;line-height: 30px">
              <span style="font-size: 20px">客户评价：</span>
              <span v-text="item.remark"></span>
            </span>
          </div>
        </template>
        <span v-if="item.answer!==null"><span style="font-size: 20px;line-height: 30px">商家回复：</span>{{
            item.answer
          }}</span>
      </el-card>


    </div>
  </div>

</template>

<script setup>
import {onMounted} from "@vue/runtime-core";
import {useRoute} from "vue-router";
import request from "@/api/request.ts";
import {apiList} from "@/enums/apiList.ts";
import {ElMessage, ElNotification} from "element-plus";
import {ref} from "vue";
import lizilogo from "@/assets/lizilogo.png"
import {add_Cart} from "@/mixins/mixins.ts";
import {useStore} from "vuex";

onMounted(() => {
  getFlowerById();
  getCommentByUserIdAndFlowerId();//获取评论
})
const route = useRoute();
const store = useStore();
const data = ref({});
const comments = ref({});
const getFlowerById = async () => {

  await request.get(apiList.getFlowerDetail + route.query.flowerId)
      .then(res => {
        if (res.data.code === '200') {
          // console.log(res.data.data)
          // ElMessage.success("获取成功")
          data.value = res.data.data;
        } else {
          ElMessage.error("获取失败")
        }
      }).catch(err => {
        console.log(err)
      })
}

const addCart = async (data) => {//添加购物车
  console.log(data.flowerid)
  let sentData = {
    userid: store.state.userid,
    flowerid: data.flowerid
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

const getCommentByUserIdAndFlowerId = async () => {
  let flowerid = route.query.flowerId

  await request.get(apiList.getComment + flowerid)
      .then(res => {
        if (res.data.code === '200') {
          comments.value = res.data.data;
          // ElMessage.success("成功")
          // console.log(res.data.data)
        } else {
          ElMessage.error("获取评论失败")
        }
      }).catch(err => {
        console.log(err);
      })

}


</script>

<style scoped>
.detail {
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  overflow: hidden;
  /*border: 1px solid black;*/
}

/*.detail:hover{*/
/*  shower:*/
/*}*/

.detail-silde {
  display: flex;
  /*flex-direction: column;*/
  align-items: center;
  /*padding-top: 20px;*/
  width: 100%;
  height: 300px;
}

.comment {
  /*display: flex;*/
  flex: 1;
  /*justify-content: center;*/
  width: 60%;
  margin: 0 auto;
  /*border: 1px solid black;*/
}

.operate {
  height: 100px;
}

.comment-card ::v-deep {
  width: 100%;
  /*height: 135px;*/
  /*margin-top: 5px;*/
  top: 15px;
  border: none;
  border-bottom: 5px solid rgb(200, 245, 245);
}


li {
  width: 100%;
  height: 45px;
  line-height: 30px;
}

.el-image {
  width: 300px;
}


</style>