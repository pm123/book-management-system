const { clearDB } = require('./memory-db');
const { seedDatabase, sampleBooks } = require('./seed');
const logger = require('./logger');

async function resetDatabase() {
  try {
    logger.info('开始重置数据库...');
    
    // 清空数据库
    clearDB();
    logger.info('数据库已清空');
    
    // 重新填充数据
    await seedDatabase();
    
    logger.info('数据库重置完成');
  } catch (err) {
    logger.error('数据库重置失败:', err);
  }
}

// 如果直接运行此脚本，则执行重置
if (require.main === module) {
  resetDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = {
  resetDatabase
};