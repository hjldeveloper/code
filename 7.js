// 1~n 까지의 정수로 배열 사이즈 5인 모든 경우의 수의 배열 생성
// q[i]의 배열과 하나씩 비교한 후 일치하는 숫자가 ans[i]의 개수와 동일한 지 확인
// 동일할 경우 count+1

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
