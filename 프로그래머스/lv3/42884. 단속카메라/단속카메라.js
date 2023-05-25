function solution(routes) {
    // 겹치는 구간이 있는 차량끼리 묶어서 그묶음의 개수를 세면 된다.
    // 진입시점 기준 정렬
    routes.sort((a,b)=>a[0]-b[0]);
    // 차량은 한대 이상이므로 카메라 기본값 1 
    let count = 1;
    // 나가는 위치 갱신 변수
    let exit = routes[0][1];
    
    // 순차적으로 앞의 나간시점 뒤의 출발시점 비교 
    for(let i = 1; i<routes.length; i++){
        if(exit<routes[i][0]){
            count++;
            exit = routes[i][1];
        }
        // 다음 차량 출발시점 비교
        if(exit > routes[i][1]){
            exit = routes[i][1];
        }
    }
    return count;
}