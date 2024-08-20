import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia持久化
import piniaPersist from 'pinia-plugin-persistedstate'
import router from './router/index.js'
import App from './App.vue'

import './style.css'
import './assets/style/root.css'
import './assets/style/masonry.css'
import './assets/iconFont/iconfont.css'

// 导入瀑布流插件
import { VueMasonryPlugin } from 'vue-masonry';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
// 全局注册变量(在view/test下有他怎么调用出来的方法)
app.config.globalProperties.$ooo = '要老命'


app.use(pinia)
app.use(router)
app.use(VueMasonryPlugin);
app.mount('#app')



