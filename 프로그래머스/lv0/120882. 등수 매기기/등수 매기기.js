function solution(score) {
    // 두 점수를 배열로 받아 평균값 높은 순서대로 숫자 매기기 
    // 평균 점수가 같으면 같은 등수로 넣어야한다. >> 겹치는 등수는 요소를 내림차순 정렬하면 먼저 발견되는 요소나 나중 요소나 같은 (인덱스값찾기)
    // 이후 등수는 같은 등수를 다 카운트하고 정해지므로 위 로직에서 인덱스찾기로 끝날것같다.
    
    // 평균점수 먼저 구하자 
    // 배열 안에 배열을 순회하며 평균 값을 구해야함   >> map 을 통한 순회로도 구할 수 있을 것 같다
    let average=[];
    for(let i=0; i<score.length; i++){
        average.push((score[i][0]+score[i][1])/2)
    }
    // 평균 값을 배열에 담은 상태 
    // 내림차순으로 정렬한 배열
    // sort 는 원래배열을 바꾸므로 복사본을 만들어준다.
    let downsort = average.slice().sort((a,b)=>b-a);    
    // 내림차순한 평균값에서 원래 무작위로 정렬된 평균값의 위치를 찾는다
    // 등수를 구하므로 인덱스 + 1
    return average.map((v)=>downsort.indexOf(v)+1);
}
