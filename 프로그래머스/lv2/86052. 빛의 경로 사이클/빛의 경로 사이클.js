function solution(grid) {
    const result = [];
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];

    const M = grid.length;
    const N = grid[0].length;

    const visited = new Array(M).fill(null).map(() => 
        new Array(N).fill(null).map(() => new Array(4).fill(false))
    );

    // (y,x)
    for (let y = 0; y < M; y++) {
        for (let x = 0; x < N; x++) {
            for (let d = 0; d < 4; d++) {
                if (visited[y][x][d]) {
                    continue;
                }

                let count = 0;
                let ny = y, nx = x;
                
                while (!visited[ny][nx][d]) {
                    visited[ny][nx][d] = true;
                    count++;

                    if (grid[ny][nx] === "S") {
                    } else if (grid[ny][nx] === "L") {
                        d = (d - 1 + 4) % 4;
                    } else if (grid[ny][nx] === "R") {
                        d = (d + 1) % 4;
                    }

                    // 격자 벗어남
                    ny = (ny + dy[d] + M) % M;
                    nx = (nx + dx[d] + N) % N;
                }

                result.push(count);
            }
        }
    }

    result.sort((a, b) => a - b); 
    return result;
}