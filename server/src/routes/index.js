const express = require('express');
const bookRoutes = require('./book.routes');

const router = express.Router();

// API健康检查
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '图书管理系统API服务正常运行',
    timestamp: new Date().toISOString()
  });
});

// API版本
router.get('/', (req, res) => {
  res.status(200).json({
    name: '图书管理系统API',
    version: '1.0.0',
    description: '提供图书管理系统的后端服务',
    endpoints: {
      books: '/api/books'
    }
  });
});

// 图书路由
router.use('/books', bookRoutes);

module.exports = router;