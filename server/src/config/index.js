const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  // 服务器配置
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // 数据库配置
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/book_management',
  },
  
  // 日志配置
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  
  // CORS配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
};