import parameters from "queryparams";

export const {
  autoPlay,
  speed
}: { autoPlay: boolean; speed: number } = parameters({
  autoPlay: false,
  speed: 1.0
});
