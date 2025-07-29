# 图书管理系统后端服务

这是一个基于Node.js和Express的RESTful API服务，为图书管理系统提供后端支持。

## 技术栈

- **Node.js**: JavaScript运行时环境
- **Express**: Web应用框架
- **MongoDB**: NoSQL数据库
- **Mongoose**: MongoDB对象模型工具
- **Winston**: 日志记录
- **Morgan**: HTTP请求日志中间件
- **CORS**: 跨域资源共享

## 项目结构

```
server/
├── logs/                  # 日志文件目录
├── src/                   # 源代码
│   ├── config/            # 配置文件
│   ├── controllers/       # 控制器
│   ├── middleware/        # 中间件
│   ├── models/            # 数据模型
│   ├── routes/            # 路由
│   ├── utils/             # 工具函数
│   └── index.js           # 应用入口
├── .env                   # 环境变量
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## API端点

### 图书管理

| 方法   | 路径                | 描述                     |
|--------|---------------------|--------------------------|
| GET    | /api/books          | 获取所有图书（支持分页和排序） |
| GET    | /api/books/search   | 搜索图书                 |
| GET    | /api/books/:id      | 获取单本图书详情         |
| POST   | /api/books          | 添加新图书               |
| PUT    | /api/books/:id      | 更新图书信息             |
| DELETE | /api/books/:id      | 删除图书                 |

## 安装与运行

### 前提条件

- Node.js (v14+)
- MongoDB (v4+)

### 安装步骤

1. 克隆项目到本地

2. 安装依赖
```bash
cd server
npm install
```

3. 配置环境变量
```bash
# 复制示例环境变量文件
cp .env.example .env

# 编辑.env文件，设置MongoDB连接URI等
```

4. 启动服务
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

5. 服务将在http://localhost:3000/api上运行

## 数据库初始化

服务首次启动时，如果数据库为空，将自动填充示例图书数据。

## 错误处理

服务使用统一的错误处理中间件，所有API错误将返回一致的JSON格式：

```json
{
  "error": {
    "message": "错误信息",
    "stack": "错误堆栈（仅在开发环境）"
  }
}
```

## 日志

- 开发环境：控制台输出简洁日志
- 生产环境：详细日志写入文件（logs/combined.log和logs/error.log）

## 许可证

MIT