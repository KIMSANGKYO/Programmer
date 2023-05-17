function solution(n, s) {
    // n 개의 자연수를 더했을때 s 가 나오는 경우의 수 중 그 곱이 가장 큰 경우를 리턴
    
    // 예외처리
    if(s<n){
        return [-1];
    }
    
    // 몫과 나머지
    let devideValue = Math.floor(s/n);
    let reminder = s%n;
    
    let result = [];
    
    for(let i=0; i<n; i++){
        if(i<n-reminder){
            result.push(devideValue);
        // 나누어 떨어지지 않았을때 경우 
        // 나머지를 고려해야할때 
        }else{
            result.push(devideValue+1);
        }
    }
    return result;
}