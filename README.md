# 图书管理系统

一个基于Vue3和Node.js的全栈图书管理系统，前端使用Vite + Vue3 + TailwindCSS + NaiveUI，后端使用Node.js + Express + MongoDB。

## 项目结构

```
book-management-system/
├── public/                 # 静态资源
├── server/                 # 后端代码
│   ├── logs/               # 日志文件
│   ├── src/                # 源代码
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── utils/          # 工具函数
│   │   └── index.js        # 入口文件
│   ├── .env                # 环境变量
│   └── package.json        # 依赖配置
├── src/                    # 前端代码
│   ├── api/                # API接口
│   ├── assets/             # 资源文件
│   ├── components/         # 组件
│   ├── router/             # 路由
│   ├── stores/             # 状态管理
│   ├── views/              # 页面
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .env                    # 环境变量
├── .env.production         # 生产环境变量
├── index.html              # HTML模板
├── package.json            # 依赖配置
├── vite.config.js          # Vite配置
└── vercel.json             # Vercel部署配置
```

## 功能特性

- 图书列表展示（支持分页、排序和搜索）
- 图书详情查看
- 添加新图书
- 编辑图书信息
- 删除图书
- 响应式设计，适配移动端和桌面端

## API接口

### 图书管理API

| 方法   | 路径                | 描述             | 参数                                      |
|--------|---------------------|------------------|-------------------------------------------|
| GET    | /api/books          | 获取图书列表     | page, limit, sortField, sortOrder, query  |
| GET    | /api/books/:id      | 获取单本图书     | id                                        |
| POST   | /api/books          | 添加新图书       | title, author, isbn, description, etc.    |
| PUT    | /api/books/:id      | 更新图书信息     | id, title, author, isbn, description, etc.|
| DELETE | /api/books/:id      | 删除图书         | id                                        |

## 本地开发

### 前置条件

- Node.js 16+
- MongoDB（或使用内存数据库）
- pnpm（推荐）或npm

### 安装依赖

```bash
# 安装前端依赖
pnpm install

# 安装后端依赖
cd server
pnpm install
cd ..
```

### 启动开发服务器

```bash
# 启动后端服务器
cd server
pnpm run dev

# 在另一个终端启动前端服务器
pnpm run dev
```

前端服务器将在 http://localhost:3000 运行，后端API将在 http://localhost:3001/api 运行。

## 生产部署

### 构建前端

```bash
pnpm run build
```

### 部署到Vercel

本项目已配置为可直接部署到Vercel平台。只需将代码推送到GitHub仓库，然后在Vercel中导入该仓库即可。

Vercel将自动识别项目配置，并按照`vercel.json`中的设置进行部署。

## 环境变量

### 前端环境变量

- `VITE_API_URL`: API基础URL

### 后端环境变量

- `PORT`: 服务器端口
- `NODE_ENV`: 环境（development/production）
- `CORS_ORIGIN`: CORS允许的源
