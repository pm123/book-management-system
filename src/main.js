import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import naive from 'naive-ui'
import './style.css'

const app = createApp(App)

// 注册插件
app.use(router)
app.use(pinia)
app.use(naive)

app.mount('#app')
