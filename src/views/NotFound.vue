<script setup>
import { useRouter } from 'vue-router'
import { NButton, NResult } from 'naive-ui'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[70vh]">
    <n-result
      status="404"
      title="页面未找到"
      description="您访问的页面不存在或已被移除"
    >
      <template #footer>
        <n-button type="primary" @click="goHome">
          返回首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>