import { createApp } from 'vue'
import './style.css'
import router from './router/index.js'
import App from './App.vue'

const app = createApp(App)
// 全局注册变量(在view/test下有他怎么调用出来的方法)
app.config.globalProperties.$ooo = '要老命'


app.use(router)
app.mount('#app')



