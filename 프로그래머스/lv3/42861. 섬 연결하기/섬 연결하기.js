function finder(n, ground) {
    // n 과 동일할때 n 값을 그냥 뱉고
    if(ground[n]===n){
        return n;
    }
    // 재귀를 통해 순환 탐색
    return ground[n] = finder(ground[n], ground);
}


function solution(n, costs) {
    // 배열 안에 다리 번호 2개, 비용
    // 일자 연결이 베스트
    
    let result = 0;
    let ground = new Array(n).fill(0).map((_,i)=>i);
    // 작은 비용순으로 정렬 
    costs.sort((a,b)=>a[2]-b[2]);
    
    for(let i = 0; i < costs.length; i++){
        let start = finder(costs[i][0], ground);
        let end = finder(costs[i][1], ground);
        let cost = costs[i][2];
        
        // 체크 완료된 다리 비용 추가 및 시작점 갱신
        if(start !== end){
            result += cost;
            ground[start] = end;
        }
    }
    return result;
}