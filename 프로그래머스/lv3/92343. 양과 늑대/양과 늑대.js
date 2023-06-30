function solution(info, edges) {
    // 항상 현재늑대보다 양이 더 많은 쪽으로 이동 후
    // 만약 자식노드에 위 조건이 만족못하면 부모노드로 다시이동후 다른 형제노드로  
    let sheeps = 1;
    const nodeCount = info.length;
    // 자식노드 저장 배열 
    const graph = Array.from({length : nodeCount},()=>[]);
    
    // 그래프에 각 노드 번호 순서대로 자식노드 정리
    for(let i=0; i<edges.length; i++){
        const [start,end] = edges[i];
        
        graph[start].push(end);
    }
    
    // 현재노드, 다음 노드 
    function dfs(cur,next){
        let [curNode,sheep,wolves] = cur;
        let nextNodes = [...next];
        let index = nextNodes.indexOf(curNode);
        
        sheep += !info[curNode];
        wolves += info[curNode];
        sheeps = Math.max(sheeps, sheep);
        // 양의수랑 같아지면안되므로 다른노드로 이동
        if(sheep === wolves){
            return;
        }
        
        if(graph[curNode].length){
            nextNodes.push(...graph[curNode]);
        }
        
        nextNodes.splice(index,1);
        
        // 노드 갱신 재귀
        for(const nextNode of nextNodes){
            dfs([nextNode,sheep,wolves],nextNodes);
        }
    }
    
    dfs([0,0,0],[0]);
    
    return sheeps;
}
// 0 이 항상 시작노드 
//       0 
//   1       8  
// 2   4   7   9
//    3 6     10 11
//      5