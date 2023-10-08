import { useEffect, useRef } from 'react'

export default function Answer({
  word,
  soundmark,
  onToNextStatement,
}: {
  word: string
  soundmark: string
  onToNextStatement: () => void
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioRef = useRef<any>(null)
  const handlePlaySoundmark = () => {
    audioRef.current.play()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onToNextStatement()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="text-center mb-20 mt-10">
      <div className="text-5xl mb-3 text-fuchsia-500">
        {word}
        <svg
          className="w-7 h-7 inline-block ml-1 cursor-pointer"
          onClick={handlePlaySoundmark}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
            fill="#666666"></path>
        </svg>
        <audio controls autoPlay className="hidden" ref={audioRef}>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="text-2xl text-slate-600">{soundmark}</div>
      <button
        className="border-solid border-2 border-slate-400 bg-slate-100 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl pl-10 pr-10 hover:bg-slate-200"
        onClick={() => onToNextStatement()}>
        next
      </button>
    </div>
  )
}
