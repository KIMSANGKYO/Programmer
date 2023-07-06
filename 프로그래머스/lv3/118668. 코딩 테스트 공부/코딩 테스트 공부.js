function solution(alp, cop, problems) {
    let maxAlp = 0;
    let maxCop = 0;
    let time = 0;
    
    // 문제들에서 최대 알고력 코딩력 찾기/
    for(let [a,b,c,d,e] of problems){
        maxAlp = Math.max(maxAlp,a);
        maxCop = Math.max(maxCop,b);
        time += e;
    }
    
    // 현값 , 최댓값중 작은값 >> 목표 알고,코딩
    alp = Math.min(alp, maxAlp);
    cop = Math.min(cop, maxCop);
    
    const INF = Number.POSITIVE_INFINITY;
    
    // 2차원 배열
    const dp = new Array(maxAlp + 1);
    
    for(let i=0; i<= maxAlp; i++){
        dp[i] = new Array(maxCop+1).fill(INF);
    }
    // 초기설정
    dp[alp][cop] = 0;
    
    for(let i=alp; i<=maxAlp; i++){
        for(let j=cop; j<=maxCop; j++){
            // 현 알고력,코딩력에서 1증가 상태
            if(i+1 <= maxAlp){
                dp[i+1][j] = Math.min(dp[i+1][j], dp[i][j]+1);
            }if(j+1 <= maxCop){
                dp[i][j+1] = Math.min(dp[i][j+1], dp[i][j]+1);
            }
            
            // 문제 순회 알고력 코딩력 갱신
            for(let [alpReq,copReq,alpRwd,copRwd,cost] of problems){
                if(i>=alpReq && j>=copReq){
                    const nextAlp = Math.min(maxAlp,i+alpRwd);
                    const nextCop = Math.min(maxCop,j+copRwd);
                    // 순회 다음 알고력,코딩력 계산 값+비용 중 작은값
                    dp[nextAlp][nextCop] = Math.min(dp[nextAlp][nextCop],dp[i][j]+cost);
                }
            }
        }
    }
    return dp[maxAlp][maxCop];
}