export const formatNumber = (number: number): string => {
  const fraction = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  if (number - Math.floor(number) === 0) {
    fraction.maximumFractionDigits = 0;
    fraction.minimumFractionDigits = 0;
  } else {
    const zeroDecimalsLength = number.toString().match(/(\.0*)/)![0].length - 1;

    fraction.maximumFractionDigits = zeroDecimalsLength + 2;
    fraction.minimumFractionDigits = 0;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    ...fraction,
  });

  return formatter.format(roundDownSignificantDigits(number, fraction.maximumFractionDigits));
};

function roundDownSignificantDigits(number: number, decimals: number) {
  const significantDigits = parseInt(number.toExponential().split('e-')[1]!) || 0;
  const decimalsUpdated = (decimals || 0) + significantDigits - 1;
  decimals = Math.min(decimalsUpdated, number.toString().length);

  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
