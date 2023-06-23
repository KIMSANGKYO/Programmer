function solution(n, money) {
    // 동전의 조합 수 저장 배열 
    const dp = new Array(n+1).fill(0);
    dp[0] = 1;
    
    for(let i = 0; i < money.length; i++){
        for(let j = money[i]; j <= n; j++){
            dp[j] = (dp[j] + dp[j - money[i]]) % 1000000007;
        }
    }
    return dp[n];
}