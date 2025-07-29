# 图书管理系统后端服务

这是图书管理系统的后端服务，基于Node.js、Express和MongoDB（内存模拟版）构建。

## 技术栈

- **Node.js**: JavaScript运行时环境
- **Express**: Web应用框架
- **MongoDB模拟**: 使用内存数据库模拟MongoDB功能
- **Winston**: 日志记录
- **CORS**: 跨域资源共享
- **dotenv**: 环境变量管理

## 项目结构

```
server/
├── logs/               # 日志文件
├── src/                # 源代码
│   ├── config/         # 配置文件
│   │   └── index.js    # 主配置文件
│   ├── controllers/    # 控制器
│   │   └── book.controller.js  # 图书控制器
│   ├── middleware/     # 中间件
│   │   └── error-handler.js    # 错误处理中间件
│   ├── models/         # 数据模型
│   │   └── book.model.js       # 图书模型
│   ├── routes/         # 路由
│   │   ├── book.routes.js      # 图书路由
│   │   └── index.js            # 路由入口
│   ├── utils/          # 工具函数
│   │   ├── db.js               # 数据库连接
│   │   ├── logger.js           # 日志工具
│   │   ├── memory-db.js        # 内存数据库
│   │   ├── reset-db.js         # 数据库重置
│   │   └── seed.js             # 数据库种子
│   └── index.js        # 入口文件
├── .env                # 环境变量
└── package.json        # 依赖配置
```

## API接口

### 图书管理API

| 方法   | 路径                | 描述             | 参数                                      |
|--------|---------------------|------------------|-------------------------------------------|
| GET    | /api/books          | 获取图书列表     | page, limit, sortField, sortOrder, query  |
| GET    | /api/books/:id      | 获取单本图书     | id                                        |
| POST   | /api/books          | 添加新图书       | title, author, isbn, description, etc.    |
| PUT    | /api/books/:id      | 更新图书信息     | id, title, author, isbn, description, etc.|
| DELETE | /api/books/:id      | 删除图书         | id                                        |

## 数据模型

### 图书模型

```javascript
{
  _id: String,            // 图书ID
  title: String,          // 书名
  author: String,         // 作者
  isbn: String,           // ISBN
  publishDate: Date,      // 出版日期
  publisher: String,      // 出版社
  pages: Number,          // 页数
  description: String,    // 描述
  coverImage: String,     // 封面图片URL
  category: String,       // 分类
  tags: [String],         // 标签
  price: Number,          // 价格
  stock: Number,          // 库存
  createdAt: Date,        // 创建时间
  updatedAt: Date         // 更新时间
}
```

## 本地开发

### 前置条件

- Node.js 16+
- pnpm（推荐）或npm

### 安装依赖

```bash
pnpm install
```

### 环境变量

创建`.env`文件，设置以下环境变量：

```
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### 启动服务器

```bash
pnpm run dev
```

服务器将在 http://localhost:3001/api 运行。

## 生产部署

### 构建

```bash
pnpm run build
```

### 启动生产服务器

```bash
pnpm start
```

## 部署到Vercel

本项目已配置为可直接部署到Vercel平台。只需将代码推送到GitHub仓库，然后在Vercel中导入该仓库即可。

Vercel将自动识别项目配置，并按照根目录的`vercel.json`中的设置进行部署。

## 特性

- **RESTful API**: 符合REST设计原则的API
- **错误处理**: 统一的错误处理机制
- **日志记录**: 详细的日志记录
- **CORS支持**: 跨域资源共享支持
- **内存数据库**: 无需外部数据库依赖
- **数据持久化**: 数据在服务重启后保持不变
- **环境配置**: 基于环境的配置管理