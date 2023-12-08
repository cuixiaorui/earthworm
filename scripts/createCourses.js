const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const loadCourses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./loadCourses.json"), "utf-8")
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
    JSON.stringify(result)
  );
  console.log("生成 courses.json 成功");
})();
