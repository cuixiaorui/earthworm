# 使用官方 Node.js 镜像作为基础镜像
FROM node:20.10.0

# 设置 taobao 镜像源
RUN npm config set registry https://registry.npm.taobao.org

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制项目文件到工作目录
COPY . .

# 构建 Next.js 项目
RUN pnpx prisma generate
RUN pnpm build

# 暴露应用程序运行的端口
EXPOSE 3001

# 启动 Next.js 应用
CMD ["pnpm", "start", "--port", "3001"]
