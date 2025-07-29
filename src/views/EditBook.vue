<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '../stores/books'
import { useMessage } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const message = useMessage()

const loading = ref(false)
const loadingBook = ref(true)
const error = ref(null)

// 图书分类选项
const categoryOptions = [
  { label: '科幻', value: '科幻' },
  { label: '文学', value: '文学' },
  { label: '历史', value: '历史' },
  { label: '哲学', value: '哲学' },
  { label: '经济', value: '经济' },
  { label: '心理学', value: '心理学' },
  { label: '计算机', value: '计算机' },
  { label: '艺术', value: '艺术' },
  { label: '传记', value: '传记' },
  { label: '小说', value: '小说' },
  { label: '其他', value: '其他' }
]

// 表单数据
const formValue = reactive({
  title: '',
  author: '',
  publisher: '',
  category: null,
  description: '',
  price: 0,
  cover: '',
  publicationDate: null,
  isbn: '',
  pages: 0
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入书名', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ],
  publisher: [
    { required: true, message: '请输入出版社', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  price: [
    { required: true, type: 'number', message: '请输入价格', trigger: 'change' },
    { type: 'number', min: 0, message: '价格不能为负数', trigger: 'change' }
  ],
  cover: [
    { required: true, message: '请输入封面图片URL', trigger: 'blur' }
  ],
  pages: [
    { required: true, type: 'number', message: '请输入页数', trigger: 'change' },
    { type: 'number', min: 1, message: '页数必须大于0', trigger: 'change' }
  ]
}

const formRef = ref(null)

// 加载图书数据
async function loadBookData() {
  loadingBook.value = true
  error.value = null
  
  try {
    const id = route.params.id
    const book = await bookStore.fetchBookById(id)
    
    if (book) {
      // 填充表单数据
      Object.keys(formValue).forEach(key => {
        if (key === 'publicationDate' && book[key]) {
          // 将日期字符串转换为时间戳
          formValue[key] = new Date(book[key]).getTime()
        } else {
          formValue[key] = book[key]
        }
      })
    }
  } catch (err) {
    error.value = '获取图书数据失败'
    console.error(err)
  } finally {
    loadingBook.value = false
  }
}

// 提交表单
async function handleSubmit(e) {
  e.preventDefault()
  
  formRef.value?.validate(async (errors) => {
    if (errors) {
      return
    }
    
    loading.value = true
    
    try {
      // 格式化日期
      const formData = { ...formValue }
      if (formData.publicationDate) {
        formData.publicationDate = formatDate(formData.publicationDate)
      }
      
      const id = route.params.id
      const result = await bookStore.editBook(id, formData)
      
      if (result) {
        message.success('更新图书成功')
        router.push(`/book/${id}`)
      } else {
        message.error('更新图书失败')
      }
    } catch (error) {
      message.error('更新图书失败')
      console.error(error)
    } finally {
      loading.value = false
    }
  })
}

// 重置表单
function resetForm() {
  loadBookData()
  formRef.value?.restoreValidation()
}

// 返回详情
function goBack() {
  router.push(`/book/${route.params.id}`)
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(() => {
  loadBookData()
})
</script>

<template>
  <div>
    <n-spin :show="loadingBook">
      <n-card class="shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">编辑图书</h2>
          <n-button @click="goBack">返回详情</n-button>
        </div>
        
        <div v-if="error" class="text-center text-red-500 my-4">
          <p>{{ error }}</p>
          <n-button class="mt-2" @click="loadBookData">重试</n-button>
        </div>
        
        <n-form
          v-else
          ref="formRef"
          :model="formValue"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <n-form-item label="书名" path="title">
              <n-input v-model:value="formValue.title" placeholder="请输入书名" />
            </n-form-item>
            
            <n-form-item label="作者" path="author">
              <n-input v-model:value="formValue.author" placeholder="请输入作者" />
            </n-form-item>
            
            <n-form-item label="出版社" path="publisher">
              <n-input v-model:value="formValue.publisher" placeholder="请输入出版社" />
            </n-form-item>
            
            <n-form-item label="分类" path="category">
              <n-select
                v-model:value="formValue.category"
                :options="categoryOptions"
                placeholder="请选择分类"
              />
            </n-form-item>
            
            <n-form-item label="价格" path="price">
              <n-input-number
                v-model:value="formValue.price"
                placeholder="请输入价格"
                :min="0"
                :precision="2"
                style="width: 100%"
              />
            </n-form-item>
            
            <n-form-item label="页数" path="pages">
              <n-input-number
                v-model:value="formValue.pages"
                placeholder="请输入页数"
                :min="1"
                style="width: 100%"
              />
            </n-form-item>
            
            <n-form-item label="ISBN" path="isbn">
              <n-input v-model:value="formValue.isbn" placeholder="请输入ISBN" />
            </n-form-item>
            
            <n-form-item label="出版日期" path="publicationDate">
              <n-date-picker
                v-model:value="formValue.publicationDate"
                type="date"
                style="width: 100%"
              />
            </n-form-item>
            
            <n-form-item label="封面图片URL" path="cover" :span="2">
              <n-input v-model:value="formValue.cover" placeholder="请输入封面图片URL" />
            </n-form-item>
            
            <n-form-item label="简介" path="description" :span="2">
              <n-input
                v-model:value="formValue.description"
                type="textarea"
                placeholder="请输入图书简介"
                :autosize="{ minRows: 3, maxRows: 6 }"
              />
            </n-form-item>
          </div>
          
          <div class="flex justify-center mt-6">
            <n-space>
              <n-button @click="resetForm">重置</n-button>
              <n-button type="primary" @click="handleSubmit" :loading="loading">保存</n-button>
            </n-space>
          </div>
        </n-form>
      </n-card>
    </n-spin>
  </div>
</template>