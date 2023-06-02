function bfs(graph,start){
    const queue = [start];
    const visited = new Array(graph.length+1).fill(false);
    const distances = new Array(graph.length+1).fill(0);
    let count = 0;
    
    queue.push(start);
    visited[start] = true;
    
    while(queue.length > 0){
        const node = queue.shift();
        
        for(let near of graph[node]){
            if(!visited[near]){
                queue.push(near);
                visited[near] = true;
                distances[near] = distances[node] + 1;
            }
        }
    }
    
    let maxDistance = Math.max(...distances);
    
    for(let distance of distances){
        if(distance === maxDistance){
            count ++;
        }
    }
    return count;
}

function solution(n,edge){
    const graph = Array.from({length:n+1},()=>[]);
    
    for(let [a,b] of edge){
        graph[a].push(b);
        graph[b].push(a);
    }
    return bfs(graph,1);
}