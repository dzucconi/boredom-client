import parameters from "queryparams";

export const {
  autoPlay,
  speed,
  readingSpeed
}: { autoPlay: boolean; speed: number; readingSpeed: number } = parameters({
  autoPlay: false,
  speed: 1.0,
  readingSpeed: 1.0
});
