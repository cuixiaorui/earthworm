import { useCourse } from "@/store/course";
import { useAudio } from "react-use";

export function usePlaySound() {
  const { currentStatement } = useCourse();
  const { english: content } = currentStatement!;
  const [audio, state, controls, ref] = useAudio({
    src: `https://dict.youdao.com/dictvoice?audio=${content}&type=1`,
    autoPlay: false,
  });

  return {
    audio,
    playSound: () => controls.play(),
  };
}
