<template>

  <div class="notice">
    <!-- {{notices}} -->
    <el-card
        class="myCard"
        shadow="never"
        v-for="(item, index) in notices"
        :key="index"
    >
      <div>
        <el-link class="items" @click="goNoticeDetail(item.noticeid)">
          {{ item.title }}
        </el-link>
      </div>
      <div>
        <span style="font-size: 14px">{{ item.time }}</span>
      </div>
      <!--      <span>{{ item.text }}</span>-->
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import request from "@/api/request.ts";
import {apiList} from "@/enums/apiList.ts";
import router from "../router";

const notices = ref([]);
onMounted(() => {
  getNotices();
});
const getNotices = async () => {
  await request
      .get(apiList.getAllNotices)
      .then((res) => {
        if (res.data.code === "200") {
          // console.log(res.data.data)
          notices.value = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

const goNoticeDetail = (noticeid: number) => {
  //跳转详情页
  // console.log(item)
  router.push({path: "/notice-detail", query: {noticeId: noticeid}});
};


</script>

<style scoped>
.notice {
  width: 60%;
  margin: 0 auto;
  background-color: white;
}

.myCard ::v-deep {
  /*height: 300px;*/
  /*margin-bottom: 20px;*/
  padding: 2px 3px;
  background-color: rgba(255, 255, 255, 0.5);
}

.el-link {
  font-size: 20px;
}
</style>