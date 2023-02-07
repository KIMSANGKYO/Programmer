function solution(s) {
   //문자열을 담아줄 배열 
    let arr = [];
    // 다른 글자가 나온 횟수 
    let count = 0;
    
    for(let i=0; i<s.length; i++){
        arr.push(s[i]);
        
        //기존 글자와 같은 배열 // 같지않는 배열 
        // 이 두 개 배열은 arr 에서 파생 
        const equal = arr.filter((e)=>e===arr[0]);
        const unequal = arr.filter((e)=>e!==arr[0]);
        // 둘의 길이가 같은 경우 count 증가 
        // 기존 arr 에 생성한 값은 이 조건에서 실행 후 지워준다.
        if(equal.length === unequal.length){
            count ++;
            arr = [];
        }
    }
    // 배열 자체에 값이 남아있다면 아직 처리안됨 === 카운트 증가 
    if(arr.length!==0){
        count++
    }
    return count;
    
    
}