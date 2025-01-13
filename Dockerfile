FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

# RUN npm config set registry https://registry.npmmirror.com/

# 需要打包所以需要完整的依赖
RUN npm install

COPY . .

RUN npm run build

FROM node:alpine AS runner

COPY --from=builder /app/dist /app
COPY --from=builder /app/package.json /app/package.json

# RUN npm config set registry https://registry.npmmirror.com/

WORKDIR /app

# 移除开发依赖
RUN npm install --omit=dev

EXPOSE 3000

# 启动应用
CMD ["npm", "start"]

