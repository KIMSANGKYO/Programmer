function gcd(w,h){
    // 나머지 
    let remain = w%h;
    // 나머지가 0 이면 h > 탈출조건
    if(remain ===0){
        return h;
    }
    //0 이 아닐땐 나머지 값을 이용해 재귀 
    return gcd(h,remain);
}

// 대각선 이 지나는 사각형 공식 
//  가로+세로-(가로,세로 최대공약수) 


function solution(w, h) {
  // 최대 공약수 구하기
    let remainResult = gcd(w,h);
    
    
    // 전체 개수 - 선이 지나는 사각형 개수
    return w*h-(w+h-remainResult)
}