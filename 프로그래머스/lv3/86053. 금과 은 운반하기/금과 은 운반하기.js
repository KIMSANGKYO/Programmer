function solution(a, b, g, s, w, t) {
    // 유한 값중 최댓값 설정 
    // t 10^5 // w 10^2
  let result = 10**15; 
  let start = 0; // 이진 탐색의 시작 값
  let end = 10**15; // 이진 탐색의 종료 값
  
  while (end >= start) { 
    let mid = Math.floor((end + start) / 2); 
    let gold = 0; // 금의 총량
    let silver = 0; // 은의 총량
    let add = 0; // 금과 은의 총량
    
    // 각 도시의 트럭 순회
    for (let i = 0; i < t.length; i++) { 
      let curGold = g[i]; // 도시의 금
      let curSilver = s[i]; // 도시의 은
      let curW = w[i]; // 트럭 용량
      let curT = t[i]; // 왕복 시간
      
      let move_cnt = Math.floor(mid / (curT * 2)); 
      
      // 중간의 나머지가 편도완주시간보다 클때
      if (mid % (curT * 2) >= curT) {
        move_cnt += 1; 
      }
      
      gold += Math.min(curGold, move_cnt * curW); 
      silver += Math.min(curSilver, move_cnt * curW); 
      add += Math.min(curGold + curSilver, move_cnt * curW); 
    }
     // 모든 도시의 조건을 만족하는 경우
    if (gold >= a && silver >= b && add >= a + b) { 
      end = mid - 1; 
      result = Math.min(mid, result);
    } else {
      start = mid + 1; 
    }
  }
  
  return result;
}