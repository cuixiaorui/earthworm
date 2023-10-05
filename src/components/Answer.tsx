export default function Answer({
  word,
  soundmark,
}: {
  word: string;
  soundmark: string;
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;

  return (
    <div>
      <p className="english">{word}</p>
      <p className="soundMark">{soundmark}</p>
      <audio autoPlay>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
