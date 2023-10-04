export default function Answer({
  word,
  soundmark,
  onToNextStatement,
}: {
  word: string;
  soundmark: string;
  onToNextStatement: () => void;
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;

  return (
    <div>
      <div>
        {word}
        {soundmark}
      </div>

      <audio controls autoPlay>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={() => onToNextStatement()}>next</button>
    </div>
  );
}
