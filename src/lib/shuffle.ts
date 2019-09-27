export const shuffle = <T>(xs: T[]): T[] => {
  const shuffled = [];
  const array = xs;

  while (array.length !== 0) {
    const randomIndex = Math.floor(array.length * Math.random());
    shuffled.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return shuffled;
};
