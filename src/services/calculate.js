import { SEPARATORS } from '../buttons';
import { getLast, getAllButLast } from './helpers';

function calculateExpression(factors) {
  if (factors.length === 1) return Number(factors[0]);
  if (factors.length % 2 === 0) return null; // we don't support on the fly evaluation if there are trailing operators
  const operationResult = calculateOperation(...factors.slice(0, 3));
  return calculateExpression([operationResult.toString(), ...factors.slice(3)]);
}

export function calculateOperation(a, operator, b) {
  const [aN, bN] = [Number(a), Number(b)];

  switch (operator) {
    case '+':
      return aN + bN;
    case '-':
      return aN - bN;
    case '*':
      return aN * bN;
    case '÷':
      return aN / bN;
    default:
      throw new Error(`operator "${operator}" is not supported yet!`);
  }
}

export function getNewExpression(expressionFactors, char) {
  const allFactorsButLast = getAllButLast(expressionFactors);
  const lastFactor = getLast(expressionFactors);
  const isLastFactorSeparator = SEPARATORS.includes(lastFactor);

  if (SEPARATORS.includes(char)) {
    if (!expressionFactors.length) return []; // an operator must always come after a number
    if (isLastFactorSeparator) return [...allFactorsButLast, char]; // replace last separator
    return [...expressionFactors, char]; // add new separator
  }
  if (isLastFactorSeparator) return [...expressionFactors, char]; // add new number

  if (lastFactor === '0') return [...allFactorsButLast, char]; // replace zero number
  return [...allFactorsButLast, (lastFactor || '') + char]; // update last number
}

export default calculateExpression;
