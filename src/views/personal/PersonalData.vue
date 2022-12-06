<template>
  <div
      class="detail"
  >
    <el-container>
      <el-aside class="aside">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            accept=".jpg,.png,.jpeg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="avator" :src="avator" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>

        <span style="font-size: 14px; color: #cccccc">点击头像进行修改</span>
        <!--        </el-upload>-->
        <div style="padding: 20px">
          <el-row
          ><span class="txt"
          >帐户余额：{{ $store.state.money }} 元</span
          ></el-row
          >
          <el-row
          ><span class="txt"
          >帐户积分：{{ $store.state.score }} 分</span
          ></el-row
          >
          <el-row
          ><span class="txt"
          >用户名：{{ $store.state.username }}</span
          ></el-row
          >
          <el-row
          ><span class="txt">电话：{{ $store.state.phone }}</span></el-row
          >
          <el-row
          ><span class="txt">性别：{{ $store.state.sex }}</span></el-row
          >
          <el-row
          ><span class="txt">年龄：{{ $store.state.age }} 岁</span></el-row
          >
        </div>
      </el-aside>
      <el-main class="main">
        <div>
          <password style="width:100%;"></password>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import {ElMessage, UploadProps} from "element-plus";
import {ref} from "vue";
import {useStore} from "vuex";
import Password from "../setting/Password.vue";
// import UploadFlie from "@/components/layouts/UploadFlie.vue";

export default {
  components: {Password},
  setup() {
    const store = useStore();
    const value = ref(new Date());

    const avator = ref(store.state.avator); //图片显示
    //可以将userid换成自己的参数
    const uploadUrl = ref("/api/upload/images?userid=" + store.state.userid);

    const handleAvatarSuccess: UploadProps["onSuccess"] = (
        response,
        uploadFile
    ) => {
      avator.value = URL.createObjectURL(uploadFile.raw!);
      //更新sessionStorage和vuex
      sessionStorage.setItem("avator", avator.value);
      store.state.avator = avator.value;
    };
    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("图片不能超过2MB!");
        return false;
      }
      return true;
    };

    return {
      avator,
      uploadUrl,
      value,
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
};
</script>

<style scoped>
.detail {
  width: 60%;
  margin: 0 auto;
  /*border: 1px solid black;*/
  /* background-color: rgba(255, 255, 245, 0.5); */
}

.aside {
  height: 80vh;
  padding: 20px 20px;
}

.main ::v-deep {
  /* padding: 20px; */
  width: 100%;
}

.txt {
  font-size: 20px;
  line-height: 35px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
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