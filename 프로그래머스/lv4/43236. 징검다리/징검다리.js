function solution(distance, rocks, n) {
    rocks.sort((a,b)=>a-b); // 바위위치 오름차순
    rocks.push(distance); // 도착지점 추가 
    let start = 0;
    let end = distance;
    let result = 0;
    
    while(start <= end){
        let mid = Math.floor((start+end)/2);
        let removeCount = 0;
        let prev = 0;
        let minDistance = Infinity;
        
        for(let i=0; i<rocks.length; i++){
            let diff = rocks[i] - prev // 바위 사이 거리
            if(diff < mid){
                removeCount++; // 바위 제거 시 거리가 중간보다 작아진다 
            }else{
                prev = rocks[i]; 
                minDistance = Math.min(minDistance, diff); // 최솟값갱신
            }
        }
        
        if(removeCount > n){
            end = mid-1; // 제거할 바위수 많을 때 mid 줄이기 
        }else{
            result = Math.max(result,minDistance);
            start = mid+1;
        }
    }
    return result;
}