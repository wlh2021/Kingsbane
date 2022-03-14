import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Error404 from "../views/error/Error404"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: "/",
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/Index'),
        meta: {
          is: false,
          title: 'Kingsbane弑君 - 记录生活'
        }
      },
      {
        path: '/cot',
        name: 'categoryindex',
        component: () => import('@/views/CategoryIndex'),
        meta: {
          is: false,
        }
      },
      {
        path: '/view/:id',
        name: 'blogview',
        component: () => import('@/views/blog/BlogView'),
        meta: {
          is: false,
        }
      },
      {
        path: '/timeaxis',
        name: 'timeaxis',
        component: () => import('@/views/TimeAxis'),
        meta: {
          is: true,
          title: '时间轴'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About'),
        meta: {
          is: true,
          title: '关于我'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: Error404,
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
//   if (getToken()) { //如果已经登录
//     //登录状态再跳转login,让其直接进首页
//     if (to.name == 'Login') {
//       next('/backstage')
//     }//继续执行跳转操作
//     else{
//       if(!store.state.id){

//         store.dispatch("getUserInfo").then(data => { //获取用户信息
//           next()
//         }).catch(() => {
//           next({path: '/login'})
//         })
//       }
//       next()
//     } 
//   } else if (!getToken()) {  //还没登录
//     if (to.name === 'Login') next()

//     else if (to.name === 'User' || to.name === 'Blogs' || to.name === 'Comments' || to.name === 'Journal') next('/login')
//     else next()
//   }
// })

router.afterEach((to,next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});




export default router
