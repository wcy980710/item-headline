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
  }
]

const router = new VueRouter({
  routes
})

export default router
