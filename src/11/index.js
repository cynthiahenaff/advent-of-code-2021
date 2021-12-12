import { findIndex, cloneDeep } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .filter(Boolean)
    .map(line => line.split('').map(Number));

const flash = ({ grid, x, y, flashed }) => {
  flashed.push({ x, y });

  grid[y][x] = 0;

  [-1, 0, 1].forEach(dy => {
    [-1, 0, 1].forEach(dx => {
      const currentY = y + dy;
      const currentX = x + dx;

      if (
        currentY < 0 ||
        currentX < 0 ||
        currentY >= grid.length ||
        currentX >= grid[currentY].length
      ) {
        return;
      }

      if (findIndex(flashed, { x: currentX, y: currentY }) !== -1) {
        return;
      }

      if (grid[currentY][currentX] <= 9) {
        grid[currentY][currentX] += 1;
      }

      if (grid[currentY][currentX] === 10) {
        flash({ grid, x: currentX, y: currentY, flashed });
      }
    });
  });
};

export const partOne = input => {
  let grid = cloneDeep(input);
  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    let flashed = [];

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x]++;
      }
    }
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 10) {
          flash({ grid, x, y, flashed });
        }
      }
    }
    flashes += flashed.length;
  }

  return flashes;
};

export const partTwo = input => {
  let grid = cloneDeep(input);
  let step = 0;

  while (true) {
    step += 1;
    let flashed = [];

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x]++;
      }
    }

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 10) {
          flash({ grid, x, y, flashed });
        }
      }
    }

    if (flashed.length === 100) {
      return step;
    }
  }
};
