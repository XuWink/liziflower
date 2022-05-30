<template>
  <div class="notice">
    <!-- {{notices}} -->
    <el-card
      class="myCard"
      shadow="never"
      v-for="(item, index) in notices"
      :key="index"
    >
      <template #header>
        <div>
          <span style="font-size: 20px">{{ item.title }}</span>
        </div>
        <div>
          <span style="font-size: 14px">{{item.tim}}</span>
        </div>
      </template>
      <span>{{item.text}}</span>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import request from "@/api/request.ts";
import { apiList } from "@/enums/apiList.ts";

const notices = ref([]);

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

onMounted(() => {
  getNotices();
});
</script>

<style scoped>
.notice {
  width: 60%;
  margin: 0 auto;
}
.myCard ::v-deep {
  height: 300px;
  margin-bottom: 20px;
  padding: 20px 30px;
}
</style>