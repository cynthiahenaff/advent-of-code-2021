import { flattenDeep, max, inRange, orderBy, times } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .filter(Boolean)
    .map(value =>
      value.split(' -> ').map(coordinate => coordinate.split(',').map(Number)),
    );

export const partOne = input => {
  const length = max(flattenDeep(input)) + 1;

  const sortedInput = input.filter(
    ([start, end]) => start[0] === end[0] || start[1] === end[1],
  );

  let grid = Array.from(Array(length), () => Array(length).fill(0));

  sortedInput.forEach(([[startX, startY], [endX, endY]]) => {
    if (startX === endX) {
      grid = grid.map((row, index) => {
        const [start, end] = orderBy([startY, endY]);

        return inRange(index, start, end) || index === startY || index === endY
          ? row.map((currentValue, i) =>
              i === startX ? currentValue + 1 : currentValue,
            )
          : row;
      });
    } else if (startY === endY) {
      grid[startY] = grid[startY].map((currentValue, index) => {
        const [start, end] = orderBy([startX, endX]);

        return inRange(index, start, end) || index === startX || index === endX
          ? currentValue + 1
          : currentValue;
      });
    }
  });

  return flattenDeep(grid).filter(value => value >= 2).length;
};

export const partTwo = input => {
  const length = max(flattenDeep(input)) + 1;

  let grid = Array.from(Array(length), () => Array(length).fill(0));

  input.forEach(([[startX, startY], [endX, endY]]) => {
    if (
      startX === endX ||
      startY === endY ||
      Math.abs(startX - endX) === Math.abs(startY - endY)
    ) {
      const xIterator = endX > startX ? 1 : -1;
      const yIterator = endY > startY ? 1 : -1;

      let x = startX;
      let y = startY;

      grid[x][y] += 1;

      while (x !== endX || y !== endY) {
        if (endX !== startX) {
          x += xIterator;
        }
        if (endY !== startY) {
          y += yIterator;
        }

        grid[x][y] += 1;
      }
    }
  });

  return flattenDeep(grid).filter(value => value >= 2).length;
};
