# 使用官方 Node 镜像
FROM node:20-alpine

# 创建并设置工作目录
WORKDIR /app

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install  --omit=dev

# 复制源代码
COPY . .

# 构建 Nest 应用
RUN npm run build

# 绑定应用到 3000 端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]