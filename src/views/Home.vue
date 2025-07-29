<script setup>
import { ref, onMounted, h, watch } from 'vue'
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

// 分页参数
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50]
})

// 排序参数
const sortState = ref({
  sortField: 'createdAt',
  sortOrder: 'desc'
})

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
    sorter: true
  },
  {
    title: '作者',
    key: 'author',
    sorter: true
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
    sorter: true,
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
              onClick: () => viewBook(row._id || row.id)
            },
            { default: () => '查看', icon: () => h('n-icon', null, { default: () => h(ViewIcon) }) }
          ),
          h(
            'n-button',
            {
              tertiary: true,
              type: 'warning',
              size: 'small',
              onClick: () => editBook(row._id || row.id)
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
  
  const params = {
    page: pagination.value.page,
    limit: pagination.value.pageSize,
    sortField: sortState.value.sortField,
    sortOrder: sortState.value.sortOrder
  }
  
  await bookStore.fetchBooks(params)
  
  // 更新分页信息
  if (bookStore.pagination) {
    pagination.value.itemCount = bookStore.pagination.total
    pagination.value.pageCount = bookStore.pagination.pages
  }
  
  loading.value = false
}

// 搜索图书
async function searchBooks() {
  loading.value = true
  await bookStore.searchBooksByQuery(searchQuery.value)
  loading.value = false
}

// 处理分页变化
function handlePageChange(currentPage) {
  pagination.value.page = currentPage
  loadBooks()
}

// 处理每页条数变化
function handlePageSizeChange(pageSize) {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
  loadBooks()
}

// 处理排序变化
function handleSorterChange(sorter) {
  if (sorter) {
    sortState.value.sortField = sorter.columnKey
    sortState.value.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc'
  } else {
    sortState.value.sortField = 'createdAt'
    sortState.value.sortOrder = 'desc'
  }
  loadBooks()
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
    deleteBook(book._id || book.id)
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

// 监听搜索框变化，当清空时重新加载所有图书
watch(searchQuery, (newVal) => {
  if (!newVal) {
    loadBooks()
  }
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
        :pagination="pagination"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
        @update:sorter="handleSorterChange"
        striped
      />
    </div>
  </div>
</template>