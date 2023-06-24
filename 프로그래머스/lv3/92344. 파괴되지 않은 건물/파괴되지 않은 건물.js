function solution(board, skill) {
    const N = board.length;
    const M = board[0].length;
    
    // 건물 내구도 변경을 기록하는 배열
    const skillBoard = Array(N).fill().map(() => Array(M).fill(0));
    
    // 스킬 적용 범위를 기록
    for (const s of skill) {
        const type = s[0];
        const r1 = s[1];
        const c1 = s[2];
        const r2 = s[3];
        const c2 = s[4];
        const degree = s[5];
        
        if (type === 1) { // 적의 공격
            skillBoard[r1][c1] -= degree;
            if (r2 + 1 < N && c2 + 1 < M) {
                skillBoard[r2 + 1][c2 + 1] -= degree;
            }
            if (c2 + 1 < M) {
                skillBoard[r1][c2 + 1] += degree;
            }
            if (r2 + 1 < N) {
                skillBoard[r2 + 1][c1] += degree;
            }
        } else if (type === 2) { // 아군의 회복 스킬
            skillBoard[r1][c1] += degree;
            if (r2 + 1 < N && c2 + 1 < M) {
                skillBoard[r2 + 1][c2 + 1] += degree;
            }
            if (c2 + 1 < M) {
                skillBoard[r1][c2 + 1] -= degree;
            }
            if (r2 + 1 < N) {
                skillBoard[r2 + 1][c1] -= degree;
            }
        }
    }
    
    // 건물 내구도 변경
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (i > 0) {
                skillBoard[i][j] += skillBoard[i - 1][j];
            }
            if (j > 0) {
                skillBoard[i][j] += skillBoard[i][j - 1];
            }
            if (i > 0 && j > 0) {
                skillBoard[i][j] -= skillBoard[i - 1][j - 1];
            }
            board[i][j] += skillBoard[i][j];
        }
    }
    
    // 건물 내구도가 0보다 큰 값의 개수 세기
    let count = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] > 0) {
                count++;
            }
        }
    }
    
    return count;
}