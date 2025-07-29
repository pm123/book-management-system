const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
// 首先尝试加载生产环境变量
try {
  dotenv.config({ path: path.join(__dirname, '../../.env.production') });
} catch (err) {
  console.log('未找到生产环境配置文件，将使用开发环境配置');
}

// 然后加载开发环境变量（如果存在）
try {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
} catch (err) {
  console.log('未找到开发环境配置文件');
}

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