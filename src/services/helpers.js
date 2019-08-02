export function getLast(array) {
  return array[array.length - 1];
}

export function getAllButLast(array) {
  return array.slice(0, -1);
}

export function numberWithCommas(number) {
  const [intPart, decPart] = number.toString().split('.');
  const integerWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return integerWithCommas + (decPart ? `.${decPart}` : '');
}