function solution(n, paths, gates, summits) {
  // 그래프 생성, 경로로 구성
  const graph = new Array(n + 1).fill(null).map(() => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  // 도착지점 판별
  const isSummit = new Array(n + 1).fill(false);
  for (const summit of summits) {
    isSummit[summit] = true;
  }

  // gates 모두 시작 위치
  const distance = new Array(n + 1).fill(Infinity);
  const queue = [];
  for (const gate of gates) {
    distance[gate] = 0;
    queue.push([0, gate]);
  }

  // 다익스트라
  while (queue.length > 0) {
    const [d, i] = queue.shift();
    // 두개 이상 도착 x
    if (distance[i] < d || isSummit[i]) {
      continue;
    }
    for (const [j, dd] of graph[i]) {
      const newDistance = Math.max(distance[i], dd);
      if (distance[j] > newDistance) {
        distance[j] = newDistance;
        queue.push([newDistance, j]);
      }
    }
  }
  // 초기값은 최대로
  const result = [-1, Infinity];
  for (const summit of summits.sort((a, b) => a - b)) {
    if (distance[summit] < result[1]) {
      result[0] = summit;
      result[1] = distance[summit];
    }
  }
  return result;
}