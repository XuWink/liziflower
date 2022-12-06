<template>
  <el-container class="detail">
    <el-header style="display: flex">
      <div class="head">
        <!--        待支付-->
        <el-button
          type="primary"
          plain
          @click="gotoPage('/paid-orders', 10)"
          size="medium"
          >待支付</el-button
        >
      </div>
      <div class="head">
        <!--        支付后，等待收货-->
        <el-button
          type="primary"
          plain
          @click="gotoPage('/pending-orders', 40)"
          size="medium"
          >待收货</el-button
        >
      </div>
      <div class="head">
        <!--        已完成，等待评价-->
        <el-button
          type="primary"
          plain
          @click="gotoPage('/finished-orders', 50)"
          size="medium"
          >已完成</el-button
        >
      </div>
    </el-header>
    <router-view :key="$route.fullPath"></router-view>
  </el-container>
</template>

<script lang="ts" setup>
import router from "@/router";

const gotoPage = (path: any, status: number) => {
  router.push({ path: path, query: { status: status } });
};
</script>

<style scoped>
.detail {
  width: 90%;
  margin: 0 auto;
}

.head {
  width: 33.3%;
  display: flex;
  justify-content: center;
}
</style>