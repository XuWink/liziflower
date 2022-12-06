<template>

  <el-carousel class="swiper-container" type="card" :interval="4000" height="15vw">
    <el-carousel-item v-for="(item,index) in scrollTop" :key="index">
      <el-image fit="cover" :src="item.value"/>
    </el-carousel-item>
  </el-carousel>


</template>

<script lang="ts">
import {defineComponent} from "vue";
import {scrollTop} from "@/enums/scrollTop";

export default defineComponent({

  setup() {

    return {
      scrollTop
    }
  }


})
</script>

<style scoped>
.swiper-container {
  width: 100%;
  /*margin: auto;*/
  padding-top: 5px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 20px;
}

.el-image {
  width: 100%;
}

</style>