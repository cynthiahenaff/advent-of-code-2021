export const formatInput = input => input.split('\n').filter(Boolean);

const binaryToDecimal = binary => {
  return parseInt((binary + '').replace(/[^01]/gi, ''), 2);
};

export const partOne = input => {
  const entryLength = input[0].split('').length;

  const gammaBinary = Array.from(new Array(entryLength), (_, index) => {
    const { one, zero } = input.reduce(
      (acc, curr) => {
        return Number(curr.split('')[index]) === 0
          ? { ...acc, zero: acc?.zero + 1 }
          : { ...acc, one: acc?.one + 1 };
      },
      { zero: 0, one: 0 },
    );
    return one > zero ? 1 : 0;
  }).join('');

  const epsilonBinary = gammaBinary
    .split('')
    .map(value => Number(value) - 1)
    .join('')
    .replace('-', '');

  return binaryToDecimal(gammaBinary) * binaryToDecimal(epsilonBinary);
};

export const partTwo = input => {
  const entryLength = input[0].split('').length;
  let o2GeneratorRatingInput = input;

  Array.from(new Array(entryLength), (_, index) => {
    if (o2GeneratorRatingInput.length === 1) {
      return;
    }

    const { one, zero } = o2GeneratorRatingInput.reduce(
      (acc, curr) => {
        return Number(curr.split('')[index]) === 0
          ? { ...acc, zero: acc?.zero + 1 }
          : { ...acc, one: acc?.one + 1 };
      },
      { zero: 0, one: 0 },
    );
    const o2GeneratorRating = zero <= one ? 1 : 0;

    return (o2GeneratorRatingInput = o2GeneratorRatingInput.filter(
      value => Number(value.split('')[index]) === o2GeneratorRating,
    ));
  });

  const o2GeneratorRatingDecimal = binaryToDecimal(o2GeneratorRatingInput[0]);

  let co2ScrubberRatingInput = input;

  Array.from(new Array(entryLength), (_, index) => {
    if (co2ScrubberRatingInput.length === 1) {
      return;
    }

    const { one, zero } = co2ScrubberRatingInput.reduce(
      (acc, curr) => {
        return Number(curr.split('')[index]) === 0
          ? { ...acc, zero: acc?.zero + 1 }
          : { ...acc, one: acc?.one + 1 };
      },
      { zero: 0, one: 0 },
    );
    const co2ScrubberRating = zero > one ? 1 : 0;

    return (co2ScrubberRatingInput = co2ScrubberRatingInput.filter(
      value => Number(value.split('')[index]) === co2ScrubberRating,
    ));
  });

  const co2ScrubberRatingDecimal = binaryToDecimal(co2ScrubberRatingInput[0]);

  return o2GeneratorRatingDecimal * co2ScrubberRatingDecimal;
};
