const fs = require("fs");
const axios = require("axios");

const courseId = "clng5qbbh0001fydlyffbgc4x";
const currentCourseDataPath = "./courses/02.json";
const statementApiUrl = "http://localhost:3000/statement/api";
const courseDataText = fs.readFileSync(currentCourseDataPath, "utf-8");
const courseData = JSON.parse(courseDataText);

async function uploadStatement(order, chinese, english, soundmark, courseId) {
  try {
    const response = await axios.post(statementApiUrl, {
      order,
      chinese,
      english,
      soundmark,
      courseId,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to upload statement:", error);
    throw error;
  }
}


const promiseAll = courseData.map((statement, index) => {
  const { chinese, english, soundmark } = statement;
  return uploadStatement(index + 1, chinese, english, soundmark, courseId);
});

Promise.all(promiseAll).then(() => {
  console.log("全部上传成功");
});
