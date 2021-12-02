export const formatInput = input =>
  input
    .split('\n')
    .filter(Boolean)
    .map(entry => entry.split(' '))
    .map(([direction, value]) => ({ direction, value: Number(value) }));

export const partOne = input => {
  const { horizontal, depth } = input.reduce(
    (acc, curr) => {
      switch (curr.direction) {
        case 'forward':
          return { ...acc, horizontal: acc.horizontal + curr.value };
        case 'down':
          return { ...acc, depth: acc.depth + curr.value };
        case 'up':
          return { ...acc, depth: acc.depth - curr.value };
        default:
          return acc;
      }
    },
    { horizontal: 0, depth: 0 },
  );
  return horizontal * depth;
};

export const partTwo = input => {
  const { horizontal, depth } = input.reduce(
    (acc, curr) => {
      console.log;
      switch (curr.direction) {
        case 'forward':
          return {
            ...acc,
            horizontal: acc.horizontal + curr.value,
            depth: acc.depth + acc.aim * curr.value,
          };
        case 'down':
          return {
            ...acc,
            aim: acc.aim + curr.value,
          };
        case 'up':
          return {
            ...acc,
            aim: acc.aim - curr.value,
          };
        default:
          return acc;
      }
    },
    { horizontal: 0, depth: 0, aim: 0 },
  );
  return horizontal * depth;
};
