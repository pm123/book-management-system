<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '../stores/books'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()

const book = ref(null)
const loading = ref(true)
const error = ref(null)

// 获取图书详情
async function fetchBookDetail() {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    const result = await bookStore.fetchBookById(id)
    book.value = result
  } catch (err) {
    error.value = '获取图书详情失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 返回列表
function goBack() {
  router.push('/')
}

// 编辑图书
function editBook() {
  router.push(`/edit/${route.params.id}`)
}

onMounted(() => {
  fetchBookDetail()
})
</script>

<template>
  <div>
    <n-space vertical>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">图书详情</h2>
        <n-space>
          <n-button @click="goBack">返回列表</n-button>
          <n-button type="primary" @click="editBook">编辑图书</n-button>
        </n-space>
      </div>
      
      <n-spin :show="loading">
        <n-card v-if="book" class="shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 图书封面 -->
            <div class="flex justify-center">
              <n-image
                :src="book.cover"
                :alt="book.title"
                object-fit="cover"
                class="max-w-xs rounded shadow"
                preview-disabled
              />
            </div>
            
            <!-- 图书信息 -->
            <div class="md:col-span-2">
              <n-descriptions bordered label-placement="left" :column="1">
                <n-descriptions-item label="书名">
                  {{ book.title }}
                </n-descriptions-item>
                <n-descriptions-item label="作者">
                  {{ book.author }}
                </n-descriptions-item>
                <n-descriptions-item label="出版社">
                  {{ book.publisher }}
                </n-descriptions-item>
                <n-descriptions-item label="分类">
                  {{ book.category }}
                </n-descriptions-item>
                <n-descriptions-item label="价格">
                  ¥{{ book.price.toFixed(2) }}
                </n-descriptions-item>
                <n-descriptions-item label="出版日期">
                  {{ book.publicationDate }}
                </n-descriptions-item>
                <n-descriptions-item label="ISBN">
                  {{ book.isbn }}
                </n-descriptions-item>
                <n-descriptions-item label="页数">
                  {{ book.pages }}
                </n-descriptions-item>
                <n-descriptions-item label="简介">
                  {{ book.description }}
                </n-descriptions-item>
              </n-descriptions>
            </div>
          </div>
        </n-card>
        
        <!-- 错误提示 -->
        <n-card v-else-if="error" class="shadow-sm">
          <div class="text-center text-red-500">
            <p>{{ error }}</p>
            <n-button class="mt-4" @click="fetchBookDetail">重试</n-button>
          </div>
        </n-card>
      </n-spin>
    </n-space>
  </div>
</template>