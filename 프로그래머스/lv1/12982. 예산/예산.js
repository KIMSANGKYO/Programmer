function solution(d, budget) {
  // d 의 요소들을 더했을때 budget 과 제일 가깝게 조합 
    // 오름차순 정렬로 최대로 넣기 
    // 최대로 넣은d의 개수를 세면 된다 
    let sum = 0;
    let result = 0;
    d.sort((a,b)=>a-b);
    
    // 예산값 초과시 다시 -1 
    for(let i=0; i<d.length; i++){
      sum+=d[i]
      result++
      if(sum>budget){
          result--
      }
    }
    return result
}