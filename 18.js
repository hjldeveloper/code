function solution(n, bans) {
  const magicMaxLen = 11;

  const rmMagicArr = Array.from({ length: magicMaxLen + 1 }, () => []); // index:0 무시
  for (const v of bans) {
    rmMagicArr[v.length].push(v);
  }

  // 1자리: 26(알파벳 개수) 2자리: 26*26 ...
  const magicArrLen = new Array(magicMaxLen + 1).fill(1);
  for (let i = 1; i <= magicMaxLen; i++) {
    magicArrLen[i] = magicArrLen[i - 1] * 26;
  }

  let totalCnt = 0; // 각 자리수에서 몇번째 주문인지
  let targetLen = -1; // target 자리수
  let target = 0;
  for (let i = 1; i <= magicMaxLen; i++) {
    const magicCnt = magicArrLen[i];
    const rmCnt = rmMagicArr[i].length;
    const cnt = magicCnt - rmCnt;
    if (n <= totalCnt + cnt) {
      targetLen = i;
      target = n - totalCnt;
      break;
    }
    totalCnt += cnt;
  }
  if (targetLen === -1) {
    throw new Error('범위 오류 발생');
  }

  // 97: a , 98: b...
  const magicArrCnt = magicArrLen[targetLen];
  const rmMagicIdx = rmMagicArr[targetLen] // target 자리수에서 제거된 주문 arr
    .map(s => {
      let idx = 0;
      for (let i = 0; i < targetLen; i++) {
        idx = idx * 26 + (s.charCodeAt(i) - 97);
      }
      return idx;
    })
    .sort((a, b) => a - b);

  let prev = -1;
  let remain = target; // 남은 순서
  let answerIdx = -1;

  for (const idx of rmMagicIdx) {
    const segmentSize = idx - prev - 1;
    if (remain <= segmentSize) {
      answerIdx = prev + remain;
      break;
    }
    remain -= segmentSize;
    prev = idx;
  }

  if (answerIdx === -1) {
    const total = magicArrCnt; // 26, 26*26 ...
    const segSize = total - (prev + 1);
    if (remain <= segSize) {
      answerIdx = prev + remain;
    } else {
      throw new Error('인덱스 범위 오류');
    }
  }

  // 해당 index 주문 구하기
  let index = answerIdx;
  const result = new Array(targetLen);
  for (let i = targetLen - 1; i >= 0; i--) {
    result[i] = String.fromCharCode(97 + (index % 26));
    index = Math.floor(index / 26);
  }
  return result.join('');
}

// === 예시 테스트 ===
console.log(solution(30, ['d', 'e', 'bb', 'aa', 'ae'])); // "ah"
console.log(
  solution(7388, [
    'gqk',
    'kdn',
    'jxj',
    'jxi',
    'fug',
    'jxg',
    'ewq',
    'len',
    'bhc',
  ])
); // "jxk"

// 모듈로 내보내려면
// module.exports = solution;
