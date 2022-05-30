<template>
  <div
      class="detail"
      :style="{
      boxShadow: `var(--el-box-shadow-lighter)`,
    }"
  >
    <el-container>
      <el-aside class="aside">
        <!--        <el-upload-->
        <!--            class="avatar-uploader"-->
        <!--            :action="uploadUrl"-->
        <!--            accept=".jpeg,.png,.jpg"-->
        <!--            :show-file-list="false"-->
        <!--            :on-success="handleAvatarSuccess"-->
        <!--            :before-upload="beforeAvatarUpload"-->
        <!--        >-->
        <el-avatar
            v-if="$store.state.avator"
            shape="square"
            :size="260"
            :fit="fit"
            :src="avator"
        />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
        <span style="font-size: 14px;color: #cccccc">点击头像进行修改</span>
        <!--        </el-upload>-->
        <div style="padding: 20px">
          <el-row><span class="txt">帐户余额：{{ $store.state.money }} 元</span></el-row>
          <el-row><span class="txt">帐户积分：{{ $store.state.score }} 分</span></el-row>
        </div>

      </el-aside>
      <el-main class="main">
        <div style="padding: 35px">
          <div><span class="txt">用户名：{{ $store.state.username }}</span></div>
          <div><span class="txt">电话：{{ $store.state.phone }}</span></div>
          <div><span class="txt">性别：{{ $store.state.sex }}</span></div>
          <div><span class="txt">年龄：{{ $store.state.age }} 岁</span></div>
        </div>
      </el-main>
    </el-container>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改头像">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input type="file" v-model="form.fileup" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {UploadFile} from "element-plus";
import {reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();
    const avator = ref(store.state.avator);
    const uploadUrl = ref("http://localhost:8096/api/upload/images");
    const dialogFormVisible = ref(false);
    const form = reactive({
      fileup: null,
    });

    const handleAvatarSuccess = (res: any, uploadFile: UploadFile) => {//文件上传成功后
      console.log(res);
      console.log(uploadFile);
      avator.value = res.data.url;
    }


    return {
      avator,
      uploadUrl,
      handleAvatarSuccess,
      dialogFormVisible,
      form,
    }
  }
}
</script>

<style scoped>
.detail {
  width: 60%;
  margin: 0 auto;
  /*border: 1px solid black;*/
  background-color: rgba(255, 255, 245, 0.5);
}

.aside {
  height: 80vh;
  padding: 20px 20px;
}

.main {
  padding: 20px;
}

.txt {
  font-size: 20px;
  line-height: 35px;
}

.avatar-uploader .el-upload {
  /*border: 1px dashed var(--el-border-color);*/
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>