/**
 * 入口文件
 */
import Vue from 'vue';
import App from './App.vue';

import "./sass/commons.scss";

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import routes from './routers';

//import vueLazyLoad from './directives/lazyload';


//注册插件
[
    VueRouter,
    VueResource
].map((item)=>{
    Vue.use(item);
});

var vueRouter = new VueRouter({
  //hashbang: false,
  history: true,
  routes
  //saveScrollPosition: true
});

//增加权限控制
// vueRouter.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.auth)) {
//         if(jskit.isWechat){
//           if(!auth.getToken()){
//             next({
//               path: '/login',
//               query: { redirect: to.fullPath }
//             })
//           }
//           jskit.hideMenuItems(3);
//         }else{
//           next();
//         }
//     }else{
//       next();
//     }
// });

new Vue({
  router:vueRouter,
  render: h => h(App)
}).$mount('app')
