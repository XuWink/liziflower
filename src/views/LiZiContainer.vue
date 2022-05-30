<template>
  <el-container class="c">
    <el-header style="position: static" class="detail">
      <li-zi-header></li-zi-header>
    </el-header>
    <el-main class="main">
      <router-view :key="$route.fullPath"/>
    </el-main>
    <el-footer>
      <li-zi-footer></li-zi-footer>
    </el-footer>
  </el-container>

</template>

<script lang="ts">

import LiZiHeader from "@/components/layouts/LiZiHeader.vue";
import LiZiFooter from "@/components/layouts/LiZiFooter.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {LiZiFooter, LiZiHeader},
  setup() {
    window.addEventListener("resize", function () {
      // window.location.reload();
    })
  }
})
</script>

<style scoped>
.el-container {
  width: 100%;
}

.detail ::v-deep {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
.main{
  width: 100%;
  margin: 0 auto;
}

</style>