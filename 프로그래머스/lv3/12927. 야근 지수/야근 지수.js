function solution(n, works) {
    // works 배열을 순회하면서 n값으로 빼가면서 평탄화시키는게 목적
    // 배열에서 가장 큰값에다가 n 값을 소모하면 될것같다
    
    // 모든 값 합쳤을때 n 보다 작으면 0
    
    // ================================ 효율성 미통과 ======================
    
//     let sum = works.reduce((a,b)=>a+b);
//     if(sum<=n){
//         return 0;
//     }
   
//     for(let i=0; i<n; i++){
//          let largeIdx = works.findIndex((e)=>e===Math.max(...works));
//         works[largeIdx] -=1;
//     }
//     return works.reduce((sum,num)=>sum+num*num,0)
    
    // ================================ 효율성 미통과 ======================
    
    
   // 인덱스 저장후 배열요소 앞뒤 비교 
    works.sort((a,b)=>b-a);
    
    let idx = 0
    
    while(n>0){
       if(works[idx]<works[idx+1]){
           idx++;
           continue;
       }
        if(works[idx-1]===works[idx]){
            idx=0;
            continue;
        }
        works[idx]--;
        n--;
    }
    return works.reduce((sum,work)=>(work>0? sum+work*work : sum),0); 
}
