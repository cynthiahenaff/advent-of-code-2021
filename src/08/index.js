import { flattenDeep, sortBy, difference, sum } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .filter(Boolean)
    .map(row => row.split(' | ').map(e => e.split(' ')));

export const partOne = input => {
  const sortedInput = input.map(([_, output]) =>
    output.filter(digit => [2, 3, 4, 7].includes(digit.length)),
  );

  return flattenDeep(sortedInput).length;
};

export const partTwo = input => {
  const output = input.map(([input, output]) => {
    let digitToDecimal = {};
    let decimalToDigit = {};

    // fetch 1; 7; 4; 8
    for (let digit = 0; digit < input.length; digit++) {
      const currentDigit = sortBy(input[digit].split('')).join('');
      if (currentDigit.length === 2) {
        digitToDecimal[currentDigit] = 1;
        decimalToDigit[1] = currentDigit;
      } else if (currentDigit.length === 3) {
        digitToDecimal[currentDigit] = 7;
        decimalToDigit[7] = currentDigit;
      } else if (currentDigit.length === 4) {
        digitToDecimal[currentDigit] = 4;
        decimalToDigit[4] = currentDigit;
      } else if (currentDigit.length === 7) {
        digitToDecimal[currentDigit] = 8;
        decimalToDigit[8] = currentDigit;
      }
    }

    // fetch 6 digits -> 9; 0; 6;
    for (let digit = 0; digit < input.length; digit++) {
      const currentDigit = sortBy(input[digit].split('')).join('');
      if (currentDigit.length === 6) {
        if (
          difference(decimalToDigit['4'].split(''), currentDigit.split(''))
            .length === 0
        ) {
          digitToDecimal[currentDigit] = 9;
          decimalToDigit[9] = currentDigit;
        } else if (
          difference(decimalToDigit['1'].split(''), currentDigit.split(''))
            .length === 0
        ) {
          digitToDecimal[currentDigit] = 0;
          decimalToDigit[0] = currentDigit;
        } else {
          digitToDecimal[currentDigit] = 6;
          decimalToDigit[6] = currentDigit;
        }
      }
    }

    // fetch 5 digits -> 2; 3; 5;
    for (let digit = 0; digit < input.length; digit++) {
      const currentDigit = sortBy(input[digit].split('')).join('');
      if (currentDigit.length === 5) {
        if (
          difference(decimalToDigit['1'].split(''), currentDigit.split(''))
            .length === 0
        ) {
          digitToDecimal[currentDigit] = 3;
          decimalToDigit[3] = currentDigit;
        } else if (
          difference(decimalToDigit['6'].split(''), currentDigit.split(''))
            .length === 1
        ) {
          digitToDecimal[currentDigit] = 5;
          decimalToDigit[5] = currentDigit;
        } else {
          digitToDecimal[currentDigit] = 2;
          decimalToDigit[2] = currentDigit;
        }
      }
    }
    return Number(
      output
        .map(digit =>
          digitToDecimal[sortBy(digit.split('')).join('')].toString(),
        )
        .join(''),
    );
  });

  return sum(output);
};
