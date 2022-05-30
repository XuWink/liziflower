//公共方法类
import request from "@/api/request";
import {apiList} from "@/enums/apiList";
import {useStore} from "vuex";

export async function add_Cart(data: any) {
    return await request.put(apiList.addCart + data.userid + "&flowerid=" + data.flowerid);
}