function solution(land, height) {
    const n = land.length;
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];

    function find(parent, x) {
        if (parent[x] !== x) {
            parent[x] = find(parent, parent[x]);
        }
        return parent[x];
    }

    function union(parent, rank, x, y) {
        const rootX = find(parent, x);
        const rootY = find(parent, y);

        if (rootX !== rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootX] = rootY;
                if (rank[rootX] === rank[rootY]) {
                    rank[rootY]++;
                }
            }
        }
    }

    const edges = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const currentIdx = i * n + j;
            for (let k = 0; k < 4; k++) {
                const nx = i + dx[k];
                const ny = j + dy[k];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
                    const nextIdx = nx * n + ny;
                    const cost = Math.abs(land[i][j] - land[nx][ny]);
                    edges.push([currentIdx, nextIdx, cost]);
                }
            }
        }
    }

    edges.sort((a, b) => a[2] - b[2]);

    const parent = Array.from({ length: n * n }, (_, index) => index);
    const rank = Array.from({ length: n * n }, () => 1);

    let answer = 0;
    for (const edge of edges) {
        const [u, v, cost] = edge;
        if (find(parent, u) !== find(parent, v)) {
            union(parent, rank, u, v);
            answer += cost <= height ? 0 : cost;
        }
    }

    return answer;
}
