const { mongoose } = require('../utils/db');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '书名不能为空'],
    trim: true
  },
  author: {
    type: String,
    required: [true, '作者不能为空'],
    trim: true
  },
  publisher: {
    type: String,
    required: [true, '出版社不能为空'],
    trim: true
  },
  category: {
    type: String,
    required: [true, '分类不能为空'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, '价格不能为空'],
    min: [0, '价格不能为负数']
  },
  cover: {
    type: String,
    required: [true, '封面图片URL不能为空']
  },
  publicationDate: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  pages: {
    type: Number,
    min: [1, '页数必须大于0']
  }
}, {
  timestamps: true,
  versionKey: false
});

// 内存数据库不支持索引，这里省略索引创建

// 创建模型
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;