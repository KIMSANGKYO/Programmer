function solution(dirs) {
    // 지나간 선분인지 아닌지는 시작점과 끝점을 잇는 선으로 판단 
    // 시작점과 끝점에 대한 좌표 필요 >> 순서부여 >> 좌상부터 
    
    let result = 0; 
    
    // 좌표 이동 문자열 
    const moving = {
        "U" : [0,1],
        "D" : [0,-1],
        "R" : [1,0],
        "L" : [-1,0]
    }
    // 지나간 좌표 목록 >> 선분 판별 
    let visitedLocation = [];
    
    // 변하는 위치
    let location = [0,0];
    
    
    
    for(let i=0; i<dirs.length; i++){
        // moving 에서 불려올 이동값
        const moveValue = moving[dirs[i]];
        // 이동한 좌표 
        const moveResult =[location[0]+moveValue[0],location[1]+moveValue[1]];
        
        // 좌표를 넘어가는 경우 
        if(moveResult[0]>5 || moveResult[0] <-5 || moveResult[1]>5 ||moveResult[1]<-5){
            continue;
        }
        
        
        // 지나갔는지 판별을 위한 좌표값 이동전좌표,이동후좌표 (숫자열)
        // 좌상부터 내려오므로 x 값은 그냥 더하고 y 값은 11 곱
        const start = (5+location[0]) + (5-location[1])*11;
        const end = (5+moveResult[0]) + (5-moveResult[1])*11;
  // 판별을 위한 저장끝 > 위치좌표 갱신
        location = moveResult
        
        // 판별 시작
        // 시작과 끝 양쪽을 바꾼 경우도 상정
        const isVisited = visitedLocation.find((el)=>{
            if((el[0]===start && el[1]===end)){
                return true;
            }else if((el[1]===start&&el[0]===end)){
                return true;
            }else false;
        }) 
        
        // 지나간 선분이 아니라면 카운팅하고 배열에 넣기
        if(!isVisited ){
            result++
            visitedLocation.push([start,end]);
        }
    }
    return result
}