function solution(N, number) {
    const MAX_COUNT = 8;
    // 중복제거 
    // dp 모든 조합 사칙연산 
    const dp = new Array(MAX_COUNT + 1).fill().map(() => new Set());

    for (let i = 1; i <= MAX_COUNT; i++) {
        const repeatedN = parseInt(String(N).repeat(i));
        if (repeatedN === number) {
            return i;
        }
        dp[i].add(repeatedN);

        for (let j = 1; j < i; j++) {
            for (const arg1 of dp[j]) {
                for (const arg2 of dp[i - j]) {
                    dp[i].add(arg1 + arg2);
                    dp[i].add(arg1 - arg2);
                    dp[i].add(arg1 * arg2);
                    if (arg2 !== 0) {
                        dp[i].add(Math.floor(arg1 / arg2));
                    }
                }
            }
        }
    }

    for (let i = 1; i <= MAX_COUNT; i++) {
        if (dp[i].has(number)) {
            return i;
        }
    }

    return -1;
}