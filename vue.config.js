// vue.config.js
module.exports = {
    devServer: {
        https: true,
        proxy: { //配置多个代理
            "/api": {
                target: "http://127.0.0.1:8096/api",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": ''
                }
            },
        }
    }
}