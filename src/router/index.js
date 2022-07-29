import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: "layout",
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'shouye',
        component: () => import('@/views/shouye')
      },
      {
        path: '/wode',
        name: 'wode',
        component: () => import('@/views/wode')
      },
      {
        path: '/wenda',
        name: 'wenda',
        component: () => import('@/views/wenda')
      },
      {
        path: '/shipin',
        name: 'shipin',
        component: () => import('@/views/shipin')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
    // #这里是路由懒加载的写法
    // #完整写法是：@views/login/index.vue，但是index.vue可以省略，导入一个目录时默认导入目录下的index.vue
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId', // 需要传递文章id
    name: 'article',
    component: () => import('@/views/article'),
    // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
    props: true
  },
  {
    path: '/user/profile', // 需要传递文章id
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
