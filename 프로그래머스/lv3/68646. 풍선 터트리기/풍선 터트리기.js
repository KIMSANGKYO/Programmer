function solution(a) {
    // 작은 번호의 풍선은 전체중에 한번 >> 이 이벤트 발생시 나머지는 전부 큰 번호
    // 경우의 수  위 조건으로 안터지고 끝까지 갈 수 있는 경우의 수가 있는 풍선의 개수
    
    // 시작 , 끝 나눠서 탐색 필요 
    
    
//     const len = a.length;
//     // 시작부터 현재위치까지 최솟값 저장 
//     const startMin = new Array(len);
//     // 끝에서부터 현재위치까지 최솟값 저장 
//     const endMin = new Array(len);
    
//     // 최솟값 시작 
//     let min = a[0];
//     startMin[0] = min;
//     for(let i = 1; i<len; i++){
//         if(a[i] < min){
//             min = a[i];
//         }
//         startMin[i] = min;
//     }
    
//     // 최솟값 끝 
//     min = a[len-1];
//     endMin[len-1] = min;
//     // 감소식 맞추기 테스트 필요
//     for(let i = len-2; i>=0; i--){
//         if(a[i] < min){
//             endMin[i] = min;
//         }
//         endMin[i] = min;
//     }
    
//     // 다 통과해 살아남은 풍선 개수 
//     let count = 0;
    
//     for(let i=0; i<len; i++){
//         if(a[i] <= startMin[i] || a[i] <= endMin[i]){
//             count++; 
//         }
//     }
    
//     return count; 
    // ==== 일부 테스트 미통과 === //
    // 중복이 발생하는거 같아 new Array => Set 함수 활용 
    const len = a.length; 
    let start = a[0];
    let end = a[len-1];
    let startArr = [];
    let endArr = [];
    
    // 시작부분 탐색 
    for(let i = 1; i<len-1; i++){
        let now = a[i];
        // 현재 처리하는게 시작보다 작을때 시작부분 갱신
        if(now < start){
            start = now;
            startArr.push(now);
        }
    }
    // 끝부분 탐색
    for(let i = 1; i<len-1; i++){
        let now = a[len-i-1];
        if(now < end){
            end = now; 
            endArr.push(now);
        }
    }
    // 중복이 원인 맞다...
    // 처음과 끝은 더해주기 
    return [...new Set([...startArr, ...endArr])].length+2;
}