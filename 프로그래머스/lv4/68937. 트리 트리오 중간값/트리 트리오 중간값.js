function solution(n, edges) {
    let graph = {};
    
    for(let [v1,v2] of edges){
        if(!(v1 in graph)){
            graph[v1] = [];
        }
        if(!(v2 in graph)){
            graph[v2] = [];
        }
        graph[v1].push(v2);
        graph[v2].push(v1);
    }
    
    function dfs(start,n,graph){
        let queue = [[start,0]];
        let visited = new Array(n+1).fill(false);
        visited[start] = true;
        let maxNode = start;
        let maxDist = 0;
        let maxCheck = 1;
        
        while(queue.length > 0){
            let [node,dist] = queue.pop();
            if(dist > maxDist){
                maxNode = node;
                maxDist = dist;
                maxCheck = 1;
            }else if(dist === maxDist){
                maxCheck = 0;
            }
            
            for(let nextNode of graph[node]){
                if(!visited[nextNode]){
                    visited[nextNode] = true;
                    queue.push([nextNode,dist+1]);
                }
            }
        }
        return [maxNode,maxDist,maxCheck];
    }
    
    let [start, , ] = dfs(1,n,graph);
    let [endNode,diameter,check] = dfs(start,n,graph);
    if(!check){
        return diameter;
    }
    
    let [,newDiameter,newCheck] = dfs(endNode,n,graph);
    return diameter - newCheck;
}

// 1차 실패..
// function solution(n, edges) {
//     // 간선 저장 그래프 생성
//     const graph = {}; 
//     for(let i=1; i<=n; i++){
//         graph[i] = [];
//     }
    
//     for(let [v1,v2] of edges){
//         graph[v1].push(v2);
//         graph[v2].push(v1);
//     }
    
//     // 정점 사이 거리 계산
//     function getDistance(start,target,graph){
//         const queue = [[start,0]];
//         const visited = new Set([start]);
        
//         while(queue.length > 0){
//             const [node,distance] = queue.shift();
            
//             if(node === target){
//                 return distance;
//             }
            
//             for(let neighbor of graph[node]){
//                 if(!visited.has(neighbor)){
//                     queue.push([neighbor,distance+1]);
//                     visited.add(neighbor);
//                 }
//             }
//         }
        
//         return -1; // 도달못할때
//     }
    
    
    
    
//     let result = 0;
    
//     // 임의의 3개점 조합 
//     for(let i=1; i<=n; i++){
//         for(let j of graph[i]){
//             for(let k of graph[j]){
//                 if(i===k) continue; // 중복제외 
//                 const distAB = getDistance(i,j,graph);
//                 const distBC = getDistance(j,k,graph);
//                 const distCA = getDistance(k,i,graph);
//                 const f = Math.max(distAB,distBC,distCA);
//                 result = Math.max(result,f);
//             }
//         }
//     }
//     return result;
// }