import { includes, indexOf, last, reverse } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split(''));

const openingChar = ['(', '[', '{', '<'];
const closingChar = [')', ']', '}', '>'];
const points = [3, 57, 1197, 25137];
const misingPoints = [1, 2, 3, 4];

export const partOne = input => {
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    let openChunk = [];
    const currentRow = input[i];

    for (let c = 0; c < currentRow.length; c++) {
      const currentChar = currentRow[c];
      if (includes(openingChar, currentChar)) {
        openChunk.push(currentChar);
      }
      if (includes(closingChar, currentChar)) {
        const index = indexOf(closingChar, currentChar);
        const openerChar = openingChar[index];
        if (last(openChunk) === openerChar) {
          openChunk.pop();
        } else {
          score += points[index];
          break;
        }
      }
    }
  }
  return score;
};

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const partTwo = input => {
  let scores = [];

  for (let i = 0; i < input.length; i++) {
    let chunkScore = 0;
    let openChunk = [];
    const currentRow = input[i];
    let isCorrupted = false;

    for (let c = 0; c < currentRow.length; c++) {
      const currentChar = currentRow[c];
      if (includes(openingChar, currentChar)) {
        openChunk.push(currentChar);
      }
      if (includes(closingChar, currentChar)) {
        const index = indexOf(closingChar, currentChar);
        const openerChar = openingChar[index];
        if (last(openChunk) === openerChar) {
          openChunk.pop();
        } else {
          isCorrupted = true;
          break;
        }
      }
    }
    if (!isCorrupted && openChunk.length > 0) {
      reverse(openChunk).forEach(char => {
        const index = indexOf(openingChar, char);
        chunkScore = chunkScore * 5 + misingPoints[index];
      });
    }
    if (chunkScore !== 0) {
      scores.push(chunkScore);
    }
  }
  return median(scores);
};
