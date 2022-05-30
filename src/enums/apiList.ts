export const enum apiList {
    login = "/consumer/login", //登录接口
    loginUp = "/consumer/login-up", //注册接口
    updateInfo = "/consumer/update-info", //更新帐户信息
    flowerCategory = "/flower-category/category", //查询鲜花分类接口
    type = "/flower/flowers?name=", //一类鲜花的所有花
    getFlowerDetail = "/flower/get-flower-detail?flowerid=", //根据id获取花的详情
    getAllFlowers = "/flower/get-all", //获取所有花
    getCommentByUserIdAndFlowerId = "/comments/get-all-comments?userid=", //获取某用户的评论
    getComment = "/comments/get-comment?flowerid=", //获取某种花的全部评论
    addRemark = "/comments/add-remark",//评价订单，对某种花的评价
    addCart = "/cart/add-cart?userid=", //添加购物车
    getCart = "/cart/get-cart?userid=", //获取某人的购物车信息
    pageCart = "/cart/get-page-cart?userid=", //分页购物车信息
    deleteCart = "/cart/delete-cart?userid=", //删去购物车中的某一项
    getAllNotices = "/notice/all-notices", //获取所有评论
    addAddress = "/address/add-address?userid=", //添加地址
    getAllAddress = "/address/get-address?userid=", //或取自己的地址
    deleteAddres = "/address/delete-address?addressid=", //根据addressid删除地址
    addOrder = "/order/add-order", //添加订单
    addOrderItems = "/orderitems/add-order-items",//添加子订单
    getAllPaidOrders = "/order/get-all-paid-orders",//获取所有已支付的订单，status=10
    updatePaidtoPending = "order/update-paidto-pending", //支付订单
    getAllItems = "/orderitems/get-all-items", //获取对应订单的所有子订单详情
    getAllItemsPending = "/order/get-all-items-pending",//获取所有待收货的订单 status = 40
    getAllFinishedOrders = "/order/get-all-items-finished",//获取所有已完成的订单，status = 50
    updatedFinished = "/order/updated-finished",//将订单状态更改为完成， status = 50
}
