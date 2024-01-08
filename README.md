# earthworm

Learning English through the method of constructing sentences with conjunctions


## Start

Start the project based on the following steps

Note that this project depends on docker, so make sure that docker is installed first.

1. install project dependencies
	```shell
	pnpm install
	```

2. start application
	```shell
	pnpm docker:start
	```
3. init data of database (It only needs to be executed the first time the database is created)
	```shell
	pnpm db:init
	```

## 当发现数据有问题时 如何修改

目前课程的数据是基于 pdf 解析得到的 json 文件， 所以在解析的过程中必然会出现一些小问题

那么当遇到这些小问题的时候 大家可以通过修改 json 文件来做出对 earthworm 的贡献

以下是贡献步骤：

1. 找到当前课程所对应的 json 文件

   json 文件在 scripts/courses 里面

   注意 courseId 和 json 名称不是对齐的，需要手动查看确定要修改的 json 文件（TODO 这里是个优化点）

2. 找到 json 文件中的错误语句

   可以直接在当前的 json 文件中搜索即可， 一个对象对应一个 statement 

3. 修改 json 后提交 pr

   在 pr 中可以介绍下修改的原因

### 数据的更新

后续我会在合并完 pr 后更新线上数据库上的数据完成更新


### 贡献指北

由于修改、调试项目需要 mysql 服务，这里我们可以只用 docker 跑个 mysql 服务
```bash
docker compose -f docker-compose-dev.yaml up -d
```
如果是老版本 docker 应该是`docker-compose -f docker-compose-dev.yaml up -d`  
然后顺序执行下列命令即可
```bash
pnpm install
pnpm db:init
pnpm dev
```