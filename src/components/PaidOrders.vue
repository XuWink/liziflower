<template>
  <div>待支付的订单</div>
  <el-table
      :table-layout="auto"
      :empty-text="没有数据"
      stripe
      lazy
      @selection-change="handleSelectionChange"
      size="medium"
      border
      :fit="true"
      :data="orderlist"
      :header-cell-style="{
          height: '48px',
          background: '#FAFAFA',
          color: '#333333',
          fontWeight: 'bold',
          fontSize: '15px',
        }"
  >
    <el-table-column align="center" label="订单详情(点击查看)" prop="orderid">
      <template #default="scope2">
        <el-link @click="goItems(scope2.row.orderid)">
          {{ scope2.row.orderid }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column align="center" label="手机号" prop="receivephone"/>
    <el-table-column align="center" label="备注" prop="message"/>
    <el-table-column align="center" label="下单时间" prop="ordertime"/>
    <el-table-column align="center" label="总价 ￥" prop="totalprice"/>
    <el-table-column align="center" label="地址" prop="address" min-width="130px"/>

    <el-table-column align="center" label="支付">
      <template #default="scope">
        <el-popconfirm title="确认支付？"
                       @confirm="handlePayment(scope.$index, scope.row)">
          <template #reference>
            <el-button
                :style="{ width: '75px' }"
                type="primary"
                plain
            >支付
            </el-button>
          </template>
        </el-popconfirm>

        <el-button
            :style="{ width: '75px' }"
            type="warning"
            plain
            @click="handleDelete(scope.$index, scope.row)"
        >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogTableVisible" title="订单详情">
    <el-table fit :data="gridData">
      <el-table-column align="center" prop="name" label="名称"/>
      <el-table-column align="center" label="图片">
        <template #default="scope">
          <el-image
              :style="{height:'50px'}"
              :src="scope.row.flowerimage"
              preview-teleported
              :preview-src-list="[scope.row.flowerimage]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="价格 ￥"/>
      <el-table-column align="center" property="num" label="数量"/>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import request from "../api/request";
import {apiList} from "../enums/apiList";
import {useStore} from "vuex";
import {ref} from "vue";
import {ElMessage} from "element-plus";

export default {
  name: "PaidOrder",
  setup() {

    onMounted(() => {
      getAllPaidOrders();//获取所有订单
    })
    const router = useRoute();
    const store = useStore();
    const orderlist = ref([]);
    const dialogTableVisible = ref(false);
    const gridData = ref([]);


    const goItems = (orderid: number) => {//打开订单详情页
      dialogTableVisible.value = true;//打开对话框
      getAllItems(orderid);
    }

    const getAllItems = async (orderid: number) => {
      //获取对应订单的所有子订单的详情
      await request.get(apiList.getAllItems, {
        params: {
          orderid: orderid,
          userid: store.state.userid
        }
      }).then(res => {
        if (res.data.code === '200') {
          gridData.value = res.data.data
        }
      }).catch(err => {
        console.log(err);
      })
    }

    const handlePayment = async (index: any, row: any) => {//支付按钮
      //将总金额与帐户余额相比较，如果总金额小于等于帐户余额money则可进行
      //订单支付，否则，提醒用户帐户余额不足;更新sessionStorage.money和score
      if (row.totalprice <= store.state.money) {//可以下单
        await request.put(apiList.updatePaidtoPending, {
          orderid: row.orderid,
          userid: store.state.userid,
          totalprice: row.totalprice,
          money: store.state.money,
          score: store.state.score
        }).then(res => {
          if (res.data.code === '200') {
            sessionStorage.setItem("money", String(store.state.money - parseInt(row.totalprice)));
            sessionStorage.setItem("score", String((store.state.score - 0) + (parseInt(row.totalprice))))
            store.state.money = String(store.state.money - parseInt(row.totalprice));
            store.state.score = String((store.state.score - 0) + (parseInt(row.totalprice)));
            ElMessage.success("支付成功！");
            getAllPaidOrders();
            location.reload()
          }
        }).catch(err => {
          console.log(err);
        })
      } else {
        ElMessage.error("帐户余额不足，请充值");
      }
      console.log(index);
      // console.log(row)
    }

    const handleDelete = async (index: any, row: any) => {//删除按钮
      console.log(index);
      console.log(row)
    }

    const getAllPaidOrders = async () => {//获取所有订单
      await request.get(apiList.getAllPaidOrders, {
        params: {
          userid: store.state.userid,
          status: router.query.status
        }
      }).then(res => {
        if (res.data.code === '200') {
          // console.log(res.data.data);
          res.data.data.forEach((item: any, index: any) => {
            res.data.data[index].address = item.receiveaddress + item.receivecity + item.receivedistrict + item.receiveaddress;
          });
          // console.log(res.data.data)
          orderlist.value = res.data.data;
        }
      }).catch(err => {
        console.log(err);
      })
    }

    return {
      router,
      orderlist,
      handlePayment,
      handleDelete,
      goItems,
      dialogTableVisible,
      getAllItems,
      gridData,
    }
  }
}
</script>

<style scoped>

</style>