import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "li-zi-container",
        component: () => import("@/views/LiZiContainer.vue"),
        children: [
            //子路由，对应container
            {
                path: "/",
                name: "home",
                component: () => import("@/views/Home.vue"),
            },
            {
                path: "/scrolltop",
                name: "li-zi-scrolltop",
                component: () => import("@/components/layouts/LiZiScrollTop.vue"),
            },
            {
                path: "/personal",
                name: "personal",
                meta: {
                    needLogin: true, //需要登录
                },
                component: () => import("@/views/personal/PersonalData.vue"),
            },
            {
                path: "/shopping-cart",
                name: "shopping-cart",
                meta: {
                    needLogin: true, //需要登录
                },
                component: () => import("@/components/ShoppingCart.vue"),
            },
            {
                path: "/notice",
                name: "notice",
                component: () => import("@/components/Notice.vue"),
            },
            {
                path: "/flower-category",
                name: "flower-category",
                component: () => import("@/components/Category.vue"),
            },
            {
                path: "/details",
                name: "details",
                component: () => import("@/components/details.vue"),
            },
            {
                path: "/password",
                name: "password",
                meta: {
                    needLogin: true, //需要登录
                },
                component: () => import("@/views/setting/Password.vue"),
            },
            {
                path: "/my-orders",
                name: "myorders",
                meta: {
                    needLogin: true, //需要登录
                },
                component: () => import("@/views/MyOrders.vue"),
                children: [
                    {
                        path: "/paid-orders",
                        name: "paidorders",
                        component: () => import("@/components/PaidOrders.vue"),
                    },
                    {
                        path: "/pending-orders",
                        name: "pendingorders",
                        component: () => import("@/components/PendingOrders.vue"),
                    },
                    {
                        path: "/finished-orders",
                        name: "finishedorders",
                        component: () => import("@/components/FinishedOrders.vue"),
                    },
                ],
            },
            {
                path: "/address",
                name: "address",
                meta: {
                    needLogin: true, //需要登录
                },
                component: () => import("@/views/setting/Address.vue"),
            },
            {
                path: "editor",
                name: "editor",
                component: () => import("@/components/layouts/myEditor.vue"),
                meta: {
                    needLogin: true,
                },
            },
            {
                path: "flower-art",
                name: "flowerart",
                component: () => import("@/components/FlowerArt.vue"),
            },
            {
                path: "/404",
                name: "404",
                component: () => import("@/views/error/NotFind404.vue"),
            },
            {
                path: "/notice-detail",
                name: "noticeDetail",
                component: () => import("@/components/NoticeDetali.vue"),
            },
            {
                path: "/money",
                name: "money",
                meta: {
                    needLogin: true,
                },
                component: () => import("@/views/personal/money.vue"),
            },
        ],
    },
    {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/SignUp.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});
//导航守卫
router.beforeEach((to, from, next) => {
    const userid = sessionStorage.userid;
    if (to.name) {//判断路径是否存在
        if (to.meta.needLogin) {//需要登录的页面
            if (userid) {//已经登录
                next();
            } else {//未登录
                next({path: "/404"});
            }
        } else {//不需要登录的页面
            next();
        }
    } else {//路径不存在
        next({path: "/404"})
    }
});
export default router;
