<template>
  <div class="detail">
    <el-card class="card" shadow="never">
      <template #header>
        <span style="font-size: 20px; font-weight: bold">修改帐户信息</span>
      </template>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="ruleForm"
        label-width="80px"
        size="large"
      >
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input class="elput" v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update(ruleFormRef)">更新</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
// import request from "@/api/request";
// import {apiList} from "@/enums/apiList";
import { useStore } from "vuex";
import { defineComponent, reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus/lib/components";

export default defineComponent({
  setup() {
    const store = useStore();

    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      username: store.state.username,
      userid: store.state.userid,
      age: store.state.age,
      sex: store.state.sex,
      phone: store.state.phone,
      password: "",
    });
    const rules = reactive<FormRules>({
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度应为6-16位", trigger: "blur" },
      ],
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { min: 11, max: 11, message: "长度应为11位", trigger: "blur" },
      ],
      age: [
        { required: true, message: "请输入年龄", trigger: "blur" },
        { min: 1, max: 2, message: "年龄不合法", trigger: "blur" },
      ],
      sex: [
        {
          required: true,
          message: "请输入性别",
          trigger: "blur",
        },
      ],
    });

    const update = async (formEl: FormInstance | undefined) => {
      //更新用户信息
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          store.dispatch("updateInfo", ruleForm);
        } else {
          ElMessage.error("输入错误");
          console.log(fields);
        }
      });
    };

    return {
      ruleForm,
      update,
      rules,
      ruleFormRef,
    };
  },
});
</script>

<style scoped>
.detail {
  width: 100%;
  /* margin: 0 auto; */
}

.card ::v-deep {
  background-color: rgba(255, 255, 255, 0.0);
  border: none;
  width: 100%;
}
.el-form ::v-deep {
  width: 100%;
}

.elput ::v-deep .el-input__inner {
  background-color: rgba(255, 255, 255, 0.2);
  /* height: 120px; */
}
</style>
