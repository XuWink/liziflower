<template>
  <div class="detail">
    <el-card shadow="never">
      <template #header>
        <div class="card-header" style="width: 80%;margin: 0 auto">
          <span style="font-size: 20px">我的余额</span>
          <span style="font-size: 20px">{{ money }} ￥</span>
        </div>
      </template>
      <div style="width: 80%;height: 500px;margin: 0 auto;padding: 35px 50px 30px 50px">
        <div><h1>充值</h1></div>
        <div style="display: flex;width: 100%">
          <el-input v-model="charge" placeholder="￥" style="width: 75%"></el-input>
          <el-button type="success" @click="onCharge" style="width: 25%">充值</el-button>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {ref} from "vue";
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import {ElNotification} from "element-plus";

export default {
  name: "money",
  setup() {
    const store = useStore();
    const money = store.state.money;
    const charge = ref(0);

    const onCharge = async () => {
      if (charge.value !== 0) {
        await request.put(apiList.updateMoney + store.state.userid + "&charge=" + charge.value)
            .then((res) => {
              if (res.data.code === "200") {
                //更新sessionStorage，和store
                sessionStorage.setItem("money", res.data.data.money);
                store.state.money = charge.value;
                window.location.reload();
                ElNotification({
                  title: '提示',
                  type: "success",
                  message: "充值成功",
                  position: 'top-left',
                });
              }
            }).catch((err) => {
              console.log(err);
              ElNotification({
                title: '提示',
                type: "error",
                message: "请求错误",
                position: 'top-left',
              })
            })
      } else {
        // console.log(2)
        ElNotification({
          title: '提示',
          type: "warning",
          message: "充值错误",
          position: 'top-left',
        })
      }
    }

    return {
      money,
      charge,
      onCharge,
    }
  }
}
</script>

<style scoped>
.detail {
  width: 60%;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>