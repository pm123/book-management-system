const { mongoose, connectDB } = require('./memory-db');
const logger = require('./logger');

// 导出mongoose和connectDB
module.exports = {
  mongoose,
  connectDB,
};