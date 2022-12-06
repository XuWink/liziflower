<template>
  <div style="background-color: white;min-height: 80vh">

  <el-table
      v-loading="loading"
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
    <el-table-column align="center" label="确认收货">
      <template #default="scope">
        <el-popconfirm title="确认收货？"
                       @confirm="handleMakeSure(scope.$index, scope.row)">
          <template #reference>
            <el-button
                :style="{ width: '75px' }"
                type="primary"
                plain
            >收货
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  </div>
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
import {ElNotification} from "element-plus";

export default {
  name: "PaidOrder",
  setup() {

    onMounted(() => {
      getAllItemsPending();//获取所有订单
    })
    const router = useRoute();
    const store = useStore();
    const orderlist = ref([]);
    const dialogTableVisible = ref(false);
    const gridData = ref([]);
    const loading = ref(true);


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
    const handleMakeSure = async (index: number, row: any) => {
      //确认收货 将该订单的status置为 50
      await request.put(apiList.updatedFinished, {
        orderid: row.orderid,
        userid: store.state.userid,
        status: 50
      }).then(res => {
        if (res.data.code === '200') {
          ElNotification({
            title: '提示',
            type: "success",
            message: "收货成功",
            position: 'top-left',
          });
          getAllItemsPending();
          // location.reload();
        }
      })

      console.log(index);
      console.log(row);

    }

    const getAllItemsPending = async () => {//获取所有订单
      await request.get(apiList.getAllItemsPending, {
        params: {
          userid: store.state.userid,
          status: router.query.status
        }
      }).then(res => {
        if (res.data.code === '200') {
          // console.log(res.data.data);
          res.data.data.forEach((item: any, index: any) => {
            res.data.data[index].address = item.receiceprovince + item.receivecity + item.receivedistrict + item.receiveaddress;
          });
          // console.log(res.data.data)
          orderlist.value = res.data.data;
          loading.value = false;
        }
      }).catch(err => {
        console.log(err);
      })
    }

    return {
      router,
      orderlist,
      goItems,
      dialogTableVisible,
      getAllItems,
      gridData,
      handleMakeSure,
      loading
    }
  }
}
</script>

<style scoped>

</style>