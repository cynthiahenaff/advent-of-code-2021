import { countBy, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

export const partOne = input => {
  let output = input;

  for (let day = 0; day < 80; day++) {
    let currentInput = output;
    let nextOutput = [];

    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === 0) {
        nextOutput.push(8);
        nextOutput.push(6);
      } else {
        nextOutput.push(currentInput[i] - 1);
      }
    }
    output = nextOutput;
  }

  return output.length;
};

export const partTwo = input => {
  let output = countBy(input);

  for (let day = 0; day < 256; day++) {
    let currentInput = output;
    let nextOutput = {};

    for (const age in currentInput) {
      const value = currentInput[age];

      if (Number(age) === 0) {
        nextOutput[6] = value;
        nextOutput[8] = value;
      } else {
        nextOutput[Number(age) - 1] =
          (nextOutput[Number(age) - 1] || 0) + value;
      }
    }

    output = nextOutput;
  }
  return sum(Object.values(output));
};
