<script setup>
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../stores/books'
import { useMessage } from 'naive-ui'
import { 
  SearchOutline as SearchIcon,
  EyeOutline as ViewIcon,
  CreateOutline as EditIcon,
  TrashOutline as DeleteIcon
} from '@vicons/ionicons5'

const router = useRouter()
const bookStore = useBookStore()
const message = useMessage()

const searchQuery = ref('')
const loading = ref(false)

// 表格列定义
const columns = [
  {
    title: '封面',
    key: 'cover',
    width: 100,
    render(row) {
      return h('img', {
        src: row.cover,
        alt: row.title,
        style: 'width: 60px; height: 80px; object-fit: cover;',
        class: 'rounded shadow'
      })
    }
  },
  {
    title: '书名',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: '作者',
    key: 'author',
    sorter: (a, b) => a.author.localeCompare(b.author)
  },
  {
    title: '分类',
    key: 'category'
  },
  {
    title: '出版社',
    key: 'publisher'
  },
  {
    title: '价格',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
    render(row) {
      return `¥${row.price.toFixed(2)}`
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render(row) {
      return h('n-space', { justify: 'center' }, {
        default: () => [
          h(
            'n-button',
            {
              tertiary: true,
              type: 'info',
              size: 'small',
              onClick: () => viewBook(row.id)
            },
            { default: () => '查看', icon: () => h('n-icon', null, { default: () => h(ViewIcon) }) }
          ),
          h(
            'n-button',
            {
              tertiary: true,
              type: 'warning',
              size: 'small',
              onClick: () => editBook(row.id)
            },
            { default: () => '编辑', icon: () => h('n-icon', null, { default: () => h(EditIcon) }) }
          ),
          h(
            'n-button',
            {
              tertiary: true,
              type: 'error',
              size: 'small',
              onClick: () => confirmDelete(row)
            },
            { default: () => '删除', icon: () => h('n-icon', null, { default: () => h(DeleteIcon) }) }
          )
        ]
      })
    }
  }
]

// 加载图书数据
async function loadBooks() {
  loading.value = true
  await bookStore.fetchBooks()
  loading.value = false
}

// 搜索图书
async function searchBooks() {
  loading.value = true
  await bookStore.searchBooksByQuery(searchQuery.value)
  loading.value = false
}

// 查看图书详情
function viewBook(id) {
  router.push(`/book/${id}`)
}

// 编辑图书
function editBook(id) {
  router.push(`/edit/${id}`)
}

// 确认删除
function confirmDelete(book) {
  if (confirm(`确定要删除《${book.title}》吗？`)) {
    deleteBook(book.id)
  }
}

// 删除图书
async function deleteBook(id) {
  loading.value = true
  const success = await bookStore.removeBook(id)
  loading.value = false
  
  if (success) {
    message.success('删除成功')
  } else {
    message.error('删除失败')
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadBooks()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">图书列表</h2>
      
      <!-- 搜索栏 -->
      <div class="flex mb-4">
        <n-input
          v-model:value="searchQuery"
          placeholder="搜索书名、作者、分类..."
          class="max-w-md mr-2"
          @keyup.enter="searchBooks"
        >
          <template #suffix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
        <n-button type="primary" @click="searchBooks" :loading="loading">
          搜索
        </n-button>
        <n-button class="ml-2" @click="loadBooks">
          重置
        </n-button>
      </div>
      
      <!-- 图书表格 -->
      <n-data-table
        :columns="columns"
        :data="bookStore.books"
        :loading="loading"
        :bordered="false"
        :single-line="false"
        striped
      />
    </div>
  </div>
</template>