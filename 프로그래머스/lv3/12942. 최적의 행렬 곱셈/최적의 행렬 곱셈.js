function solution(matrix_sizes) {
    const len = matrix_sizes.length; // 행렬 개수
    // 2차원 배열 생성 (행렬)
    const dp = Array.from(Array(len),()=>Array(len).fill(0));
    // 행렬 개수에 따라 최소연산
    for(let i=2; i<=len; i++){
        for(let j=0; j<len-i+1; j++){
            const k = j+i-1;
            dp[j][k] = Infinity;
            // 행렬을 나누는 위치 기준 
            for(let l=j; l<k; l++){
                const cost = dp[j][l] + dp[l+1][k] + matrix_sizes[j][0] * matrix_sizes[l][1] * matrix_sizes[k][1];
                dp[j][k] = Math.min(dp[j][k],cost);
            }
        }
    }
    // 모든 행렬을 곱했을때
    return dp[0][len-1];
}