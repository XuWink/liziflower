<template>
  <el-row v-if="store.state.name" :gutter="20">
    <el-col :span="16" :offset="10">
      <p v-for="(item, index) in footerList" :key="index">
        {{ item }}
      </p>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, readonly } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const footerList = readonly([
      "作者  |  ***  |  GitHub",
      "Copyright © 2022 LiZi-Flower",
    ]);

    return { 
      footerList ,
      store,
      };
  },
});
</script>

<style scoped>
</style>