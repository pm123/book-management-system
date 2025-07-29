# Vercel部署指南

本文档提供了将图书管理系统部署到Vercel平台的详细指南，以及常见问题的解决方法。

## 部署步骤

### 1. 准备工作

确保你的项目已经准备好部署：

- 前端代码位于项目根目录
- 后端代码位于`server`目录
- 项目根目录包含`vercel.json`配置文件
- 环境变量已正确配置

### 2. 创建Vercel账号

如果你还没有Vercel账号，请前往[Vercel官网](https://vercel.com)注册一个账号。

### 3. 安装Vercel CLI（可选）

```bash
npm install -g vercel
```

### 4. 部署项目

#### 方法一：通过GitHub部署

1. 将项目代码推送到GitHub仓库
2. 登录Vercel账号
3. 点击"New Project"按钮
4. 选择你的GitHub仓库
5. 配置部署设置：
   - 构建命令：`npm run vercel-build`
   - 输出目录：`public`
   - 环境变量：添加必要的环境变量（如`NODE_ENV=production`）
6. 点击"Deploy"按钮

#### 方法二：通过Vercel CLI部署

1. 在项目根目录运行以下命令：

```bash
vercel login
vercel
```

2. 按照提示进行配置
3. 确认部署

## 常见问题解决

### 1. 空白页问题

如果部署后出现空白页，请检查以下几点：

- 确认构建输出目录正确（应为`public`）
- 检查浏览器控制台是否有错误信息
- 确认`vercel.json`中的路由配置是否正确
- 尝试清除Vercel缓存并重新部署

### 2. API请求返回500错误

如果API请求返回500错误，可能是以下原因：

- 后端代码中存在不兼容Vercel Serverless环境的操作（如文件系统操作）
- 环境变量配置不正确
- 日志目录创建失败

解决方法：

- 确保后端代码不包含文件系统操作
- 检查环境变量配置
- 使用控制台日志而不是文件日志
- 查看Vercel部署日志以获取详细错误信息

### 3. CORS错误

如果遇到CORS错误，请检查：

- `vercel.json`中的CORS头配置
- 后端CORS中间件配置
- 前端API请求URL是否正确

### 4. 环境变量问题

确保在Vercel项目设置中添加了所有必要的环境变量，特别是：

- `NODE_ENV=production`
- `VERCEL=1`
- 其他应用特定的环境变量

## 验证部署

部署成功后，你可以通过以下方式验证：

1. 访问Vercel提供的URL
2. 测试前端功能
3. 测试API请求
4. 检查控制台是否有错误

## 更新部署

当你需要更新已部署的应用时：

1. 提交代码更改到GitHub仓库
2. Vercel将自动重新部署
3. 或者，使用CLI手动触发部署：`vercel --prod`

## 监控和日志

Vercel提供了内置的监控和日志功能：

1. 在Vercel仪表板中查看部署状态
2. 检查构建和运行时日志
3. 设置自定义域名和HTTPS

## 其他资源

- [Vercel文档](https://vercel.com/docs)
- [Vercel CLI文档](https://vercel.com/docs/cli)
- [Serverless函数最佳实践](https://vercel.com/docs/functions/serverless-functions)