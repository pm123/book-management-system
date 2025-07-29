/**
 * 内存数据库模块 - 用于模拟MongoDB
 */

// 内存存储
const db = {
  books: []
};

// 生成唯一ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// 模拟集合操作
class Collection {
  constructor(name) {
    this.name = name;
    if (!db[name]) {
      db[name] = [];
    }
  }

  // 查找文档
  async find(query = {}) {
    let results = [...db[this.name]];
    
    // 处理查询条件
    if (Object.keys(query).length > 0) {
      results = results.filter(item => {
        return Object.keys(query).every(key => {
          if (typeof query[key] === 'object' && query[key] !== null) {
            // 处理特殊查询操作符
            if (query[key].$regex) {
              const regex = new RegExp(query[key].$regex, query[key].$options || '');
              return regex.test(item[key]);
            }
          }
          return item[key] === query[key];
        });
      });
    }
    
    return {
      // 支持排序
      sort: (sortOptions) => {
        const sortKey = Object.keys(sortOptions)[0];
        const sortOrder = sortOptions[sortKey];
        results.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return sortOrder === 1 ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 1 ? 1 : -1;
          return 0;
        });
        return {
          // 支持分页
          skip: (n) => {
            results = results.slice(n);
            return {
              limit: (n) => {
                return results.slice(0, n);
              },
              toArray: () => results
            };
          },
          limit: (n) => {
            return results.slice(0, n);
          },
          toArray: () => results
        };
      },
      // 支持分页
      skip: (n) => {
        results = results.slice(n);
        return {
          limit: (n) => {
            return results.slice(0, n);
          },
          toArray: () => results
        };
      },
      limit: (n) => {
        return results.slice(0, n);
      },
      toArray: () => results
    };
  }

  // 查找单个文档
  async findOne(query = {}) {
    const results = await this.find(query);
    const items = await results.toArray();
    return items[0] || null;
  }

  // 根据ID查找
  async findById(id) {
    return this.findOne({ _id: id });
  }

  // 创建文档
  async create(data) {
    const newItem = { ...data, _id: data._id || generateId() };
    db[this.name].push(newItem);
    return newItem;
  }

  // 更新文档
  async findByIdAndUpdate(id, update) {
    const index = db[this.name].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    // 处理$set操作符
    if (update.$set) {
      Object.keys(update.$set).forEach(key => {
        db[this.name][index][key] = update.$set[key];
      });
    } else {
      // 直接更新
      const { _id } = db[this.name][index]; // 保留原始ID
      db[this.name][index] = { ...update, _id };
    }
    
    return db[this.name][index];
  }

  // 删除文档
  async findByIdAndDelete(id) {
    const index = db[this.name].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    const deleted = db[this.name][index];
    db[this.name].splice(index, 1);
    return deleted;
  }

  // 计数
  async countDocuments(query = {}) {
    const results = await this.find(query);
    const items = await results.toArray();
    return items.length;
  }
}

// 模拟Mongoose模型
class Model {
  constructor(name, schema) {
    this.collection = new Collection(name);
    this.schema = schema;
  }

  // 查找文档
  find(query) {
    return this.collection.find(query);
  }

  // 查找单个文档
  findOne(query) {
    return this.collection.findOne(query);
  }

  // 根据ID查找
  findById(id) {
    return this.collection.findById(id);
  }

  // 创建文档
  create(data) {
    return this.collection.create(data);
  }

  // 更新文档
  findByIdAndUpdate(id, update) {
    return this.collection.findByIdAndUpdate(id, update);
  }

  // 删除文档
  findByIdAndDelete(id) {
    return this.collection.findByIdAndDelete(id);
  }

  // 计数
  countDocuments(query) {
    return this.collection.countDocuments(query);
  }
}

// 模拟Mongoose
const mongoose = {
  models: {},
  
  // 模拟连接
  connect: () => Promise.resolve(),
  
  // 模拟模型定义
  model: (name, schema) => {
    if (!mongoose.models[name]) {
      mongoose.models[name] = new Model(name, schema);
    }
    return mongoose.models[name];
  },
  
  // 模拟Schema
  Schema: class Schema {
    constructor(definition) {
      this.definition = definition;
    }
  },
  
  // 模拟连接对象
  connection: {
    on: () => {}
  }
};

// 连接函数
async function connectDB() {
  // 不需要实际连接，直接返回成功
  return Promise.resolve();
}

// 清空数据库
function clearDB() {
  Object.keys(db).forEach(key => {
    db[key] = [];
  });
}

module.exports = {
  mongoose,
  connectDB,
  clearDB,
  db
};