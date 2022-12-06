<template>
  <div class="detail">
    <div style="font-size: 20px;">
      <div>{{ detail.title }}</div>
      <div style="font-size: 14px;margin-bottom: 15px">{{ detail.time }}</div>
    </div>
    <div class="main" style="overflow: hidden;width: 100%;margin: 0 auto">
      <p v-html="detail.text"></p>
    </div>
    <div style="text-align: right;font-weight: bold">{{ detail.publisher }}</div>
  </div>
</template>

<script lang="ts">
import request from "@/api/request";
import {ElMessage} from "element-plus";
import {apiList} from "@/enums/apiList";
import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";

export default {
  name: "NoticeDetali",
  setup() {
    const route = useRoute();
    const detail = ref({});

    onMounted(() => {
      getNoticeById();
    })

    const getNoticeById = async () => {
      await request
          .get(apiList.getNoticeDetail + route.query.noticeId)
          .then((res) => {
            if (res.data.code === "200") {
              // console.log(res.data.data);
              detail.value = res.data.data;
            } else {
              ElMessage.error("获取失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    return {
      getNoticeById,
      detail,
    }
  }
}
</script>

<style scoped>
.detail {
  width: 60%;
  margin: 0 auto;
  background-color: white;
  padding: 20px 30px 20px 30px;

}
.main{
  min-height: 200px;
}
</style>