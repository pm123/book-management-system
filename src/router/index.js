import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookDetail from '../views/BookDetail.vue'
import AddBook from '../views/AddBook.vue'
import EditBook from '../views/EditBook.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookDetail,
      props: true
    },
    {
      path: '/add',
      name: 'add-book',
      component: AddBook
    },
    {
      path: '/edit/:id',
      name: 'edit-book',
      component: EditBook,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router