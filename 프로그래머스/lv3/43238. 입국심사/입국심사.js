function solution(n, times) {
    // n 명이 들어올때 몇분이 걸리는지  
    // 더 먼저 끝날 것 같은 심사대를 찾아감
    // 심사대의 시간을 오름차순
    times.sort((a,b)=>a-b);
    // 이분 탐색을 위해 양쪽 끝값 / 중간 값 활용
    let start = 1;
    // end 는 최댓값 => 제일큰값을 n 번 곱한값 
    let end = n * times[times.length-1];
    // 최댓값을 기본값으로 부여
    let result = end;
    
    while(start <= end){
        let middle = Math.floor((start+end)/2);
        // 해당 시간 동안 처리할 수 있는 사람의 수
        let count = 0;
        times.forEach((time)=>{
            count += Math.floor(middle / time);
            if(count >= n){
                result = Math.min(middle, result);
                return;
            }
        })
        if(count >= n){
            end = middle - 1;
        }else{
            start = middle + 1;
        }
    }
    return result;
}