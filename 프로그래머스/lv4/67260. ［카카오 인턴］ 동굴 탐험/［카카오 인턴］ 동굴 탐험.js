function solution(n, path, order) {
    // 인접 정보 배열 생성
    const tree = Array.from({length:n},()=>[]);
    for(const [p1,p2] of path){
        tree[p1].push(p2);
        tree[p2].push(p1);
    }
    
    const prevNode = Array.from({length:n},()=>0);
    for(const [pre,post] of order){
        prevNode[post] = pre;
        // 이전에 방문해야되는 노드 
    }
    
    let visitCnt = 0;
    const visited = Array.from({length:n},()=>false);
    const queue = [0];
    
    // 다음 방문 노드 
    const next = {};
    
    while(queue.length > 0){
        const current = queue.shift();
        
        if(prevNode[current] && !visited[prevNode[current]]){
            next[prevNode[current]] = current;
            continue;
        }
        
        visited[current] = true;
        visitCnt += 1; 
        
        for(const point of tree[current]){
            if(!visited[point]){
                queue.push(point);
            }
        }
        // 현재 방문 위치가 next 에 포함되면 현 위치에서 갈 수 있는 이동 가능 정점 
        if(current in next){
            queue.push(next[current]);
        }
    }
    // 방개수가 방문횟수랑 같은지 불린 리턴
    return n === visitCnt;
}



// function solution(n, path, order) {
//   const graph = createGraph(n, path);
//   const orderGraph = createOrderGraph(order);
//   const visited = new Set();
//   const stack = [0]; // 시작은 0번 방부터

//   while (stack.length > 0) {
//     const room = stack.pop();

//     if (!visited.has(room)) {
//       visited.add(room);

//       if (orderGraph.has(room) && !visited.has(orderGraph.get(room))) {
//         stack.push(room); // 먼저 방문해야 할 방이 방문되지 않은 경우 방문을 연기
//         continue;
//       }

//       const neighbors = graph.get(room);

//       for (const neighbor of neighbors) {
//         stack.push(neighbor);
//       }
//     }
//   }

//   return visited.size === n;
// }

// // 그래프 생성 함수
// function createGraph(n, path) {
//   const graph = new Map();

//   for (let i = 0; i < n; i++) {
//     graph.set(i, new Set());
//   }

//   for (const [a, b] of path) {
//     graph.get(a).add(b);
//     graph.get(b).add(a);
//   }

//   return graph;
// }

// // 방문 순서 그래프 
// function createOrderGraph(order) {
//   const graph = new Map();

//   for (const [a, b] of order) {
//     graph.set(a, b);
//   }

//   return graph;
// }