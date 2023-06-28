function solution(scores) {
    // 점수 저장
    // 자신 점수 제외 나머지 점수 순회 
    
    let myScore = scores[0][0];
    let myEval = scores[0][1];
    let rank = 1;
    
    // 점수 정렬 
    // 점수 내림, 평가오름
    scores.sort((a,b)=>{
        if(a[0] !== b[0]){
            return b[0]-a[0];
        }else{
            return a[1]-b[1]
        }
    })
    
    let prev = 0;
    
    // 순위 계산 
    
    for(const score of scores){
        // 원호 점수가 사원보다 낮을때 
        if(myScore < score[0] && myEval < score[1]){
            return -1;
        }
        // 인센있을때 순위변동
        if(prev <= score[1]){
            // 순위 낮추기 
            if(myScore + myEval < score[0] + score[1]){
                rank++;
            }
            // 갱신
            prev = score[1];
        }
    }
        
    return rank;
}
