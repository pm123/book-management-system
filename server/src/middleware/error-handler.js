const logger = require('../utils/logger');

/**
 * 错误处理中间件
 */
function errorHandler(err, req, res, next) {
  // 记录错误日志
  logger.error(`${err.name}: ${err.message}`, { 
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });

  // 设置状态码
  const statusCode = err.statusCode || 500;
  
  // 构建错误响应
  const errorResponse = {
    error: {
      message: err.message || '服务器内部错误',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  // 发送响应
  res.status(statusCode).json(errorResponse);
}

/**
 * 404错误处理中间件
 */
function notFoundHandler(req, res, next) {
  const err = new Error(`找不到路径: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
}

module.exports = {
  errorHandler,
  notFoundHandler
};