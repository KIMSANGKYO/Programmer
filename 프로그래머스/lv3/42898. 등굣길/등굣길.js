function solution(m, n, puddles) {
    const MOD = 1000000007;

    const dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0));
    dp[1][1] = 1; // 초기 위치 

    puddles = puddles.map(([p, q]) => [q, p]);
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (i === 1 && j === 1) continue;
            if (puddles.some(([x, y]) => x === i && y === j)) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
    }

    return dp[n][m];
}



