const Book = require('../models/book.model');
const logger = require('../utils/logger');

/**
 * 获取所有图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function getAllBooks(req, res, next) {
  try {
    // 解析查询参数
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    // 查询数据库
    const query = await Book.find({});
    const booksArray = await query.toArray();
    
    // 手动排序
    booksArray.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (fieldA < fieldB) return sortOrder === 1 ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 1 ? 1 : -1;
      return 0;
    });
    
    // 手动分页
    const paginatedBooks = booksArray.slice(skip, skip + limit);
    
    // 获取总数
    const total = booksArray.length;

    // 返回结果
    res.status(200).json({
      success: true,
      data: paginatedBooks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 根据ID获取图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    
    const books = await Book.find({});
    const booksArray = await books.toArray();
    const book = booksArray.find(book => book._id.toString() === id);
    
    if (!book) {
      const error = new Error('图书不存在');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 创建新图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function createBook(req, res, next) {
  try {
    const bookData = req.body;
    
    // 生成唯一ID
    bookData._id = require('crypto').randomUUID();
    
    // 添加创建时间
    bookData.createdAt = new Date();
    bookData.updatedAt = new Date();
    
    // 创建新图书
    await Book.insertOne(bookData);
    
    logger.info(`创建了新图书: ${bookData.title}`);
    
    res.status(201).json({
      success: true,
      data: bookData
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 更新图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // 获取所有图书
    const books = await Book.find({});
    const booksArray = await books.toArray();
    
    // 查找要更新的图书索引
    const bookIndex = booksArray.findIndex(book => book._id.toString() === id);
    
    if (bookIndex === -1) {
      const error = new Error('图书不存在');
      error.statusCode = 404;
      return next(error);
    }
    
    // 更新图书
    const updatedBook = { ...booksArray[bookIndex], ...updateData };
    
    // 保存更新后的图书
    await Book.updateOne({ _id: booksArray[bookIndex]._id }, updatedBook);
    
    logger.info(`更新了图书: ${updatedBook.title}`);
    
    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 删除图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    
    // 获取所有图书
    const books = await Book.find({});
    const booksArray = await books.toArray();
    
    // 查找要删除的图书
    const bookIndex = booksArray.findIndex(book => book._id.toString() === id);
    
    if (bookIndex === -1) {
      const error = new Error('图书不存在');
      error.statusCode = 404;
      return next(error);
    }
    
    const book = booksArray[bookIndex];
    
    // 删除图书
    await Book.deleteOne({ _id: book._id });
    
    logger.info(`删除了图书: ${book.title}`);
    
    res.status(200).json({
      success: true,
      message: '图书删除成功'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 搜索图书
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件
 */
async function searchBooks(req, res, next) {
  try {
    const { query } = req.query;
    
    if (!query) {
      return getAllBooks(req, res, next);
    }
    
    // 获取所有图书
    const allBooks = await Book.find({});
    const booksArray = await allBooks.toArray();
    
    // 手动过滤
    const queryLower = query.toLowerCase();
    const books = booksArray.filter(book => {
      return (
        (book.title && book.title.toLowerCase().includes(queryLower)) ||
        (book.author && book.author.toLowerCase().includes(queryLower)) ||
        (book.publisher && book.publisher.toLowerCase().includes(queryLower)) ||
        (book.category && book.category.toLowerCase().includes(queryLower)) ||
        (book.description && book.description.toLowerCase().includes(queryLower))
      );
    });
    
    res.status(200).json({
      success: true,
      data: books,
      count: books.length
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
};