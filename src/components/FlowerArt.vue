<template>
  <el-container class="detail">
    <el-header>
      <el-tabs
          v-model="activeName"
          class="demo-tabs"
          :stretch="true"
          @tab-click="handleClick"
      >
        <el-tab-pane label="花语" name="language"></el-tab-pane>
        <el-tab-pane label="花艺" name="art"/>
      </el-tabs>
    </el-header>

    <el-main class="main" v-if="activeName === 'language'">
      <div>
        <el-input
            :style="{ width: '335px' }"
            v-model="find"
            size="small"
            placeholder="查询"
            maxlength="10"
            show-word-limit
            @keyup.enter="goFind"
        >
          <template #prepend>
            <el-button :icon="Search"/>
          </template>
        </el-input>
      </div>
      <div style="margin-bottom: 35px;border-bottom: 1px crimson groove;padding: 15px">
        <div class="tit">
          <span style="font-size: 25px;font-family:华文宋体">推荐</span>
          <el-tag style="border: none;background-color: white;">
            <span style="color:orangered;font-weight: bold;font-size: 18px">送父母</span>
          </el-tag>
        </div>
        <div
            v-for="(item, index) in language"
            :key="index">
          <span v-if="item.cateid===1">
            <el-link class="items" @click="goDetail(item.flowerid)">
                  {{ item.language }}
            </el-link>
          </span>
        </div>
      </div>
      <div style="margin-bottom: 35px;border-bottom: 1px crimson groove;padding: 15px">
        <div class="tit">
          <span style="font-size: 25px;font-family:华文宋体">推荐</span>
          <el-tag style="border: none;background-color: white;">
            <span style="color:orangered;font-weight: bold;font-size: 18px">生日祝福</span>
          </el-tag>
        </div>
        <div
            v-for="(item, index) in language"
            :key="index">
          <span class="items" v-if="item.cateid===2"><el-link class="items" @click="goDetail(item.flowerid)">
                  {{ item.language }}
            </el-link></span>
        </div>
      </div>
      <div style="margin-bottom: 35px;border-bottom: 1px crimson groove;padding: 15px">
        <div class="tit">
          <span style="font-size: 25px;font-family:华文宋体">推荐</span>
          <el-tag style="border: none;background-color: white;">
            <span style="color:orangered;font-weight: bold;font-size: 18px">友谊万岁</span>
          </el-tag>
        </div>
        <div
            v-for="(item, index) in language"
            :key="index">
          <span class="items" v-if="item.cateid===3"><el-link class="items" @click="goDetail(item.flowerid)">
                  {{ item.language }}
            </el-link></span>
        </div>
      </div>

      <div style="margin-bottom: 35px;border-bottom: 1px crimson groove;padding: 15px">
        <div class="tit">
          <span style="font-size: 25px;font-family:华文宋体">推荐</span>
          <el-tag style="border: none;background-color: white;">
            <span style="color:orangered;font-weight: bold;font-size: 18px">尊敬长辈</span>
          </el-tag>
        </div>
        <div
            v-for="(item, index) in language"
            :key="index">
          <span class="items" style="" v-if="item.cateid===4"><el-link class="items" @click="goDetail(item.flowerid)">
                  {{ item.language }}
            </el-link></span>
        </div>
      </div>

      <div style="margin-bottom: 35px;border-bottom: 1px crimson groove;padding: 15px">
        <div class="tit">
          <span style="font-size: 25px;font-family:华文宋体">推荐</span>
          <el-tag style="border: none;background-color: white;">
            <span style="color:orangered;font-weight: bold;font-size: 18px">探病慰问</span>
          </el-tag>
        </div>
        <div
            v-for="(item, index) in language"
            :key="index">
          <span class="items" style="" v-if="item.cateid===5"><el-link class="items" @click="goDetail(item.flowerid)">
                  {{ item.language }}
            </el-link></span>
        </div>
      </div>

    </el-main>

    <el-main class="main" v-else>
      <div>
        <not-find404></not-find404>
      </div>
    </el-main>
  </el-container>
  <el-dialog v-model="dialog" title="查找结果">
    <div
        style="
        border-bottom: 1px solid gray;
        margin-bottom: 5px;
        background-color: rgba(255, 255, 255, 0.2);
      "
        v-for="item in findValues"
        :key="item.cateid"
    >
      <span style="font-size: 18px">
        {{ item.language }}
      </span>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import {onMounted} from "@vue/runtime-core";
import {ElNotification, ElMessage} from "element-plus";
import NotFind404 from "@/views/error/NotFind404.vue";
import router from "@/router";

export default {
  components: {NotFind404},
  setup() {
    const find = ref("");
    const language = ref([]); //花语
    const dialog = ref(false);
    const findValues = ref([]); //记录查询结果
    const activeName = ref("language");

    onMounted(() => {
      goFlowerLanguage("language");
    });

    const handleClick = (tab: any) => {
      console.log(tab.paneName);
      goFlowerLanguage(tab.paneName);
    };
    const goDetail = (id: number) => {
      //跳转详情页
      // console.log(item)
      router.push({path: "/details", query: {flowerId: id}});
    };

    const goFind = async () => {
      //按enter建查找，num=1查找花艺，num=2查找花语
      await request
          .get(apiList.getOneLanguage + find.value)
          .then((res) => {
            if (res.data.code === "200") {
              // console.log(res.data)
              if (res.data.data.length !== 0) {
                findValues.value = res.data.data;
                dialog.value = true;
              } else {
                ElNotification({
                  type: "warning",
                  message: "未找到",
                  position: "top-left",
                });
              }
            } else {
              ElMessage.error("查找失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };
    const goFlowerLanguage = async (name: string) => {
      // goFind(num)
      if (name === "language") {
        //花语
        await request
            .get(apiList.getFlowerLanguage)
            .then((res) => {
              if (res.data.code === "200") {
                //获取所有花语
                language.value = res.data.data;
              }
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        language.value = [];
      }
    };

    return {
      Search,
      find,
      goFind,
      goFlowerLanguage,
      language,
      dialog,
      findValues,
      handleClick,
      activeName,
      goDetail
    };
  },
};
</script>

<style scoped>
.detail {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  /* border: 1px solid black; */
}

.head ::v-deep {
  display: flex;
  text-align: center;
}

.main {
  background-color: white;
  padding: 75px;
}

.flo {
  height: 100%;
  width: 35%;
  /* border: 1px solid rebeccapurple; */
}

.tit {
  /*padding-left: 65px;*/
  height: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
  /*border: 1px solid darkgray;*/
}

.items {
  /*text-align: center;*/
  line-height: 33px;

}

.el-button ::v-deep {
  border: none;
  width: 65%;
}
</style>