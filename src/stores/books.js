import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getBooks, getBookById, addBook, updateBook, deleteBook, searchBooks } from '../api/books'

export const useBookStore = defineStore('books', () => {
  // 状态
  const books = ref([])
  const currentBook = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 获取所有图书
  async function fetchBooks() {
    loading.value = true
    error.value = null
    try {
      books.value = await getBooks()
    } catch (err) {
      error.value = '获取图书列表失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // 获取单本图书
  async function fetchBookById(id) {
    loading.value = true
    error.value = null
    try {
      currentBook.value = await getBookById(id)
      return currentBook.value
    } catch (err) {
      error.value = '获取图书详情失败'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 添加图书
  async function createBook(bookData) {
    loading.value = true
    error.value = null
    try {
      const newBook = await addBook(bookData)
      books.value.push(newBook)
      return newBook
    } catch (err) {
      error.value = '添加图书失败'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 更新图书
  async function editBook(id, bookData) {
    loading.value = true
    error.value = null
    try {
      const updatedBook = await updateBook(id, bookData)
      const index = books.value.findIndex(book => book.id === id)
      if (index !== -1) {
        books.value[index] = updatedBook
      }
      return updatedBook
    } catch (err) {
      error.value = '更新图书失败'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 删除图书
  async function removeBook(id) {
    loading.value = true
    error.value = null
    try {
      await deleteBook(id)
      books.value = books.value.filter(book => book.id !== id)
      return true
    } catch (err) {
      error.value = '删除图书失败'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 搜索图书
  async function searchBooksByQuery(query) {
    loading.value = true
    error.value = null
    try {
      books.value = await searchBooks(query)
      return books.value
    } catch (err) {
      error.value = '搜索图书失败'
      console.error(err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    books,
    currentBook,
    loading,
    error,
    fetchBooks,
    fetchBookById,
    createBook,
    editBook,
    removeBook,
    searchBooksByQuery
  }
})