function solution(n) {
  const dp = new Array(100100).fill(0);
  const divide = 1000000007; 
  const prevValue = [0, 0, 0];
 

  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 3;
  dp[3] = 10;

  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] * 2 + dp[i - 3] * 5) % divide;
    prevValue[(i - 4) % 3] = (prevValue[(i - 4) % 3] + dp[i - 4]) % divide;
    dp[i] = (dp[i] + (prevValue[0] + prevValue[1] + prevValue[2]) * 2 % divide + prevValue[i % 3] * 2) % divide;
  }

  const result = dp[n];
  return result;
}
