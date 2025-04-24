function solution(n, q, ans) {
  const combinations = getCombArr(
    Array.from({ length: n }, (_, i) => i + 1),
    5
  );
  let count = 0;

  for (const comb of combinations) {
    let valid = true;

    for (let i = 0; i < q.length; i++) {
      const diffArr = comb.filter(x => q[i].includes(x)).length;
      if (diffArr !== ans[i]) {
        valid = false;
        break;
      }
    }

    if (valid) count++;
  }

  return count;
}

const getCombArr = (arr, matchCnt) => {
  const result = [];
  if (matchCnt === 1) return arr.map(el => [el]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombArr(rest, matchCnt - 1);
    const attached = combinations.map(comb => [fixed, ...comb]);
    result.push(...attached);
  });

  return result;
};

const n = 10;
const q = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [3, 7, 8, 9, 10],
  [2, 5, 7, 9, 10],
  [3, 4, 5, 6, 7],
];
const ans = [2, 3, 4, 3, 3];

const result = solution(n, q, ans);
console.log(result);
