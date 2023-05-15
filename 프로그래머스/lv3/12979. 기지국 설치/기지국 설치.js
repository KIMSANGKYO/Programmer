function solution(n, stations, w) {
    // 아파트 개수, 현재 기지국 위치, 전파 거리 
    // 출력 : 모든 아파트에 전파터지게 추가 배치할 기지국 최소개수
    
    // 왼쪽부터 w 의 범위로 탐색 후 left 값 증가 
    let result = 0; 
    let left = 1;
    // stations 의 요소도 순회해서 포인트 찾아야하므로 > 인덱스로 순회
    let station = 0; 
    
    // 모든 아파트 위치를 순회
    while(left<=n){
        // 설치 안해도 되는 범위
        if(left>=stations[station]-w && left<=stations[station]+w){
            // w 범위가 떨어지는 부분부터 탐색 
            left = stations[station] + w;
            station++;
        }else{
            // 설치해야될때 left 값 갱신 필요 w 범위 두번 뛰기 
            left = left + w + w ;
            result++;
        }
        left++;
    }
    return result;
}