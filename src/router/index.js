import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

/**
 * 1、若有嵌套路(children)由且有重定向(redirect)的情况下也要有组件声明(component)
 * 2、绝对路由以/开头，相对路由则不用
 * @param {String | RegExp} path 目标元素(可在参数后面加正则表达式):'/ | /path | /:path | /:pathMatch(.*)*'
 * @param {String | object} redirect 重定向:'discovery | {path: 'discovery'}'
 * @param {String} name 唯一名称
 * @param {Component} component 组件
 * @param {Object} component 嵌套路由
 * @param {Object} meta 其他参数
 */
const routes = [
  {
    path: '/',
    redirect: 'discovery',
    component: () => import('@/view/homePage/index.vue'),
    children: [
      {
        path: 'discovery',
        name: 'discovery',
        component: () => import('@/view/homePage/components/photoPage.vue')
      },
      {
        path: 'source',
        name: 'source',
        component: () => import('@/view/test.vue')
      },
      {
        path: 'contest',
        name: 'contest',
        component: () => import('@/view/homePage/components/photoPageCopy.vue')
      },
      {
        path: 'personal-information',
        name: 'personal-information',
        meta: { requiresAuth: true },
        component: () => import('@/view/personalInformation/index.vue')
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/view/test.vue')
      },
    ]
  },
  {
    path: '/:undefinded',
    name: 'undefinded',
    component: () => import('@/view/404NotFound.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/view/test.vue')
  },

]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  //   history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * 路由一定会在pinia之前建立，所以在路由守卫外用const userStore = useUserStore()会报错
 * 且在守卫外用会使pinia持久化存储失效
 */
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLogin) {
    userStore.loginDialogVisible = true
    return { path: '/discovery', query: { redirect: to.fullPath } }
  }
})

export default router

