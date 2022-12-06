<template>
  <div class="detail">
    <el-container>
      <el-header style="height: 200px">
        <el-card class="card" shadow="hover">
          <div style="height: 200px; display: flex">
            <el-image
                :style="{ height: '150px' }"
                fit="cover"
                :src="flowerimage"
            />
          </div>
          <!--          <div style="display:flex;;"><span>{{ flowername }}</span></div>-->
        </el-card>
      </el-header>
      <el-main style="text-align: left">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 350px; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            placeholder="请输入评论"
        />
      </el-main>
      <el-footer class="foot">
        <!--发表评论之后，跳转到该花的详情页-->
        <el-button type="primary" size="medium" @click="putRemark"
        >发表评论
        </el-button
        >
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted} from "vue";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {useRoute} from "vue-router";
import request from "../../api/request";
import {apiList} from "../../enums/apiList";
import {useStore} from "vuex";
import router from "../../router";
import {ElMessage} from "element-plus";

export default {
  components: {Editor, Toolbar},
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const route = useRoute();
    const store = useStore();
    const flowerimage = ref(route.query.flowerimage);
    const flowername = ref(route.query.flowername);
    const userid = ref(store.state.userid);

    // 内容 HTML
    const valueHtml = ref("");

    onMounted(() => {
    });

    const toolbarConfig = {}; //工具栏配置
    const editorConfig = {placeholder: "请输入内容..."}; //编辑区配置

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    const putRemark = async () => {
      //发表评论
      // console.log(valueHtml.value)
      if (valueHtml.value === "") {
        ElMessage.error("评论为空");
        return;
      }
      // console.log(store.state.userid)
      await request
          .post(apiList.addRemark, {
            userid: userid.value,
            flowerid: route.query.flowerid,
            remark: valueHtml.value,
          })
          .then((res) => {
            if (res.data.code === "200") {
              //将订单状态改为0
              
              //跳转到该花的详情页
              let f = route.query.flowerid;
              router.push({path: "/details", query: {flowerId: f}});
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };
    return {
      route,
      editorRef,
      valueHtml,
      mode: "simple", // 或 'simple'，'default'
      toolbarConfig,
      editorConfig,
      handleCreated,
      flowerimage,
      flowername,
      putRemark,
    };
  },
};
</script>
<style scoped>
.detail {
  width: 90%;
  margin: 0 auto;
}

.card {
  height: 200px;
}

.el-card ::v-deep {
  padding: 0;
  margin: 0;
  display: flex;
}

.foot ::v-deep {
  display: flex;
  justify-content: center;
}
</style>