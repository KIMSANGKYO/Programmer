function solution(n, k, enemy) {
  // 보유 병사 n // 무적사용권 k 
    // enemy[i] 값만큼 라운드 
    // 라운드 수는 enemy.length
    
    // (7,3,[4,2,4,5,3,3,1])
    
    let start = 0; //첫라운드
    let end = enemy.length ; //끝라운드 
    
    
    const sum = (idx)=>{
        // 잘라내기,오른차순정렬, 
        return idx+1-k >=0 ?
            enemy.slice(0,idx+1).sort((a,b)=>a-b).slice(0,idx+1-k).reduce((now,plus)=>now+plus,0):0;
    };
    
    while(true){
        if(end-start ===1){
            return end;
        }
        const mid = Math.floor((start+end)/2);
        const allsum = sum(mid);
        
        if(n>=allsum){
            start = mid;
        }else {
            end = mid;
        }
    }
    
        
}