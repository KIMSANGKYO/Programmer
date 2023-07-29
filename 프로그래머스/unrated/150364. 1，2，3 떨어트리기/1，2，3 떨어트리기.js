function solution(edges, target) {
    const N = edges.length + 1;
    let tree = 0;
    const board = Array.from({ length: N }, () => []);
    const count = Array(N).fill(0);

    for (const edge of edges) {
        const [a, b] = edge;
        board[a - 1].push(b - 1);
    }

    for (let i = 0; i < N; i++) {
        board[i].sort((a, b) => a - b);
    } 
    
    for (let i = 0; i < N; i++) {
        if (board[i].length === 0 && target[i]) {
            tree++;
        }
    }

    const queue = [];
    const line = Array(N).fill(0);
    const nodq = Array(N).fill(0);
    
    while (tree) {
        let cur = 0;
        while (board[cur].length) {
            cur = board[cur][nodq[cur]++ % board[cur].length];
        }
        count[cur]++;
        queue.push(cur);

        if (count[cur] > target[cur]) {
            return [-1];
        }
        if (!line[cur] && target[cur] <= 3 * count[cur]) {
            line[cur] = 1;
            tree--;
        }
    }

    const result = [];
    for (const q of queue) {
        count[q]--;
        for (const num of [1, 2, 3]) {
            if (count[q] <= target[q] - num && target[q] - num <= 3 * count[q]) {
                result.push(num);
                target[q] -= num;
                break;
            }
        }
    }
    return result;
}