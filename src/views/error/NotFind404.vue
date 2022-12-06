<template>
  <el-result title="404" sub-title="正在开发中,请期待...">
    <template #icon>
      <el-image
          :src="lizilogo"
      />
    </template>
  </el-result>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({

  setup() {
    const lizilogo = require("@/assets/lizilogo.png")
    return {
      lizilogo,
    }
  }

})
</script>

<style scoped>

</style>