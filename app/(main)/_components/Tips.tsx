"use client";
import { usePlaySound } from "../_hooks/playSound";
import { useEffect } from "react";

interface Props {
  onShowAnswer: () => void;
}

export function Tips({ onShowAnswer }: Props) {
  const { playSound, audio } = usePlaySound();

  function handleToAnswer() {
    onShowAnswer();
  }

  return (
    <div>
      <TipsItem
        text="tab"
        description="show answer"
        keyboardKey="Tab"
        handler={handleToAnswer}
      ></TipsItem>
      <TipsItem
        text="control"
        description="play soundmark"
        keyboardKey="Control"
        handler={playSound}
      ></TipsItem>
      {audio}
    </div>
  );
}

function TipsItem({
  text,
  description,
  keyboardKey,
  handler,
}: {
  text: string;
  description: string;
  keyboardKey: string;
  handler: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === keyboardKey) {
        handler();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex gap-x-2 text-sm mt-3">
      <button
        className="rounded-sm px-2 bg-gray-600 text-white dark:text-gray-900"
        onClick={handler}
      >
        {text}
      </button>
      <div className=" text-gray-600"> - {description}</div>
    </div>
  );
}
