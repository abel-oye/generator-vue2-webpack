/**
 * 定义路由
 * 通过路由加载相应的模块
 */

export default [{
    path: "/",
    name: "index",
    meta: {
        auth: false
    },
    component: resolve => require(['./pages/home'], resolve)
},{
    path: "*",
    name: "404",
    component: resolve => require(['./pages/404.vue'], resolve)
}]