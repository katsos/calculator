function calculateExpression(factors) {
  if (factors.length === 1) return Number(factors[0]);
  if (factors.length % 2 === 0) return null; // we don't support on the fly evaluation if there are trailing operators
  return calculateExpression([calculateOperation(...factors.slice(0, 3)), ...factors.slice(3)]);
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

export default calculateExpression;
