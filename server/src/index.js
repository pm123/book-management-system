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

// 启动服务器
async function startServer() {
  try {
    // 连接数据库
    await connectDB();
    
    // 初始化数据库
    await seedDatabase();
    
    // 启动服务器
    const PORT = config.port;
    app.listen(PORT, () => {
      logger.info(`服务器在端口 ${PORT} 上运行 (${config.nodeEnv}模式)`);
      logger.info(`API文档: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    logger.error(`服务器启动失败: ${err.message}`);
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  logger.error(`未捕获的异常: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`未处理的Promise拒绝: ${reason}`, { promise });
  // 不立即退出，让程序继续运行
});

// 启动服务器
startServer();