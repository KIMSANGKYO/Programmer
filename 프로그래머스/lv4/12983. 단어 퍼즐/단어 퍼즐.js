function solution(strs, t) {
    // 캐시 저장
    const cache = {};
    const INF = 987654321; // 불가능한 경우 상정 
    
    // 런타임 에러 방지 dp 배열 생성
    const len = t.length;
    const dp = new Array(len).fill(INF);
    
    // 마지막 문자부터 역탐색
    for(let i=len-1; i>=0; i--){
        // 완성 가능한 단어 조각 탐색
        for(let j=0; j<strs.length; j++){
            const word = strs[j];
            const wordLen = word.length;
            
            // 문자열 완성 가능 여부 
            if(t.substr(i,wordLen)===word){
                // 마지막단어 도달시
                if(i+wordLen >= len){
                    dp[i] = 1;
                }else{
                    dp[i] = Math.min(dp[i],dp[i+wordLen]+1);
                }
            }
        }
    }

    return dp[0] === INF ? -1 : dp[0];
}