function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;

    
    const visited = Array.from(Array(n), () => Array(m).fill(false));
    
    // 남북
    const dx = [0, 0, 1, -1];
    // 동서 
    const dy = [1, -1, 0, 0];
    
    
    const queue = [];
    queue.push([0, 0, 1]);
    visited[0][0] = true; 
    
    while (queue.length > 0) {
        const [x, y, distance] = queue.shift();

   
        if (x === n - 1 && y === m - 1) {
            return distance;
        }


        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];


            if (nx < 0 || nx >= n || ny < 0 || ny >= m || maps[nx][ny] === 0) {
                continue;
            }


            if (!visited[nx][ny]) {
                queue.push([nx, ny, distance + 1]);
                visited[nx][ny] = true;
            }
        }
    }

    return -1;
}