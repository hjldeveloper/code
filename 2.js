function solution(n, k, cmd) {
  const prev = Array(n)
    .fill(0)
    .map((_, i) => i - 1);
  const next = Array(n)
    .fill(0)
    .map((_, i) => i + 1);
  next[n - 1] = -1;

  const delIdx = new Set();
  const delHistory = [];
  let startIdx = k;

  for (let c of cmd) {
    const [actions, value] = c.split(' ');

    let count = +value;

    if (actions === 'D') {
      while (count--) startIdx = next[startIdx];
    } else if (actions === 'U') {
      while (count--) startIdx = prev[startIdx];
    } else if (actions === 'C') {
      delHistory.push([startIdx, prev[startIdx], next[startIdx]]);
      delIdx.add(startIdx);

      // 연결 끊기
      if (prev[startIdx] !== -1) next[prev[startIdx]] = next[startIdx];
      if (next[startIdx] !== -1) prev[next[startIdx]] = prev[startIdx];

      startIdx = next[startIdx] !== -1 ? next[startIdx] : prev[startIdx];
    } else if (actions === 'Z') {
      const [idx, p, n_] = delHistory.pop();
      delIdx.delete(idx);

      if (p !== -1) next[p] = idx;
      if (n_ !== -1) prev[n_] = idx;
    }
  }

  let arr = Array(n).fill('O');
  for (const idx of delIdx) {
    arr[idx] = 'X';
  }

  return arr.join('');
}

const arr = ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z', 'U 1', 'C'];
const result = solution(8, 2, arr);
console.log(result);
