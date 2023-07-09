function solution(e, starts) {
  const divisor = new Array(e + 1).fill(0);
  const minStarts = Math.min(...starts);

  for (let i = 1; i <= e; i++) {
    if (i * i <= e) {
      divisor[i * i] += 1;
    }
    for (let j = i + 1; j <= e; j++) {
      const n = i * j;
      if (n > e) {
        break;
      }
      divisor[n] += 2;
    }
  }

  const maxDiv = new Array(e + 1).fill(0);
  maxDiv[e] = e;
  for (let i = e - 1; i >= minStarts; i--) {
    if (divisor[maxDiv[i + 1]] <= divisor[i]) {
      maxDiv[i] = i;
    } else {
      maxDiv[i] = maxDiv[i + 1];
    }
  }

  const result = starts.map((s) => maxDiv[s]);
  return result;
}


// 스택 초과.. 
// function solution(e, starts) {
//     // 억억단 생성 행렬
//     const matrix = Array.from(Array(e), () => Array(e).fill(0));
//     // 각 숫자 등장 횟수
//     const counts = Array(e + 1).fill(0);
    
//     for(let i=0; i<e; i++){
//         for(let j=0; j<e; j++){
//             matrix[i][j] = (i + 1) * (j + 1);
//             counts[matrix[i][j]]++;
//         }
//     }
    
//     const result = [];
    
//     // 각 퀴즈 답 계산
//     for(let i=0; i<starts.length; i++){
//         const start = starts[i];
//         let maxCnt = 0;
//         let answer = 0;
        
//         // 가장 많이 등장한 수 찾기
//         for(let j=start; j<=e; j++){
//             if(counts[j]>maxCnt){
//                 maxCnt = counts[j];
//                 answer = j;
//             }
//         }
        
//         result.push(answer);
//     }
    
//     return result;
// }