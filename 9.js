/**
 * @param {number[]} nodes
 * @param {number[][]} edges
 * @returns {[number, number]}
 */
function solution(nodes, edges) {
  // 1) 인접 리스트 생성
  const nodeList = {};
  for (const v of nodes) {
    nodeList[v] = [];
  }
  for (const [u, v] of edges) {
    nodeList[u].push(v);
    nodeList[v].push(u);
  }

  // 1) 수정된 rootNode: 차수가 0이거나 2 이상인 노드만
  const rootNode = nodes.filter(v => nodeList[v].length !== 1);

  // 2) groupNode: [루트, ...인접노드] 2차원 배열
  let groupNode = rootNode.map(r => [r, ...nodeList[r]]);

  // 3) nodes 에 없는 값이 들어간 그룹은 버리기
  const nodeSet = new Set(nodes);
  groupNode = groupNode.filter(group => group.every(x => nodeSet.has(x)));

  // 4) 각 그룹별로 sameCnt(홀짝), diffCnt(역홀짝) 체크
  let sameCnt = 0,
    diffCnt = 0;
  for (const [r, ...children] of groupNode) {
    const rootDegParity = children.length % 2; // 루트의 자식개수 홀짝
    const rootNumParity = r % 2; // 루트 번호 홀짝

    let allSame = true; // “홀짝 트리” 여부
    let allDiff = true; // “역홀짝 트리” 여부

    for (const c of children) {
      // c의 자식 개수 = adj[c].length 에서 부모(r) 한 개를 뺀 값
      const subCount = nodeList[c].filter(x => x !== r).length;
      const subParity = subCount % 2;
      const cNumParity = c % 2;

      if (subParity !== cNumParity) allSame = false;
      if (subParity === cNumParity) allDiff = false;
    }

    if (rootDegParity === rootNumParity && allSame) sameCnt++;
    if (rootDegParity !== rootNumParity && allDiff) diffCnt++;
  }
  console.log(nodeList);
  return [sameCnt, diffCnt];
}

// --- 테스트 ---
const nodes1 = [11, 9, 3, 2, 4, 6];
const edges1 = [
  [9, 11],
  [2, 3],
  [6, 3],
  [3, 4],
];
console.log(solution(nodes1, edges1)); // [1, 0]

const nodes2 = [9, 15, 14, 7, 6, 1, 2, 4, 5, 11, 8, 10];
const edges2 = [
  [5, 14],
  [1, 4],
  [9, 11],
  [2, 15],
  [2, 5],
  [9, 7],
  [8, 1],
  [6, 4],
];
console.log(solution(nodes2, edges2)); // [2, 1]
