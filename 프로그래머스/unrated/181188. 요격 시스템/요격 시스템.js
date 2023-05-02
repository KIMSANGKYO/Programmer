function solution(targets) {
   // 모든 미사일을 요격하기 위해 필요한 요격미사일 최솟값 
    // 타겟의 x 가 큰 값부터 >> 내림차순
    targets.sort((a,b)=>b[0]-a[0])
    console.log(targets)
    // 미사일이 더 필요해지는 지점 지정
    // 첫번째는 무조건 필요하므로 지정 
    let point = targets[0][0]
    // 요격 미사일 개수 
    let count = 1;
    // 다음 요격 미사일을 위한 순회 
    for(let i = 1; i<targets.length; i++){
        let [start,end] = targets[i];
    // 겹치는 부분이 없을 경우 카운트 추가 및 시작지점 바꾸기
        // 끝지점과 시작지점이 겹쳐도 다른 범위이므로 등호 
        if(end <= point){
            count ++ 
            point = start;
        }
    }
    return count 
}