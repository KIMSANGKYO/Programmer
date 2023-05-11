function solution(plans) {
    // 1. 시간순대로 먼저 나열해서 시작  오름차순
    // 2. 시작시간 차이 => 걸리는시간과 비교 필요
    
   plans.sort((a,b)=>{
       const timeA = a[1].split(':').map((str)=>parseInt(str));
       const timeB = b[1].split(':').map((str)=>parseInt(str));
       if(timeA[0]!==timeB[0]){
           return timeA[0]-timeB[0];
       }else{
           return timeA[1]-timeB[1];
       }
   })
    const stopTask = [];
    const finishTask = [];
    
   for (let i =0; i<plans.length; i++){
       if(i==plans.length-1){
           finishTask.push(plans[i][0]);
       }else{
           let current = plans[i];
           let next = plans[i+1];
           // 현재 할일 다음 할일 시간차 
           let gap = new Date(`2023-05-11 ${next[1]}:00`).getTime() - new Date(`2023-05-11 ${current[1]}:00`).getTime();
       
      
           // 시간차이를 분으로 계산
           let gapMin = gap / (1000*60);
         
                      
      
           // 이 시간 차로 걸리는 시간과 비교 
           // 시간차가 현재 일에 걸리는 시간 보다 클때 -> 멈추지않음
           if(gapMin > current[2]){
               finishTask.push(current[0]);
               // 시간차가 더 크다면 이때 남아있던 일들의 시간을 줄여야함 
               // 남은 시간
               let remain = gapMin - current[2]
               while(stopTask.length>0 && remain>0){
                   // 멈춘거 빼내기 
                   let pull = stopTask.pop();
                   if(pull[1]>remain){
                       stopTask.push([pull[0],pull[1]-remain]);
                       // 남은 시간 전부 소모 
                       remain = 0;
                   }else{
                       finishTask.push(pull[0]);
                       remain -= pull[1];
                   }
               }
               // 같을땐 그냥 넣으면 끝
           }else if(gapMin==current[2]){
               finishTask.push(current[0])
               // 시간차가 더 작을때 
           }else {
               stopTask.push([current[0],current[2]-gapMin])
           }
           console.log(current)
       }
   }
    // 남은 과제 처리
    while(stopTask.length!==0){
        let pull2 = stopTask.pop();
        finishTask.push(pull2[0]);
    }
    return finishTask;
}