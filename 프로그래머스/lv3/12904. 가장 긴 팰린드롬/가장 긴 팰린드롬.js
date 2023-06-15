function solution(s) {
    const n = s.length;
    const dp = Array.from(Array(n), () => Array(n).fill(false));
    // 팰린드롬의 최소 길이는 1
    let maxLength = 1; 

    // 모든 길이가 1인 부분문자열은 팰린드롬
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // 길이가 2인 부분문자열은 두 문자가 같을 경우에만 팰린드롬
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            maxLength = 2;
        }
    }

    // 길이가 3 이상인 부분문자열은 이전 부분문자열
    for (let len = 3; len <= n; len++) {
        for (let start = 0; start <= n - len; start++) {
            const end = start + len - 1;

            // 부분문자열의 양 끝 문자가 같고, 내부 문자열이 팰린드롬인 경우 팰린드롬입
            if (s[start] === s[end] && dp[start + 1][end - 1]) {
                dp[start][end] = true;
                maxLength = len; 
            }
        }
    }

    return maxLength;
}