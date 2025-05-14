function solution(gems) {
  const needCount = new Set(gems).size;
  const gemsDuplMap = new Map();

  let left = 0;
  let right = 0;
  let minLen = Infinity;
  let result = [-1, -1];
  let haveCount = 0;

  while (right < gems.length) {
    const rightVal = gems[right];
    gemsDuplMap.set(rightVal, (gemsDuplMap.get(rightVal) || 0) + 1);
    if (gemsDuplMap.get(rightVal) === 1) haveCount++;

    while (haveCount === needCount) {
      if (right - left < minLen) {
        minLen = right - left;
        result = [left + 1, right + 1];
      }

      const leftVal = gems[left];
      gemsDuplMap.set(leftVal, gemsDuplMap.get(leftVal) - 1);
      if (gemsDuplMap.get(leftVal) === 0) haveCount--;
      left++;
    }

    right++;
  }

  return result;
}

// 예시
const input = ['AA', 'AB', 'AC', 'AA', 'AC'];
console.log(solution(input)); // [1, 3]
console.log(
  solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'])
);
console.log(solution(['XYZ', 'XYZ', 'XYZ']));
console.log(solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB']));
