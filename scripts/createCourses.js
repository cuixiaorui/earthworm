const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

const isDev = process.env.NODE_ENV === "dev" || !process.env.NODE_ENV;

if (isDev) {
  dotenv.config({
    path: path.resolve(__dirname, "../.env.local"),
    override: true,
  });
} else if (process.env.NODE_ENV === "prod") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
} else {
  console.error(`无效的 NODE_ENV:${process.env.NODE_ENV}`);
}

const loadCourses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./loadCourses.json"), "utf-8"),
);

(async function () {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

  // 先删除所有的 courses
  await prisma.course.deleteMany();

  const result = [];

  for (const course of loadCourses) {
    const response = await prisma.course.create({
      data: {
        title: course.title,
      },
    });

    result.push({
      title: course.title,
      fileName: course.fileName,
      cId: response.id,
    });
  }

  fs.writeFileSync(
    path.resolve(__dirname, "./courses.json"),
    JSON.stringify(result),
  );
  console.log("生成 courses.json 成功");
})();
