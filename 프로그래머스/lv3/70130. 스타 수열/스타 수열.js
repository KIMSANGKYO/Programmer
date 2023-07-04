function solution(a) {
    // 각 숫자 등장 횟수 
    const countMap = new Map();
    
    for(const num of a){
        if(countMap.has(num)){
            countMap.set(num,countMap.get(num)+1);
        }else{
            countMap.set(num,1);
        }
    }
    
    let result = 0;
    
    // 등장 횟수가 큰 숫자부터 순회
    for(const[num,count] of countMap){
        // 수열보다 등장횟수 작으면 확인안함
        if(count <=result) continue;
        
        let starCount = 0; // 스타 수열 길이
        let i = 0; 
        
        while(i<a.length-1){
            // 현재 숫자를 포함, 스타수열 개수
            if((a[i]===num || a[i+1]===num)&&a[i]!==a[i+1]){
                starCount++;
                i+=2; // 숫자쌍
            }else{
                i++;
            }
        }
        result = Math.max(result,starCount);
    }
    return result * 2; 
}