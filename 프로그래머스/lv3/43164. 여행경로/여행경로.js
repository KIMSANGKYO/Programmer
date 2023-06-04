function solution(tickets) {
    // 두번째요소와 첫번째요소를 같은 값으로 연결시켜야함
    const result = [];
    const visited = new Array(tickets.length).fill(false); // 방문 여부를 체크할 배열
  
      // 경로를 사전 순으로 정렬
    tickets.sort((a, b) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    });
  
  const dfs = (airport, depth) => {
    result.push(airport); // 경로에 현재 공항 추가
    if (depth === tickets.length) return true; // 모든 항공권을 사용한 경우 종료
    
    for (let i = 0; i < tickets.length; i++) {
      if (!visited[i] && tickets[i][0] === airport) {
        visited[i] = true; // 항공권 사용 처리
        if (dfs(tickets[i][1], depth + 1)) return true; // 다음 공항으로 이동
        visited[i] = false; // 백트래킹: 경로를 찾지 못한 경우 다시 방문 가능하도록 처리
      }
    }
    
    result.pop(); // 경로에서 현재 공항 제거
    return false; // 경로를 찾지 못한 경우
  };
  
  dfs('ICN', 0); // "ICN"에서 시작하여 DFS 실행
  
  return result;
}