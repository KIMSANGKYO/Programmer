function solution(ingredient) {
   // 1 빵 2 야채 3 고기 
    // 1231로 만든다 . 
    // 한번 만들면 남은 배열구조로도 만들수있다 
    
    // 만들수있는 햄버거 카운트 
    let result = 0 ; 
    for(let i=0; i<ingredient.length; i++){
        // 4개씩 자르고 문자열상태로 비교 
        if(ingredient.slice(i,i+4).join('')==='1231'){  
            // 같을때마다 카운트 추가 
            result++
            // 해당부분 배열에서 삭제시키기 
            ingredient.splice(i,4);
            // i 값을 리셋 시켜준다 . 
            // i 는 반복문으로 증가하므로 증가하는 1값 제외 3 을 빼서 리셋 
            i=i-3;
        }
    }
    return result;
}