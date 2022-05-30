import request from "@/api/request";

const http = {
    get(url: any, params: any) {
        const config = {
            method: 'get',
            url: url,
            params: undefined
        }
        if (params) config.params = params
        return request(config)
    },
    post(url: any, params: {}) {
        const config = {
            method: 'post',
            url: url,
            data: {}
        }
        if (params) config.data = params
        return request(config)
    },
    put(url: any, params: any) {
        const config = {
            method: 'put',
            url: url,
            params: undefined
        }
        if (params) config.params = params
        return request(config)
    },
    delete(url: any, params: any) {
        const config = {
            method: 'delete',
            url: url,
            params: undefined
        }
        if (params) config.params = params
        return request(config)
    }
}

export default http