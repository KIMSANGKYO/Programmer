function solution(land, P, Q) {
    let heights = []; 
    
    for(let i=0; i<land.length; i++){
        heights=heights.concat(land[i]);
    }
    
    heights.sort((a,b)=>a-b);
    
    let len = heights.length; 
    let result = heights.reduce((sum, num) => sum + num, 0) * Q;
    let cost = (heights.reduce((sum, num) => sum + num, 0) - heights[0] * len) * Q;
  result = Math.min(result, cost);
    
    for(let i=1; i<len; i++){
        if(heights[i] !== heights[i-1]){
            cost += P * i * (heights[i] - heights[i - 1]) - Q * (len - i) * (heights[i] - heights[i - 1]);
            result = Math.min(result,cost);
        }
    }
    return result;
}

// function solution(land, P, Q) {
//   const N = land.length; // 지형의 크기
//   let heights = []; // 각 칸의 높이를 저장할 배열
  
//   // 각 칸의 높이를 heights 배열에 저장
//   for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++) {
//       heights.push(land[i][j]);
//     }
//   }
  
//   // 오름차순으로 정렬
//   heights.sort((a, b) => a - b);
  
//   let answer = Infinity; // 최소 비용을 저장할 변수
  
//   // 모든 높이에 대해 비용 계산
//   for (let i = 0; i < N * N; i++) {
//     let targetHeight = heights[i]; // 현재 높이를 기준으로 비용 계산
    
//     let cost = 0; // 현재 높이로 모든 칸을 맞출 때 필요한 비용
    
//     // 각 칸의 높이와 현재 높이를 비교하여 필요한 블록의 수를 계산
//     for (let j = 0; j < N * N; j++) {
//       if (heights[j] < targetHeight) {
//         cost += (targetHeight - heights[j]) * P; // 추가 비용 계산
//       } else {
//         cost += (heights[j] - targetHeight) * Q; // 제거 비용 계산
//       }
//     }
    
//     answer = Math.min(answer, cost); // 최소 비용 업데이트
//   }
  
//   return answer;
// }