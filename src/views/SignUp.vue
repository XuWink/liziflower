<template>
  <div class="imageback">
    <el-card class="box-card">
      <template #header>
        <span style="font-size: 18px">欢迎注册</span>
      </template>
      <div class="contionLogin">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="username">
            <el-input class="in" placeholder="输入姓名" v-model="ruleForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                class="in"
                v-model="ruleForm.password"
                placeholder="输入密码"
                type="password"
                autocomplete="off"
                show-password
            />
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input class="in" placeholder="输入手机号" v-model="ruleForm.phone"/>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input class="in" placeholder="输入年龄" v-model="ruleForm.age"/>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"/>
              <el-radio label="女"/>
            </el-radio-group>
          </el-form-item>

          <div class="item">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
            >注册
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="signIp">
        <el-link @click="goSignIp">>>去登录</el-link>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import router from "@/router";
import {ElMessage} from "element-plus";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
  phone: "",
  sex: "男",
  age: 0,
});

const rules = reactive<FormRules>({
  username: [
    {required: true, message: "请输入姓名", trigger: "blur"},
    {min: 3, max: 10, message: "长度应为3-10位", trigger: "blur"},
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6, max: 16, message: "长度应为6-16位", trigger: "blur"},
  ],
  phone: [
    {required: true, message: "请输入手机号", trigger: "blur"},
    {min: 11, max: 11, message: "长度应为11位", trigger: "blur"},
  ],
  age: [
    {required: true, message: "请输入年龄", trigger: "blur"},
    {min: 1, max: 2, message: "年龄不合法", trigger: "blur"},
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur",
    },
  ],
});

//提交注册
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  //输入合法，提交注册
  await formEl.validate((valid, fields) => {
    if (valid) {
      let sentData = ruleForm;
      request
          .post(apiList.loginUp, sentData)
          .then((res) => {
            console.log(res.data);
            if (res.data.code === "200") {
              ElMessage.success("注册成功");
              setTimeout(() => {
                router.push({name: "sign-in"});
              }, 1000);
            } else {
              ElMessage.warning("用户名已存在");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const goSignIp = () => {
  router.push("/sign-in");
};

//清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>


<style scoped>
.imageback {
  /*position: fixed;*/
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: url("../assets/login-backimage.jpg") no-repeat center center;
  background-size: cover;
  z-index: -1;
}

.box-card {
  width: 550px;
  height: 400px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 16.5%;
  background: rgba(255, 255, 255, 0.5);
}

.contionLogin {
  align-items: center;
  justify-content: center;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 50px; */
}

.signIp {
  text-align: right;
  position: absolute;
  right: 15px;
  bottom: 8px;
}

</style>