function solution(n, count) {
    const board = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));
    const MOD = 1000000007;
    let cur = 0;
    
    board[1][1] = 1;
    
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            if (j === 1) {
                cur = board[i - 1][j] * (2 * (i - 1));
            } else if (j > 1 && j < i) {
                cur = board[i - 1][j] * (2 * (i - 1)) + board[i - 1][j - 1];
            } else {
                cur = board[i - 1][j - 1];
            }
            
            board[i][j] = cur % MOD;
        }
    }
    
    return board[n][count];
}


