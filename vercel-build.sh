#!/bin/bash

# 构建前端
echo "Building frontend..."
npm run build

# 确保public目录存在
mkdir -p public

# 将构建输出复制到public目录
echo "Copying dist to public..."
cp -r dist/* public/

echo "Build completed successfully!"