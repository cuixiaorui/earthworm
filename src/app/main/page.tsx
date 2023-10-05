"use client";

import { useEffect, useRef, useState ,createRef} from "react";
import Question from "../../components/Question";
import Answer from "../../components/Answer";

const failedCountTotal = 3;

const inputRef:any = createRef()

export default function Main() {
  const [currentMode, setCurrentMode] = useState<"question" | "answer">(
    "question"
  );
  const [questionWord, setQuestionWord] = useState("");
  const [answerWord, setAnswerWord] = useState("");
  const [answerSoundmark, setAnswerSoundmark] = useState("");

  const failedCount = useRef(0);
  const statementIndex = useRef(0);
  const currentCourse = useRef<any>({});

  function updateWord() {
    const { chinese, english, soundMark } =
      currentCourse.current.statements[statementIndex.current];

    setQuestionWord(chinese);
    setAnswerWord(english);
    setAnswerSoundmark(soundMark);
  }

  useEffect(() => {
    async function fetchData() {
      const basePath =
        process.env.NODE_ENV === "production"
          ? "/api"
          : "http://localhost:3001/api";

      const response = await fetch(basePath + "/main");
      const data = await response.json();
      currentCourse.current = data.data;
      updateWord();
      inputRef.current.focus()
    }
    fetchData();
  }, []);

  function checkCorrect(input: string) {
    return input === answerWord;
  }

  const handleToNextStatement = () => {
    statementIndex.current++;
    setCurrentMode("question");
    updateWord();
    inputRef.current.focus()
  };

  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      setCurrentMode("answer");
    } else {
      failedCount.current++;
      if (failedCount.current >= failedCountTotal) {
        failedCount.current = 0;
        setCurrentMode("answer");
      }
    }
  };
  return (
    <div id="app">
      <div className="main">
        {
          <Question
            createRef = {inputRef}
            word={questionWord}
            onCheckAnswer={handleCheckAnswer}
            onToNextStatement={handleToNextStatement}
          ></Question>
        }
        {currentMode !== "question" && (
          <Answer
            word={answerWord}
            soundmark={answerSoundmark}
          ></Answer>
        )}
      </div>
    </div>
  );
}
