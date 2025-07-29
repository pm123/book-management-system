<script setup>
import { ref, computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  BookOutline as BookIcon,
  AddCircleOutline as AddIcon,
  HomeOutline as HomeIcon,
  SearchOutline as SearchIcon
} from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()

// 渲染图标
function renderIcon(icon) {
  return () => h('n-icon', null, { default: () => h(icon) })
}

// 菜单项
const menuOptions = [
  {
    label: '图书列表',
    key: 'home',
    icon: renderIcon(BookIcon)
  },
  {
    label: '添加图书',
    key: 'add',
    icon: renderIcon(AddIcon)
  }
]

// 当前选中的菜单项
const activeKey = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  if (path === '/add') return 'add'
  if (path.startsWith('/book/')) return 'home'
  if (path.startsWith('/edit/')) return 'home'
  return ''
})

// 处理菜单选择
function handleMenuSelect(key) {
  switch (key) {
    case 'home':
      router.push('/')
      break
    case 'add':
      router.push('/add')
      break
  }
}
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-layout class="min-h-screen">
        <n-layout-header class="p-4 shadow-md bg-white">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <n-icon size="24" class="mr-2 text-blue-600">
                <book-icon />
              </n-icon>
              <h1 class="text-xl font-bold text-gray-800 shrink-0">图书管理系统</h1>
            </div>
            <n-menu
              v-model:value="activeKey"
              mode="horizontal"
              :options="menuOptions"
              @update:value="handleMenuSelect"
            />
          </div>
        </n-layout-header>
        
        <n-layout-content class="p-4">
          <div class="container mx-auto py-4">
            <router-view />
          </div>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>
