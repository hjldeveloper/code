function solution(expression) {
  const tokens = expression.split(/(\D)/).filter(token => token !== '');

  const operatorSet = new Set(tokens.filter(v => ['+', '-', '*'].includes(v)));
  const operators = [...operatorSet];

  const getPermutate = op => {
    if (op.length <= 1) return [op];
    const arr = [];
    op.forEach((item, index) => {
      const remaining = [...op.slice(0, index), ...op.slice(index + 1)];
      getPermutate(remaining).forEach(perm => {
        arr.push([item, ...perm]);
      });
    });
    return arr;
  };

  const calc = (a, b, express) => {
    switch (express) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
    }
  };

  const permutateArr = getPermutate(operators); // 연산자 경우의 수

  let max = 0;
  permutateArr.forEach(order => {
    let tmpTokens = [...tokens];
    for (const exp of order) {
      while ((idx = tmpTokens.indexOf(exp)) !== -1) {
        const calcResult = calc(
          Number(tmpTokens[idx - 1]),
          Number(tmpTokens[idx + 1]),
          exp
        );
        tmpTokens.splice(idx - 1, 3, calcResult.toString());
      }
    }
    max = Math.max(max, Math.abs(Number(tmpTokens[0])));
  });

  return max;
}

const expression = '100-200*300-500+20';
const result = solution(expression);
console.log(result);
