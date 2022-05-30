<template>
  <div class="detail">
    <div style="width: 100%">
      <el-table
          :table-layout="auto"
          :empty-text="购物车为空"
          stripe
          lazy
          @selection-change="handleSelectionChange"
          size="small"
          border
          :fit="true"
          :data="tableData"
          :header-cell-style="{
          height: '48px',
          background: '#FAFAFA',
          color: '#333333',
          fontWeight: 'bold',
          fontSize: '15px',
        }"
      >
        <el-table-column
            align="center"
            width="55"
            type="selection"
            prop="flowerid"
        />
        <el-table-column align="center" label="图片" prop="flowerimage">
          <!-- 图片的显示 -->
          <template #default="scope">
            <el-image
                :src="scope.row.flowerimage"
                preview-teleported
                :preview-src-list="[scope.row.flowerimage]"
            />
          </template>
        </el-table-column>

        <el-table-column align="center" label="名称" prop="name">
          <template #default="scope2">
            <el-link @click="goDetail(scope2.row.flowerid)">{{
                scope2.row.name
              }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="describe"/>
        <el-table-column align="center" label="价格￥" prop="price">
          <template #default="scope1">
            <el-tag :style="{ width: '65%' }" type="success"
            ><span style="font-size: 20px">{{ scope1.row.price }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <!--      <el-table-column align="center" label="库存" prop="stocknumber"/>-->
        <el-table-column align="center" label="数量" prop="number"/>
        <el-table-column align="center" min-width="150px">
          <template #header>
            <div style="display: flex; width: 90%">
              <div style="width: 65%; display: flex">
                <div style="width: 35%; text-align: center">
                  <span style="color: orangered; font-size: 20px"
                  >总金额￥
                  </span>
                </div>
                <div style="width: 65%">
                  <span style="color: orangered; font-size: 20px">{{
                      totalMoney
                    }}</span>
                </div>
              </div>
              <div style="width: 35%">
                <el-button @click="settlement" type="primary">
                  <el-icon style="right: 5px">
                    <Coin/>
                  </el-icon>
                  下单
                </el-button>
              </div>
            </div>
          </template>
          <template #default="scope">
            <el-button
                :style="{ width: '75px' }"
                type="warning"
                plain
                :icon="Delete"
                @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" style="width: 100%">
        <el-pagination
            meduim
            background
            layout="sizes,jumper,prev, pager, next"
            :total="tableDataLength"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            v-model:currentPage="currentPage"
            @size-change="hangleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="提交订单"
      width="45%">
    <div style="height: 35px">
      <span style="font-weight: bold;color: orangered;font-size: 20px">订单总价：{{ totalMoney }}</span>
    </div>
    <el-form>
      <el-form-item label="地址">
        <el-select
            placeholder="Select"
            style="width: 100%"
            v-model="addressid"
        >
          <el-option
              v-for="(item,index) in addresslist"
              :key="index"
              :label="item.receivephone+item.receiceprovince+'省'+item.receivecity+item.receivedistrict+item.receiveaddress"
              :value="item.addressid"/>
        </el-select>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="message" type="textarea">
        </el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="revoke">取消</el-button>
        <el-button type="primary" @click="submitOrder">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";
import {apiList} from "@/enums/apiList";
import request from "@/api/request";
import {useStore} from "vuex";
import {Delete} from "@element-plus/icons-vue";
import {ElMessage, ElNotification} from "element-plus";
import router from "@/router";

onMounted(() => {
  getCart(); //页面渲染之前，获得数据
  getCart2();
  getAllAddress();
});
const store = useStore();
const tableData = ref([]);
const totalMoney = ref(0);
const multiselectable = ref([]); //已选择的商品
const currentPage = ref(1);
const pageSize = ref(5); //每页几条
const tableDataLength = ref(0);
const dialogVisible = ref(false);//弹出框
const addressid = ref(0);//选择的地址id
const addresslist = ref([]);

const message = ref("");//订单备注

const hangleSizeChange = (val: number) => {
  pageSize.value = val;
  getCart();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getCart();
};
const handleSelectionChange = (val: any) => {
  //勾选时触发 勾选框
  totalMoney.value = 0;
  multiselectable.value = val;
  multiselectable.value.forEach((item) => {
    totalMoney.value += item.price * item.number;
  });
};

const getAllAddress = async () => {
  //获取所有地址
  await request
      .get(apiList.getAllAddress + store.state.userid)
      .then((res) => {
        if (res.data.code === "200") {
          addresslist.value = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

const goDetail = (flowerid: number) => {
  //跳转详情页
  // console.log(item)
  setTimeout(() => {
    router.push({path: "/details", query: {flowerId: flowerid}});
  }, 500);
};

const revoke = () => {
  //取消订单
  message.value = null;
  addressid.value = 0;
  dialogVisible.value = false;

}
const submitOrder = async () => {
  //对话框，提交订单
  //结算
  //首先，弹出模态框，填写地址，收件人信息登，提交结算
  //删除已经提交过结算的商品,生成订单
  if (addressid.value !== 0) {
    let money = totalMoney.value;
    await request.post(apiList.addOrder, {//提交订单
      userid: store.state.userid,
      addressid: addressid.value,
      totalprice: money,
      message: message.value,
      status: 10,
    }).then(res => {
      if (res.data.code === '200') {
        let orderid = res.data.data;
        multiselectable.value.forEach(item => {
          let sendParams = {
            orderid: orderid,
            userid: store.state.userid,
            flowerid: item.flowerid,
            num: item.number,
          };
          //添加子订单 删除购物车中的 已添加项
          addOrderItems(sendParams);
          //关闭对话框
          ElMessage("提交订单成功");
          dialogVisible.value = false;
          addressid.value = 0;
          message.value = null;

        })
      } else {
        ElNotification({
          message: '失败',
          type: "error"
        })
      }
    }).catch(err => {
      console.log(err);
    })
  } else {
    dialogVisible.value = false;
    ElNotification({
      type: "info",
      message: "地址不能为空"
    })
  }


}

const settlement = () => {// 总价后面的结算按钮
  if (totalMoney.value !== 0) {
    dialogVisible.value = true;
  } else {
    ElNotification({
      message: "未选择商品",
      type: "info",
    });
  }
};

const addOrderItems = async (sendParams: any) => { //添加子订单
  await request.post(apiList.addOrderItems, sendParams)
      .then(res => {
        if (res.data.code === '200') {
          //添加成功后，删除购物车
          request.delete(apiList.deleteCart + store.state.userid + "&flowerid=" + sendParams.flowerid)
              .then(res => {
                getCart(); //获取总条数
                getCart2();//获取每页的数据
                console.log(res.data.code);
              })
        }
      }).catch(err => {
        console.log(err);
      })
}
//
const getCart2 = async () => {
  //获取购物车信息
  await request
      .get(apiList.getCart + store.state.userid)
      .then((res) => {
        if (res.data.code === "200") {
          // tableData.value = res.data.data
          tableDataLength.value = res.data.data.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};
const getCart = async () => {
  //获取购物车信息
  await request
      .get(
          apiList.pageCart +
          store.state.userid +
          "&page=" +
          currentPage.value +
          "&size=" +
          pageSize.value
      )
      .then((res) => {
        if (res.data.code === "200") {
          tableData.value = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

const handleDelete = async (scope: any, row: any) => {
  let userid = store.state.userid;
  let flowerid = row.flowerid;
  await request
      .delete(apiList.deleteCart + userid + "&flowerid=" + flowerid)
      .then((res) => {
        if (res.data.code === "200") {
          getCart(); //获取总条数
          getCart2();//获取每页的数据
          ElNotification.success({
            title: "删除",
            message: "删除成功",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

</script>
<style scoped>
.detail {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  /*border: 1px solid black;*/
}

.page {
  display: flex;
  justify-content: center;
}

.el-image ::v-deep {
  width: 100px;
}
</style>
