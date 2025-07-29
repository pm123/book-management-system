const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

/**
 * @route   GET /api/books
 * @desc    获取所有图书
 * @access  Public
 */
router.get('/', bookController.getAllBooks);

/**
 * @route   GET /api/books/search
 * @desc    搜索图书
 * @access  Public
 */
router.get('/search', bookController.searchBooks);

/**
 * @route   GET /api/books/:id
 * @desc    根据ID获取图书
 * @access  Public
 */
router.get('/:id', bookController.getBookById);

/**
 * @route   POST /api/books
 * @desc    创建新图书
 * @access  Public
 */
router.post('/', bookController.createBook);

/**
 * @route   PUT /api/books/:id
 * @desc    更新图书
 * @access  Public
 */
router.put('/:id', bookController.updateBook);

/**
 * @route   DELETE /api/books/:id
 * @desc    删除图书
 * @access  Public
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;