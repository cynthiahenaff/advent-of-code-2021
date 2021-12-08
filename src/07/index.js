import { times, max, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

export const partOne = input =>
  times(max(input)).reduce(
    (acc, curr) =>
      Math.min(
        acc,
        sum(input.map(currentPosition => Math.abs(currentPosition - curr))),
      ),
    Infinity,
  );

export const partTwo = input =>
  times(max(input)).reduce(
    (acc, curr) =>
      Math.min(
        acc,
        sum(
          input.map(
            currentPosition =>
              (Math.abs(currentPosition - curr) *
                (Math.abs(currentPosition - curr) + 1)) /
              2,
          ),
        ),
      ),
    Infinity,
  );
