# earthworm

Learning English through the method of constructing sentences with conjunctions


## Start

Start the project based on the following steps

Note that this project depends on docker, so make sure that docker is installed first.


1. start application
	```shell
	pnpm dev
	```
2. start database
	```shell
	pnpm db:start 
	```
3. init data of database (It only needs to be executed the first time the database is created)
	```shell
	pnpm db:init
	```
   

## Technology stack

- nextjs
- prisma
- postgres
- zustand

