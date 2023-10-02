const fs = require("fs");
const pdf = require("pdf-parse");

function main() {
  let dataBuffer = fs.readFileSync("./01.pdf");

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text);
    console.log(result);
  });
}

main();

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

  // 对齐格式
  // TODO
  // 如果当前是英文的话  那么检测下一行是不是中文， 
  // 如果不是中文的话 那么需要把这行的内容合并到当前行，并且删除掉这一个元素

  // 3. 成组 2个为一组  （中文 / 英文+音标）
  const result = [];
  for (let i = 0; i < textList.length; i++) {
    const chinese = textList[i];
    //解析 英文+ 音标   -》 基于空白符去切 遇到"/" 就说明是音标
    const { english, soundMark } = parseEnglishAndSoundMark(textList[i + 1]);

    result.push({
      chinese,
      english,
      soundMark,
    });

    i++;
  }

  return result;
}

function parseEnglishAndSoundMark(text) {
  console.log(text);
  const list = text.split(" ");
  const soundMarkdStartIndex = list.findIndex((t) => t.startsWith("/"));

  const english = list.slice(0, soundMarkdStartIndex).join(" ");
  const soundMark = list.slice(soundMarkdStartIndex).join(" ");

  return {
    english,
    soundMark,
  };
}
