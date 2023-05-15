function solution(gems) {
   // 모든 종류의 보석을 구매하는 최소 범위 >> index+1 
    // 범위가 같은 경우가 나올땐 시작 번호가 작은쪽 
    // 다른종류의 보석이 모두 담겼을때를 범위가 가장작은것을 리턴하면될듯? 
    
    // 중복 제거 
    // const gemCount = new Set(gems).size;
    // console.log(gemCount)
    // for(let i=0; i<gems.length; i++){
    //     for(let j=0; j<=gems.length-gemCount-i; j++){
    //         let left = j;
    //         let right = j + gemCount + i ;
    //         // 순회해서 모든 종류 보석이 있는 크기와 같을때 그 범위 리턴 
    //         if(new Set(gems.slice(left,right)).size === gemCount){
    //             return [left+1,right];
    //         }
    //     }
    // }
    
    //====  시간복잡도 걸림 이중 for문 사용 =========
    
    
    // 범위를 순회하여 얻은 보석들을 객체에 키값으로 저장하는 방식 ...
    const gemCount = new Set(gems).size;
    const gemMap = new Map();
    
    let result = [0,gems.length-1];
    let left = 0;
    let right = 0;
    
    while(right<gems.length){
        if(gemMap.has(gems[right])){
            gemMap.set(gems[right],gemMap.get(gems[right])+1);
        }else{
            gemMap.set(gems[right],1);
        }
        while(gemMap.size === gemCount){
            if(right - left < result[1]-result[0]){
                result = [left,right];
            }
            gemMap.set(gems[left],gemMap.get(gems[left])-1);
            if(gemMap.get(gems[left])===0){
                gemMap.delete(gems[left]);
            }
            left++;
        }
        right++;
    }
    console.log(gemMap)
    return [result[0]+1,result[1]+1];
}