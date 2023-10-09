const fs = require("fs");
const pdf = require("pdf-parse");

(async () => {
  // 读取 pdf 中的所有文件
  const courseFiles = fs
    .readdirSync("./pdf")
    .filter((fileName) => {
      return !fileName.startsWith(".");
    })
    .map((fileName) => {
      return fileName.replace(".pdf", "");
    });

  for (const courseFile of courseFiles) {
    await main(courseFile);
  }
})();

function main(courseFileName) {
  let dataBuffer = fs.readFileSync(`./pdf/${courseFileName}.pdf`);

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text);

    fs.writeFileSync(
      `./courses/${courseFileName}.json`,
      JSON.stringify(result)
    );
  });
}

const STARTSIGN = "中文 英文 K.K.音标";
function parse(text) {
  // 0. 先基于 \n 来切分成数组
  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  // 1. 先获取到开始的点
  const startIndex = rawTextList.findIndex((t) => t === STARTSIGN);

  // 2. 过滤掉没有用的数据
  //    1. 空的
  //    2. 只有 number的（这个是换页符）
  const textList = rawTextList
    .slice(startIndex + 1)
    .filter((t) => t && !/\d/.test(Number(t)));

  // 3. 成组 2个为一组  （中文 / 英文+音标）
  const result = [];

  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: "",
      english: "",
      soundmark: "",
    };

    function run() {
      const element = textList[i];
      let chinese = "";
      let englishAndSoundmark = "";

      if (isChinese(element)) {
        chinese += element;
        while (isChinese(textList[i + 1])) {
          chinese += "，" + textList[i + 1];
          i++;
        }

        data.chinese = chinese;
      } else {
        englishAndSoundmark += element;

        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundmark += " " + textList[i + 1];
          i++;
        }

        const { english, soundmark } =
          parseEnglishAndSoundmark(englishAndSoundmark);

        data.english = english;
        data.soundmark = soundmark;
      }
    }

    run();
    i++;
    run();

    result.push(data);
  }

  return result;
}

function isChinese(str) {
  const reg = /^[\u4e00-\u9fa5]/;
  return reg.test(str);
}

function parseEnglishAndSoundmark(text) {
  console.log(text);
  const list = text.split(" ");
  const soundmarkdStartIndex = list.findIndex((t) => t.startsWith("/"));

  const english = list.slice(0, soundmarkdStartIndex).join(" ").trim();

  let rawSoundmark = list
    .slice(soundmarkdStartIndex)
    .join(" ")
    .split("/")
    .map((t) => {
      return t.trim().replace(/\s+/g, " ");
    })
    .filter((t) => {
      return t !== "";
    })
    .toString();

  const soundmark = `/${rawSoundmark.replace(/,/g, "/ /") + "/"}`;

  return {
    english,
    soundmark,
  };
}
