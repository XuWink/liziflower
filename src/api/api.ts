import http from "@/api/http";


const resquest = "/testIp/request/"



// get请求
export default {
    loginIn(params: any) {
        return http.post(`/consumer-info/login`, params)
    },
    getListAPI(params: any) {
        return http.get(`${resquest}/getList.json`, params)
    },
    postFormAPI(params: any) {
        return http.post(`${resquest}/postForm.json`, params)
    }
}

