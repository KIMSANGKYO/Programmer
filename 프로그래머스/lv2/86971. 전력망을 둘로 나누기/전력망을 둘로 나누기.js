function solution(n, wires) {
    const graph = createGraph(n, wires);
    let minDiff = Infinity;

    for (let i = 0; i < wires.length; i++) {
        const [v1, v2] = wires[i];
        const count1 = countNodes(graph, v1, v2); 
        const count2 = n - count1; 
        const diff = Math.abs(count1 - count2); 
        minDiff = Math.min(minDiff, diff); 
    }

    return minDiff;
}


function createGraph(n, wires) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < wires.length; i++) {
        const [v1, v2] = wires[i];
        graph[v1].push(v2);
        graph[v2].push(v1);
    }

    return graph;
}


function countNodes(graph, start, ban) {
    let count = 1;
    const stack = [start];
    const visited = new Set();
    visited.add(start);

    while (stack.length > 0) {
        const node = stack.pop();

        for (let i = 0; i < graph[node].length; i++) {
             const next = graph[node][i];

            if (next === ban || visited.has(next)) {
                continue;
            }

            stack.push(next);
            visited.add(next);
            count++;
        }
    }

    return count;
}