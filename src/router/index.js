import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/view/test.vue')
  },
  {
    path: '/nav',
    name: 'nav',
    component: () => import('@/view/navigator.vue')
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  //   history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

