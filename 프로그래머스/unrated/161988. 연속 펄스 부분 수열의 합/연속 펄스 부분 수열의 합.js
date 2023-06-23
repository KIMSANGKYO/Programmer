function solution(sequence) {
    // sequence 배열에 펄수 수열을 곱하여 연속 펄스 부분 수열 합 중 가장 큰값 
    
    // 필요 함수 로직
    // 1. pulse 수열 생성 
    // 2. 두 배열 곱셈 처리  
    // 3. 배열의 합 
    
    
    const len = sequence.length;
    
    const dp = new Array(len);
    // 최댓값 저장 // 비교를 위해 제일 낮은 값 입력필요
    let maxSum = Number.MIN_SAFE_INTEGER;
    
    for(let i = 0; i < len; i++){
        dp[i] = new Array(2).fill(0);
    }
    
    dp[0][0] = sequence[0];
    dp[0][1] = -sequence[0];
    maxSum = Math.max(maxSum, dp[0][0], dp[0][1]);
    
    // 현재 요소 더할때, 뺼때 
    
    for(let i = 1; i < len; i++){
        dp[i][0] = Math.max(sequence[i], dp[i-1][1] + sequence[i]);
        dp[i][1] = Math.max(-sequence[i], dp[i-1][0] - sequence[i]);
        maxSum = Math.max(maxSum, dp[i][0], dp[i][1]);
    }
    
    return maxSum;
}