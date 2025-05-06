const createOutside = (n, m, grid, direction) => {
  const outside = Array.from({ length: n }, () => Array(m).fill(false));

  const checkOutside = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= m) return;
    if (outside[i][j] || grid[i][j] !== null) return;
    outside[i][j] = true;
    for (const [dx, dy] of direction) {
      checkOutside(i + dx, j + dy);
    }
  };

  // 가장자리부터 시작
  for (let i = 0; i < n; i++) {
    checkOutside(i, 0);
    checkOutside(i, m - 1);
  }
  for (let j = 0; j < m; j++) {
    checkOutside(0, j);
    checkOutside(n - 1, j);
  }

  return outside;
};

function solution(storage, requests) {
  const n = storage.length;
  const m = storage[0].length;
  let storageGrid = storage.map(row => row.split(''));
  const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (const r of requests) {
    if (r.length === 1) {
      const outside = createOutside(n, m, storageGrid, direction);

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (storageGrid[i][j] !== r) continue;
          // 경계면
          if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
            storageGrid[i][j] = null;
            continue;
          }

          // 상하좌우 확인
          for (const [mvX, mvY] of direction) {
            const newI = i + mvX;
            const newJ = j + mvY;
            if (outside[newI]?.[newJ]) {
              storageGrid[i][j] = null;
              break;
            }
          }
        }
      }
    } else {
      const str = r.slice(0, 1);
      storageGrid = storageGrid.map(i => i.map(j => (j === str ? null : j)));
    }
  }
  //   console.log(storageGrid);
  const result = storageGrid.flat().filter(item => item !== null).length;
  return result;
}

console.log(solution(['AZWQY', 'CAABX', 'BBDDA', 'ACACA'], ['A', 'BB', 'A']));
console.log(
  solution(['HAH', 'HBH', 'HHH', 'HAH', 'HBH'], ['C', 'B', 'B', 'B', 'B', 'H'])
);
