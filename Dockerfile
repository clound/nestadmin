FROM node:20-alpine
# 创建并设置工作目录
WORKDIR /app
# 复制 package.json 和 package-lock.json
COPY package*.json ./
# 安装依赖
RUN npm install
# 复制源代码
COPY . .
# 构建 Nest 应用
RUN npm run build
# 绑定应用到 3000 端口
EXPOSE 3000
# 启动应用
CMD ["npm", "start"]
