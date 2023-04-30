function solution(n, words) {
  // words 의 길이로 n 을 나누면 끝말잇기를 한 총 회차 >> 오류가 발생한 회차가 배열 2번쨰요소 
  // 첫번째 요소는 몇번째 사람이 실수했는지 
  
    // i+1 로 문자열 찾으면 끝에서 오류 
    // 앞에 값을 기준으로 맞추자 
  let front = words[0];
  let turn = 1;   
  for(let i=1; i<words.length; i++){
     let people = i%n+1;
      
      // 단어의 끝과 시작이 맞는지 판별 
      if(front.slice(-1) !== words[i].slice(0,1)){
          return [people,turn];
      }

      // 단어 중복 판별 
      if(words.findIndex((word)=>words[i]===word)!==i){
          return [people,turn];
      }
      
      // 판별 후 갱신
      front = words[i];
      if(people ===n){
          turn +=1;
      }
  }
    return [0,0]
}