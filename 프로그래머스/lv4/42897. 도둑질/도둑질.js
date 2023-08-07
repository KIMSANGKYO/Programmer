function solution(money) {
    const n = money.length;
    
    // 첫 번째 집을 털었을 때 최대 
    const dp1 = new Array(n).fill(0);
    // 털지 않았을 때의 최대 
    const dp2 = new Array(n).fill(0);
    
    // 털었을 때의 초기값 
    dp1[0] = money[0];
    dp1[1] = Math.max(money[0], money[1]);
    
    // 털지 않았을 때 초기값 
    dp2[0] = 0;
    dp2[1] = money[1];
    
    // 첫 번째 집을 털음
    for (let i = 2; i < n - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
    }
    
    // 첫 번째 집을 털지 안텀
    for (let i = 2; i < n; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
    }
    
    // 마지막 집을 안텀
    return Math.max(dp1[n - 2], dp2[n - 1]);
}