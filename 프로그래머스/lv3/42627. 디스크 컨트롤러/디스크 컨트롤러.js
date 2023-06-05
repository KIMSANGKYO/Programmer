function solution(jobs) {
    // [요청시점, 소요시간]
    // 요청위치는 있고, 시작위치를 갱신시켜줘야한다 
    // [0,3] [2,6] [1,9] 로 정렬후 3 + (6+(3-2)) + (9+(3+6-1))
    // 처음 식을 제외하면 각각의 작업은 => 걸리는시간+(그전 작업들이 끝나는시간 - 시작시간 )
    
    // 정렬은 앞 작업이 끝나는 시점과 뒤에 작업이 시작하는 시점의 차가 가장 적을때 효율이 올라간다
    // 작업 소요시간 기준 오름 차순 // 시간이 같은 경우 요청시간
    jobs.sort((a,b)=>a[0]-b[0]);
    
    const queue = [];
    
    let currentTime = 0;
    let totalWaitTime = 0;
    let totalJobTime = 0;
    let index = 0; 
    
    while(queue.length > 0 || index < jobs.length ){
        if(index < jobs.length && jobs[index][0] <= currentTime){
            queue.push(jobs[index]);
            queue.sort((a,b)=>a[1]-b[1]);
            index++;
            continue;
        }
        if(queue.length === 0){
            currentTime = jobs[index][0];
            continue;
        }
        
        // 작업빼내기
        const [start,duration] = queue.shift();
        currentTime += duration;
        totalWaitTime += currentTime - start;
        totalJobTime += duration;
    }
    
    const averageTime = Math.floor(totalWaitTime / jobs.length);
    
    return averageTime;
}