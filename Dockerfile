# 阶段1: 构建Vue3前端
FROM node:18-alpine AS frontend-builder

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制前端package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装前端依赖
RUN pnpm install

# 复制前端源代码
COPY . .

# 构建前端应用
RUN pnpm build

# 阶段2: 构建Node.js后端
FROM node:18-alpine AS backend-builder

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制后端package.json和pnpm-lock.yaml
COPY server/package.json server/pnpm-lock.yaml ./

# 安装后端依赖
RUN pnpm install --prod

# 复制后端源代码
COPY server/src ./src
COPY server/.env.production ./.env.production

# 阶段3: 最终镜像
FROM nginx:stable-alpine

# 安装Node.js
RUN apk add --update nodejs npm

# 设置工作目录
WORKDIR /app

# 复制前端构建结果到Nginx目录
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# 创建后端目录
RUN mkdir -p /app/server

# 复制后端构建结果
COPY --from=backend-builder /app /app/server

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/health || exit 1

# 暴露端口
EXPOSE 80

# 创建启动脚本
RUN echo '#!/bin/sh\n\
cd /app/server && node src/index.js & \n\
nginx -g "daemon off;"\n\
' > /start.sh && chmod +x /start.sh

# 启动Nginx和Node.js后端
CMD ["/start.sh"]