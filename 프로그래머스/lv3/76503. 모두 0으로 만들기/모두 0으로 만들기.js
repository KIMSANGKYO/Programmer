function solution(a, edges) {
    // 트리 노드 생성
    const len = a.length;
    const graph = Array.from({length:len},()=>[]);
    
    for(const [i,j] of edges){
        graph[i].push(j);
        graph[j].push(i);
    }
    
    // 방문배열
    const visited = new Array(len).fill(false);
    
    let result = 0n;
    // 스택 초기값 저장 
    const stack = [[0,-1]];
    
    while(stack.length){
        const [s,parent] = stack.pop();
        
        if(visited[s]){
            a[parent] += a[s];
            result += BigInt(Math.abs(a[s]));
            continue;
        }
        
        stack.push([s,parent]);
        visited[s] = true;
        
        for(const next of graph[s]){
            if(!visited[next]){
                stack.push([next,s]);
            }
        }
    }
    return a[0] ? -1 : result;
}