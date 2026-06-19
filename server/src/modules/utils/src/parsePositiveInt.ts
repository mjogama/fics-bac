const parsePositiveInteger = (value: unknown, fallback: number) => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

export default parsePositiveInteger;
