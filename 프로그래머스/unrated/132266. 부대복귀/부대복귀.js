function solution(n, roads, sources, destination) {
    //인접 경로 생성 
    const graph = new Array(n+1).fill(null).map(()=>[]);
    
    for(let [a,b] of roads){
        graph[a].push(b);
        graph[b].push(a);
    }
    
    // 최댓값 저장
    const INF = Number.MAX_SAFE_INTEGRER; 
    
    // 최단거리 저장 배열 
    const distances = new Array(n+1).fill(INF);
    // 목적지 거리는 0 
    distances[destination] = 0; 
    
    const queue = []; 
    queue.push(destination);
    
    while(queue.length>0){
        const current = queue.shift();
        // 인접 순회
        for(let near of graph[current]){
            if(distances[near] === INF){
                distances[near] = distances[current] + 1;
                queue.push(near);
            }
        }
    }
    
    const result = [];
    for(let source of sources){
        if(distances[source] === INF){
            // 복귀 불가 
            result.push(-1);
        }else{
            // 최단시간
            result.push(distances[source])
        }
    }
    
    return result;
}