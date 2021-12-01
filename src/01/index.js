export const formatInput = input => {
  return input.split('\n').filter(Boolean).map(Number);
};

export const partOne = input =>
  input.reduce(
    (acc, _, index) => (input[index] > input[index - 1] ? acc + 1 : acc),
    0,
  );

export const partTwo = input => {
  const response = input.reduce((acc, _, index) => {
    if (index === input.length - 1 || index === input.length - 2) {
      return acc;
    }
    const currWindowSum = input[index] + input[index + 1] + input[index + 2];
    const prevWindowSum = input[index - 1] + input[index] + input[index + 1];

    return currWindowSum > prevWindowSum ? acc + 1 : acc;
  }, 0);
  return response;
};
