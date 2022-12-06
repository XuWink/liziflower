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
    <el-table-column align="center" label="备注" prop="message"/>
    <el-table-column align="center" label="下单时间" prop="ordertime"/>
    <el-table-column align="center" label="总价 ￥" prop="totalprice"/>
    <el-table-column align="center" label="评论">
      <template #default="scope">
        <el-button
            @click="handleRemark(scope.$index, scope.row)"
            :style="{ width: '75px' }"
            type="primary"
            plain
        >评论
        </el-button>
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
              :style="{ height: '50px' }"
              :src="scope.row.flowerimage"
              preview-teleported
              :preview-src-list="[scope.row.flowerimage]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="价格 ￥"/>
      <el-table-column align="center" property="num" label="数量"/>
      <el-table-column align="center" label="评价">
        <template #default="scope">
          <el-button
              @click="Remark(scope.$index, scope.row)"
              type="primary"
              plain
          >评价
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
// import {useRoute} from "vue-router";
import router from "@/router";
import {onMounted} from "@vue/runtime-core";
import request from "../api/request";
import {apiList} from "../enums/apiList";
import {useStore} from "vuex";
import {ref} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "PaidOrder",
  setup() {
    onMounted(() => {
      getAllFinishedOrders(); //获取所有订单
    });
    const route = useRoute();
    const store = useStore();
    const orderlist = ref([]);
    const dialogTableVisible = ref(false);
    const gridData = ref([]);
    const loading = ref(true);

    const goItems = (orderid: number) => {
      //打开订单详情页
      dialogTableVisible.value = true; //打开对话框
      getAllItems(orderid);
    };

    const getAllItems = async (orderid: number) => {
      //获取对应订单的所有子订单的详情
      await request
          .get(apiList.getAllItems, {
            params: {
              orderid: orderid,
              userid: store.state.userid,
            },
          })
          .then((res) => {
            if (res.data.code === "200") {
              gridData.value = res.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const getAllFinishedOrders = async () => {
      //获取所有订单
      await request
          .get(apiList.getAllFinishedOrders, {
            params: {
              status: route.query.status,
              userid: store.state.userid,
            },
          })
          .then((res) => {
            if (res.data.code === "200") {
              orderlist.value = res.data.data;
              loading.value = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const handleRemark = (index: number, row: any) => {
      dialogTableVisible.value = true;
      getAllItems(row.orderid);
    };
    const Remark = (index: number, row: any) => {
      //对单一商品进行评论
      dialogTableVisible.value = false; //关闭对话框
      // console.log("row.name"+row.name)
      router.push({
        path: "/editor",
        query: {
          flowerid: row.flowerid,
          flowername: row.name,
          flowerimage: row.flowerimage,
        },
      });
      console.log(index);
      // console.log(row);
    };

    return {
      orderlist,
      getAllFinishedOrders,
      goItems,
      dialogTableVisible,
      getAllItems,
      handleRemark,
      Remark,
      gridData,
      loading
    };
  },
};
</script>

<style scoped>
</style>