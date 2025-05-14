function solution(gems) {
  const gemSetCount = new Set(gems).size;

  const gemMap = new Map();
  const gemIdxArr = [];
  gems.forEach((gem, i) => {
    gemMap.delete(gem);
    gemMap.set(gem, i);
    if (gemMap.size === gemSetCount) {
      gemIdxArr.push([gemMap.values().next().value + 1, i + 1]); // 가장 먼저 들어온 값 꺼내기
    }
  });

  gemIdxArr.sort((start, end) => {
    const startLen = start[1] - start[0];
    const endLen = end[1] - end[0];

    //길이가 같은 경우
    if (startLen === endLen) {
      return start[1] - end[1]; // 종료 인덱스가 작은 것부터 정렬
    }
    // 길이가 다를 경우
    return startLen - endLen; // 길이가 짧은 것부터
  });
  return gemIdxArr[0];
}

console.log(solution(['AA', 'AB', 'AC', 'AA', 'AC']));
