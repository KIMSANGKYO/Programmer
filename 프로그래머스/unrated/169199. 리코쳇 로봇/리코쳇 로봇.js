function solution(board) {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, 1, -1];
    
    // 행렬 구분 
    const N = board.length;
    const M = board[0].length;
    const queue = [];
    
    const ground = new Array(N).fill(null).map(() => new Array(M).fill(Number.MAX_SAFE_INTEGER));
    
    let isFind = false;
    
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === 'R') {
                queue.push([i, j, 0]);
                ground[i][j] = 0;
                isFind = true;
            }
        }
        if (isFind) {
            break;
        }
    }
    
    while (queue.length > 0) {
        const [x, y, ov] = queue.shift();
    
        if (board[x][y] === 'G') {
            return ov;
        }
        
        for (let i = 0; i < 4; i++) {
            let nx = x;
            let ny = y;
            
            while (nx + dx[i] >= 0 && nx + dx[i] < N && ny + dy[i] >= 0 && ny + dy[i] < M && board[nx + dx[i]][ny + dy[i]] !== 'D') {
                nx += dx[i];
                ny += dy[i];
            }
        
            if (ground[nx][ny] > ov + 1) {
                ground[nx][ny] = ov + 1;
                queue.push([nx, ny, ov + 1]);
            }
        }
    }    

    return -1;
}

