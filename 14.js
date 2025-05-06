function solution(n, w, num) {
  const tNumArr = Array.from({ length: n }, (_, i) => i + 1);

  const numArr = [];
  for (let i = 0, row = 0; i < tNumArr.length; i += w, row++) {
    let chunk = tNumArr.slice(i, i + w);
    while (chunk.length < w) chunk.push('');
    if (row % 2 === 1) chunk.reverse();
    numArr.push(chunk);
  }

  const stacks = Array.from({ length: w }, () => []);

  for (const rowArr of numArr) {
    rowArr.forEach((value, idx) => {
      stacks[idx].push(value);
    });
  }

  const idx = stacks.findIndex(v => v.includes(num));
  let popCnt = 0;

  while (stacks[idx].length) {
    const stackTop = stacks[idx].pop();
    if (stackTop !== '') popCnt++;
    if (stackTop === num) break;
  }

  return popCnt;
}

const n = 22;
const w = 6;
const num = 8;

// console.log(solution(n, w, num));

console.log(solution(22, 6, 8)); // 3
console.log(solution(13, 3, 6)); // 4
