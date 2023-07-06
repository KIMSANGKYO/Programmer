// 다트 갯수와 싱글점수 갯수
function Count(dartCnt,singleCnt){
    return {
        dartCnt:dartCnt,
        singleCnt:singleCnt
    };
}

// 점수 타입,총점수 객체 생성
function Point(point,type){
    return {
        point : point,
        type : type,
        totalPoint: point * type,
    };
}
// 점수 비교 함수 
function compare(pointA,pointB){
    // 총점수가 같을때 타입비교
    if(pointA.totalPoint === pointB.totalPoint){
        return pointA.type - pointB.type;
    }else{
        // 총점수로 비교
        return pointA.point * pointA.type - pointB.point * pointB.type;
    }
}

function solution(target) {
    let list = [];
    for(let i=1; i<=20; i++){
        list.push(Point(i,1)); // 싱글
        list.push(Point(i,2)); // 더블
        list.push(Point(i,3)); // 트리플
    }
    list.push(Point(50,1)); // 불 => 싱글타입
    list.sort(compare); // 정렬방식
    
    let dy = [];
    for(let i=0; i<=target; i++){
        dy.push(Count(Number.MAX_SAFE_INTEGER,0));
    }
    dy[0] = Count(0,0);
    
    list.forEach(function (p){
        for(let i = p.totalPoint; i<=target; i++){
            let baseCount = dy[i-p.totalPoint];
            let nextCount = baseCount.dartCnt +1;
            let nextSingleCount = baseCount.singleCnt + (p.type === 1 ? 1 : 0);
            
            let currentCount = dy[i];
            
            if(nextCount < currentCount.dartCnt || (nextCount === currentCount.dartCnt && currentCount.singleCnt < nextSingleCount)){
                dy[i] = Count(nextCount,nextSingleCount);
            }
        }
    })
    
    return [dy[target].dartCnt, dy[target].singleCnt]
}