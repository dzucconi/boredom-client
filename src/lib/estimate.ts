import { speed } from "../config";

const READING_SPEED = 200.0; // lower === slower

export const estimate = (input: string) => {
  const words = input.split(/\W+/g).length;
  return (words / READING_SPEED) * 60.0 * 1000.0 * speed;
};
