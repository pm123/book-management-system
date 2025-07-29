import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import {
  create,
  NButton,
  NCard,
  NConfigProvider,
  NDataTable,
  NDatePicker,
  NDescriptions,
  NDescriptionsItem,
  NForm,
  NFormItem,
  NIcon,
  NImage,
  NInput,
  NInputNumber,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NMenu,
  NMessageProvider,
  NSelect,
  NSpace,
  NSpin
} from 'naive-ui'
import './style.css'

const app = createApp(App)

// 创建 naive-ui 实例
const naive = create({
  components: [
    NButton,
    NCard,
    NConfigProvider,
    NDataTable,
    NDatePicker,
    NDescriptions,
    NDescriptionsItem,
    NForm,
    NFormItem,
    NIcon,
    NImage,
    NInput,
    NInputNumber,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NMenu,
    NMessageProvider,
    NSelect,
    NSpace,
    NSpin
  ]
})

// 注册插件
app.use(router)
app.use(pinia)
app.use(naive)

app.mount('#app')
