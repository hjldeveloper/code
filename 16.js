function solution(schedules, timelogs, startday) {
  let totalCnt = 0;

  timelogs.forEach((item, i) => {
    let cnt = 0;
    const startTime = setTime(schedules[i] + 10);

    item.forEach((time, idx) => {
      const day = (startday + idx) % 7;
      if (day === 0 || day === 6) return; // 주말 제외
      if (time <= startTime) cnt++;
    });

    if (cnt === 5) totalCnt++;
  });

  return totalCnt;
}

const setTime = time => {
  let hour = Math.floor(time / 100);
  let min = time % 100;

  if (min >= 60) {
    hour = hour + 1;
    min = min - 60;
  }

  const result = hour * 100 + min;
  return result;
};

console.log(
  solution(
    [700, 800, 1100],
    [
      [710, 2359, 1050, 700, 650, 631, 659],
      [800, 801, 805, 800, 759, 810, 809],
      [1105, 1001, 1002, 600, 1059, 1001, 1100],
    ],
    5
  )
);
console.log(
  solution(
    [730, 855, 700, 720],
    [
      [710, 700, 650, 735, 700, 931, 912],
      [908, 901, 805, 815, 800, 831, 835],
      [705, 701, 702, 705, 710, 710, 711],
      [707, 731, 859, 913, 934, 931, 905],
    ],
    1
  )
);
