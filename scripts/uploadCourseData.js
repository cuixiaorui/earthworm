// 该文件的逻辑都是临时的
// 后续会基于后台管理页面来上传数据
// 所以这个脚本的逻辑都无需修改
// 平时的开发也无需执行该脚本 数据已经全部推上去了
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const env = {
  dev: {
    courses: JSON.parse(fs.readFileSync("./courses.json")),
    datasourceUrl: "postgresql://postgres:postgres@localhost:5432/postgres",
  },
  prod: {
    courses: [
      {
        cId: "clng5l3300000fydlimlj4m4h",
        fileName: "01",
      },
      {
        cId: "clng5qbbh0001fydlyffbgc4x",
        fileName: "02",
      },
      {
        cId: "clnhlx86f0000fyi1m2os9f02",
        fileName: "03",
      },
      {
        cId: "clnzeuwy90000qxzc8k2waq2y",
        fileName: "04",
      },
      {
        cId: "clnzev8wj0001qxzczi2jcqas",
        fileName: "05",
      },
      {
        cId: "clnzevjoq0002qxzcks35dcz1",
        fileName: "06",
      },
      {
        cId: "clnzew8ns0003qxzcapdan1aa",
        fileName: "07",
      },
      {
        cId: "clnzf09sh0004qxzcsdp49wb1",
        fileName: "08",
      },
      {
        cId: "clnzf0qtd0005qxzcwei5mp89",
        fileName: "09",
      },
      {
        cId: "clnzf3dnm0006qxzcr94po5kj",
        fileName: "10",
      },
    ],
    datasourceUrl:
      "postgres://default:eRPmUKwp30Lq@ep-noisy-dust-62046687.us-east-1.postgres.vercel-storage.com/verceldb",
  },
};

(async function () {
  if (!process.env.NODE_ENV) {
    console.log("请指定要执行的环境: dev or prod");
    return;
  }

  if (!(process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "prod")) {
    console.log("无效的环境 必须是 dev or prod");
    return;
  }

  const { courses, datasourceUrl } = env[process.env.NODE_ENV];

  const prisma = new PrismaClient({
    datasourceUrl,
  });

  await prisma.statement.deleteMany();

  let orderIndex = 1;
  for (const { cId, fileName } of courses) {
    const currentCourseDataPath = `./courses/${fileName}.json`;
    const courseDataText = fs.readFileSync(currentCourseDataPath, "utf-8");
    const courseData = JSON.parse(courseDataText);

    const promiseAll = courseData.map((statement, index) => {
      const { chinese, english, soundmark } = statement;
      const result = createStatement(
        orderIndex,
        chinese,
        english,
        soundmark,
        cId
      );
      orderIndex++;
      return result;
    });

    console.log(`开始上传： courseName:${fileName}`);
    await Promise.all(promiseAll);
    console.log(`courseName: ${fileName} 全部上传成功`);
  }

  async function createStatement(order, chinese, english, soundmark, courseId) {
    await prisma.statement.create({
      data: {
        order,
        chinese,
        english,
        soundmark,
        courseId,
      },
    });
  }
})();
