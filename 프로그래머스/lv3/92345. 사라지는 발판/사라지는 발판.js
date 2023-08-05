function solution(board, aloc, bloc) {
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];
    const n = board.length;
    const m = board[0].length;
    
    // 범위 체크
    function isValid(x, y) {
        return x < 0 || x >= n || y < 0 || y >= m;
    }

    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const block = Array.from({ length: n }, () => Array(m).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            block[i][j] = board[i][j];
        }
    }
    // 플레이어 좌표, 상대좌표
    function battle(curX, curY, opoX, opoY) {
        if (visited[curX][curY]) return 0;
        let result = 0;
        for (let i = 0; i < 4; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];
            if (isValid(nx, ny) || visited[nx][ny] || !block[nx][ny]) continue;
            
            visited[curX][curY] = true; 

            const cnt = battle(opoX, opoY, nx, ny) + 1;

            visited[curX][curY] = false;

            // 패배후 승리
            if (result % 2 === 0 && cnt % 2 === 1) result = cnt;
            // 패배후 패배
            else if (result % 2 === 0 && cnt % 2 === 0) result = Math.max(result, cnt); 
            // 승리후 승리
            else if (result % 2 === 1 && cnt % 2 === 1) result = Math.min(result, cnt);
        }
        return result;
    }

    return battle(aloc[0], aloc[1], bloc[0], bloc[1]);
}

