const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

// 这里只需要处理本地创建的逻辑就可以
const courses = [
  {
    title: "第一课",
    fileName: "01",
  },
  {
    title: "第二课",
    fileName: "02",
  },
  {
    title: "第三课",
    fileName: "03",
  },
  {
    title: "第四课",
    fileName: "04",
  },
  {
    title: "第五课",
    fileName: "05",
  },
  {
    title: "第五.五课",
    fileName: "05.5",
  },
  {
    title: "第六课",
    fileName: "06",
  },
  {
    title: "第七课",
    fileName: "07",
  },
  {
    title: "第八课",
    fileName: "08",
  },
  {
    title: "第九课",
    fileName: "09",
  },
  {
    title: "第十课",
    fileName: "10",
  },
];

(async function () {
  const prisma = new PrismaClient({
    datasourceUrl: "mysql://root:password@127.0.0.1:3306/earthworm_dev",
  });

  // 先删除所有的 courses
  await prisma.course.deleteMany();

  const result = [];

  for (const course of courses) {
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

  fs.writeFileSync("./courses.json", JSON.stringify(result));
  console.log("生成 courses.json 成功");
})();
