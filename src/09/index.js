import { get, orderBy, findIndex } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

const getLowerPoint = input => {
  let output = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let currentHeight = input[y][x];

      const isLower =
        get(input, [y, x - 1], Infinity) > currentHeight &&
        get(input, [y, x + 1], Infinity) > currentHeight &&
        get(input, [y - 1, x], Infinity) > currentHeight &&
        get(input, [y + 1, x], Infinity) > currentHeight;
      if (isLower) {
        output.push({ x, y, value: currentHeight });
      }
    }
  }
  return output;
};

export const partOne = input => {
  const lowerPoints = getLowerPoint(input);
  return lowerPoints.reduce((acc, { value }) => (acc += value + 1), 0);
};

const getBasin = ({ x, y }, input, visitedPoints) => {
  if (findIndex(visitedPoints, { x, y }) !== -1) {
    return [];
  }
  if (get(input, [y, x], 9) === 9) {
    return [];
  }

  visitedPoints.push({ x, y });

  return [
    { x, y },
    ...getBasin({ x: x - 1, y }, input, visitedPoints),
    ...getBasin({ x: x + 1, y }, input, visitedPoints),
    ...getBasin({ x: x, y: y - 1 }, input, visitedPoints),
    ...getBasin({ x: x, y: y + 1 }, input, visitedPoints),
  ];
};

export const partTwo = input => {
  const lowerPoints = getLowerPoint(input);

  let visitedPoints = [];

  const basinsLength = lowerPoints.map(
    ({ x, y }) => getBasin({ x, y }, input, visitedPoints).length,
  );

  const topBasins = orderBy(basinsLength, [], ['desc']).slice(0, 3);

  return topBasins.reduce((acc, curr) => acc * curr, 1);
};
