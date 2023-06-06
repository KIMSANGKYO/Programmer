function solution(n, s, a, b, fares) {
   const INF = 1e9; // 무한대를 표현하기 위한 값

  // 2차원 배열을 생성하고 INF로 초기화
  const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(INF));

  // 자기 자신으로 가는 비용은 0으로 초기화
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) {
        graph[i][j] = 0;
      }
    }
  }

  // fares 정보로 그래프 초기화
  for (const [start, end, cost] of fares) {
    graph[start][end] = cost;
    graph[end][start] = cost;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  let answer = INF;

  // 합승을 고려하지 않고 각자 이동하는 경우 계산
  for (let i = 1; i <= n; i++) {
    const cost = graph[s][i] + graph[i][a] + graph[i][b];
    answer = Math.min(answer, cost);
  }

  // 합승하는 경우 계산
  for (let i = 1; i <= n; i++) {
    const cost = graph[s][i] + graph[i][a] + graph[i][b];
    answer = Math.min(answer, cost);
  }

  return answer;
}