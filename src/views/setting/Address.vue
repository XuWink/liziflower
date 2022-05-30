<template>
  <el-container class="detail">
    <el-header v-if="$store.state.userid" class="head">
      <template #default>
        <el-button @click="drawer = true" type="primary">添加地址</el-button>
      </template>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <el-card
        class="my-card"
        shadow="never"
        v-for="(item, index) in myAllAddress"
        :key="index"
      >
        <span>号码：{{ item.receivephone }}</span>
        <el-divider border-style="dashed" />
        <span>省份：{{ item.receiceprovince }}</span>
        <el-divider border-style="dashed" />
        <span>城市：{{ item.receivecity }}</span>
        <el-divider border-style="dashed" />
        <span>区/县：{{ item.receivedistrict }}</span>
        <el-divider border-style="dashed" />
        <span>详细地址：{{ item.receiveaddress }}</span>
        <template #header>
          <el-button @click="deleteAddress(item.addressid)" type="info"
            >删除</el-button
          >
        </template>
      </el-card>
    </el-main>
  </el-container>

  <el-drawer v-model="drawer" :show-close="false" :with-header="true">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增一个地址</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        关闭
      </el-button>
    </template>
    <el-form
      label-position="top"
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
    >
      <el-form-item label="电话" prop="receivephone">
        <el-input v-model="ruleForm.receivephone" />
      </el-form-item>

      <el-form-item label="省份" prop="receiceprovince">
        <!-- <el-input v-model="ruleForm.receiceprovince" /> -->
        <el-select
          v-model="ruleForm.receiceprovince"
          placeholder="Select"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in area"
            :key="index"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="城市" prop="receivecity">
        <el-input v-model="ruleForm.receivecity" autocomplete="off" />
      </el-form-item>

      <el-form-item label="区/县" prop="receivedistrict">
        <el-input v-model="ruleForm.receivedistrict" autocomplete="off" />
      </el-form-item>

      <el-form-item label="详细地址" prop="receiveaddress">
        <el-input type="textarea" v-model="ruleForm.receiveaddress"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button type="primary" @click="resetForm(ruleFormRef)">取消</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { FormInstance, FormRules } from "element-plus";
import request from "@/api/request";
import { apiList } from "@/enums/apiList";
import { useStore } from "vuex";
import { ElMessage } from "element-plus/lib/components";
import { AREA } from "@/enums/area";

export default defineComponent({
  setup() {
    onMounted(() => {
      getAllAddress(); //获取地址
    });

    const drawer = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const store = useStore();
    const myAllAddress = ref([]);
    const area = AREA; //城市
    const ruleForm = reactive({
      receivephone: "",
      receiceprovince: "",
      receivecity: "",
      receivedistrict: "",
      receiveaddress: "",
    });
    const rules = reactive<FormRules>({
      receivephone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { min: 11, max: 11, message: "长度应为11位", trigger: "blur" },
      ],
      receiceprovince: [
        { required: true, message: "请选择省份", trigger: "blur" },
      ],
      receivecity: [{ required: true, message: "请输入城市", trigger: "blur" }],
      receivedistrict: [
        { required: true, message: "请输入区/县", trigger: "blur" },
      ],
      receiveaddress: [
        {
          required: true,
          message: "请填写详细地址",
          trigger: "blur",
        },
      ],
    });

    //取消按钮
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    //提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          request
            .post(apiList.addAddress + store.state.userid, ruleForm)
            .then((res) => {
              if (res.data.code === "200") {
                formEl.resetFields();
                drawer.value = false;
                ElMessage.success("添加成功");
                getAllAddress();
              } else {
                ElMessage.error("添加失败");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(fields);
        }
      });
    };

    const getAllAddress = async () => {
      //获取地址
      await request
        .get(apiList.getAllAddress + store.state.userid)
        .then((res) => {
          if (res.data.code === "200") {
            myAllAddress.value = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const deleteAddress = async (value: any) => {
      console.log(value);
      await request
        .delete(apiList.deleteAddres + value)
        .then((res) => {
          if (res.data.code === "200") {
            ElMessage.success("删除成功");
            getAllAddress();
          } else {
            ElMessage.error("删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      resetForm,
      ruleFormRef,
      submitForm,
      ruleForm,
      drawer,
      rules,
      area,
      myAllAddress,
      deleteAddress,
    };
  },
});
</script>

<style scoped>
.detail {
  /* width: 60%; */
  margin: 0 auto;
  /* border: 1px solid black; */
  height: 80vh;
}

.head {
  /* border: 1px solid black; */
}

.el-container ::v-deep {
  width: 60%;
}

.el-header ::v-deep {
  height: auto;
  text-align: left;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-card {
  text-align: center;
  margin-bottom: 20px;
  /* height: 200px; */
}
</style>