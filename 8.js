function solution(players, m, k) {
  const activeServer = Array(24).fill(0);
  let expCnt = 0;

  for (let i = 0; i < 24; i++) {
    if (i > 0) {
      activeServer[i] += activeServer[i - 1]; // 서버 유지
    }

    const needServers = Math.floor(players[i] / m);

    if (activeServer[i] < needServers) {
      const addServer = needServers - activeServer[i];
      expCnt += addServer;
      activeServer[i] += addServer;

      // 증설한 서버를 앞으로 k시간 동안 유지
      if (i + k < 24) {
        activeServer[i + k] -= addServer;
      }
    }
  }
  return expCnt;
}

// 테스트
// const players = [0, 0, 0, 0, 0, 2];
const players = [
  0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
];
// const players = [
//   0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0, 0,
// ];
const m = 1;
// const m = 5;
const k = 1;

console.log(solution(players, m, k)); // 7 나옴
