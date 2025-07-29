const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const { connectDB } = require('./utils/db');
const { seedDatabase } = require('./utils/seed');
const logger = require('./utils/logger');
const apiRoutes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error-handler');

// 创建Express应用
const app = express();

// 创建日志目录
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 中间件
app.use(cors(config.cors)); // 启用CORS
app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码的请求体

// 日志中间件
if (config.nodeEnv === 'development') {
  app.use(morgan('dev')); // 开发环境使用简洁日志
} else {
  // 生产环境使用详细日志并写入文件
  const accessLogStream = fs.createWriteStream(
    path.join(logDir, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
}

// API路由
app.use('/api', apiRoutes);

// 404处理
app.use(notFoundHandler);

// 错误处理
app.use(errorHandler);

// 初始化数据库连接和种子数据
(async () => {
  try {
    // 连接数据库
    await connectDB();
    
    // 初始化数据库
    await seedDatabase();
    
    logger.info(`服务器初始化完成 (${config.nodeEnv}模式)`);
  } catch (err) {
    logger.error(`服务器初始化失败: ${err.message}`);
  }
})();

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  logger.error(`未捕获的异常: ${err.message}`, { stack: err.stack });
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`未处理的Promise拒绝: ${reason}`, { promise });
});

// 如果在本地环境运行，则启动服务器
if (process.env.NODE_ENV !== 'production') {
  const PORT = config.port;
  app.listen(PORT, () => {
    logger.info(`服务器在端口 ${PORT} 上运行 (${config.nodeEnv}模式)`);
    logger.info(`API文档: http://localhost:${PORT}/api`);
  });
}

// 导出应用实例供Vercel使用
module.exports = app;