<template>
  <!--轮播图-->
  <div class="detail">
    <li-zi-scroll-top></li-zi-scroll-top>
  </div>
  <div class="list">
    <flower-list class="flower-container"></flower-list>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LiZiScrollTop from "@/components/layouts/LiZiScrollTop.vue";
import FlowerList from "@/components/FlowerList.vue";
// import MyEditor from "@/components/layouts/myEditor.vue";
// import Notice from "@/components/Notice.vue";

export default defineComponent({
  components: {
    // MyEditor,
    // Notice,
    LiZiScrollTop,
    FlowerList
  }
})
</script>

<style scoped>
.detail {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}

.notice {
  margin-top: 10px;
  margin-bottom: 10px;
}

.list {
  width: 90%;
  margin: 0 auto;
  display: flex;
  /*justify-content: center;*/

}


.flower-container {
  /*margin: 0 auto;*/
  width: 100%;
  display: flex;
}

.tag ::v-deep {
  text-align: center;
  width: 90%;
  color: blue;
}

</style>