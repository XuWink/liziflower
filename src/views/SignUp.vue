<template>
  <div class="imageback">
    <el-card shadow="hover" class="box-card">
      <div class="contionLogin">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"

        >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="ruleForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="ruleForm.password"/>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="ruleForm.phone"/>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"/>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"/>
              <el-radio label="女"/>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="item" style="display: flex">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
            >注册
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--    <div style="display:flex;;"><p>去注册<el-icon><Plus /></el-icon></p></div>-->
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import router from "@/router";
import {ElMessage} from 'element-plus'


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  phone: '',
  sex: '男',
  age: 0,
})

const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 3, max: 10, message: '长度应为3-10位', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 16, message: '长度应为6-16位', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {min: 11, max: 11, message: '长度应为11位', trigger: 'blur'},
  ],
  age: [
    {required: true, message: '请输入年龄', trigger: 'blur'},
    {min: 1, max: 2, message: '年龄不合法', trigger: 'blur'},
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'blur',
    },
  ],
})

//提交注册
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  //输入合法，提交注册
  await formEl.validate((valid, fields) => {
    if (valid) {
      let sentData = ruleForm
      request.post(apiList.loginUp, sentData).then(res => {
        console.log(res.data)
        if (res.data.code === '200') {
          ElMessage.success("注册成功")
          setTimeout(() => {
            router.push({name: "sign-in"})
          }, 1000)
        } else {
          ElMessage.warning("用户名已存在")
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log('error submit!', fields)
    }
  })

}

//清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>


<style scoped>
.imageback {
  position: fixed;
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
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);


}

.contionLogin {
  /*margin-top: 50px;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}


</style>