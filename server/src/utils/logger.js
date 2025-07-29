const winston = require('winston');
const config = require('../config');

// 定义日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// 创建日志记录器
const logger = winston.createLogger({
  level: config.log.level,
  format: logFormat,
  defaultMeta: { service: 'book-management-api' },
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    })
  ]
});

// 在非Vercel环境中，可以添加文件日志
if (process.env.VERCEL !== '1' && config.nodeEnv !== 'production') {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // 尝试创建日志目录
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // 添加文件日志
    logger.add(new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }));
    
    logger.add(new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }));
  } catch (err) {
    console.error('无法创建日志文件:', err.message);
  }
}

module.exports = logger;