<template>
  <div class="imageback">
    <el-card class="box-card">
      <template #header>
        <span style="font-size: 18px">欢迎登录</span>
      </template>
      <div class="contionLogin">
        <el-form
            size="medium"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
        >
          <el-form-item prop="name">
            <el-input
                v-model="ruleForm.name"
                type="text"
                placeholder="输入用户名"
                :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="ruleForm.password"
                type="password"
                placeholder="输入密码"
                :prefix-icon="Lock"
                autocomplete="off"
                show-password
            />
          </el-form-item>

          <div class="item">
            <el-button
                @click="submitForm"
                style="margin-right: 30px"
                size="medium"
                type="primary"
            >登录
            </el-button
            >
            <el-button
                @click="resetForm(ruleFormRef)"
                size="medium"
                style="margin-left: 30px"
            >取消
            </el-button
            >
          </div>
        </el-form>
      </div>
      <div class="signUp">
        <el-link @click="goSignUp">>>去注册</el-link>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import {useStore} from "vuex";
import router from "@/router";
import {Lock, User} from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    // const { proxy } = getCurrentInstance() as any; //获取当前实例
    const ruleFormRef = ref<FormInstance>();
    const store = useStore(); //vuex

    //密码校验
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    //校验用户名
    const validateUsername = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      }
    };

    //提示规则
    const rules = reactive({
      password: [{validator: validatePass, trigger: "blur"}],
      name: [{validator: validateUsername, trigger: "blur"}],
    });

    //表单数据
    const ruleForm = reactive({
      password: "",
      name: "",
    });

    //取消按钮
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      if (ruleForm.name !== "" || ruleForm.password !== "") {
        formEl.resetFields();
      } else {
        router.push("/");
      }
    };

    //登录
    const submitForm = async () => {
      let sendData = {
        username: ruleForm.name,
        password: ruleForm.password,
      };
      await store.dispatch("userLogin", sendData); //vuex
    };
    const goSignUp = () => {
      router.push("/sign-up");
    };

    return {
      ruleFormRef,
      rules,
      ruleForm,
      resetForm,
      submitForm,
      goSignUp,
      Lock,
      User,
    };
  },
});
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
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 16.5%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

.contionLogin {
  align-items: center;
  justify-content: center;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.signUp {
  text-align: right;
  position: absolute;
  right: 15px;
  bottom: 8px;
}

.el-input ::v-deep .el-input__inner {
  /* background-color: rgba(255,255,255,.2); */
  /* height: 50px; */
  border-top: 0px;
}
</style>