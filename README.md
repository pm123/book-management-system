# 图书管理系统

基于 Vite + Vue3 + TailwindCSS + NaiveUI 的图书管理系统前端项目。

## 技术栈

- **构建工具**：Vite
- **前端框架**：Vue 3
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **UI 组件库**：Naive UI
- **CSS 框架**：TailwindCSS
- **HTTP 请求**：模拟 API 请求

## 功能特性

- 图书列表展示
- 图书详情查看
- 图书添加功能
- 图书编辑功能
- 图书删除功能
- 图书搜索功能

## 项目结构

```
src/
├── api/          # API 请求模块
├── assets/       # 静态资源
├── components/   # 公共组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── views/        # 页面组件
├── App.vue       # 根组件
├── main.js       # 入口文件
└── style.css     # 全局样式
```

## 开发环境设置

### 前提条件

- Node.js (推荐 v16 或更高版本)
- pnpm (推荐) 或 npm 或 yarn

### 安装依赖

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn
```

### 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

### 构建生产版本

```bash
# 使用 pnpm
pnpm build

# 或使用 npm
npm run build

# 或使用 yarn
yarn build
```

## Docker 部署

项目包含 Docker 相关配置，可以使用 Docker 进行部署。

### 使用 Docker Compose 部署

```bash
# 构建并启动容器
docker-compose up -d

# 停止容器
docker-compose down
```

### 手动构建 Docker 镜像

```bash
# 构建镜像
docker build -t book-management-system .

# 运行容器
docker run -d -p 8080:80 --name book-management book-management-system
```

访问 http://localhost:8080 即可查看应用。

## 项目截图

(项目截图将在完成后添加)

## 许可证

MIT
