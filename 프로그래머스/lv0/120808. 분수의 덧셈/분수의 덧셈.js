function solution(numer1, denom1, numer2, denom2) {
  // numer1/denom1 + numer2/denom2 
    // 위 값을 기약 분수로 
    // 분모를 통일 
    const numer = numer1*denom2 + numer2*denom1
    const denom = denom1*denom2
    
    // 최대공약수로 분자 분모 나누기 
    // 최대한 큰 값에서 멈추게 반복 
    // 분모의 수보다 작은 값에서 동시에 나머지가 0인 부분에서 저장 
    
    // 나눌 값 저장변수
    let devide = 0; 
    for(let i=1; i<=denom; i++){
        if(numer%i===0 && denom%i===0){
            devide = i;
        }
    }
    return [numer/devide, denom/devide]
}