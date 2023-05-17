function solution(k, tangerine) {
    // 귤을 판매할떄 k의 개수에 맞추기위한 최소 귤 크기 종류 개수 
    // 객체 형태로 크기별로 개수 확인 
    const tanObj = {};
    
    // 같은종 개수 확인 
    tangerine.forEach((tan)=>{
        // 키가 생성되어있을때 
        if(tanObj[tan]){
            tanObj[tan] = ++tanObj[tan]
            // 키가 없을때 1부여
        }else if(!tanObj[tan]){
            tanObj[tan] = 1
        }
    })
    
    // 개수가 큰 값으로 정렬 
    // 키값만 뽑아야함
    const sorted = Object.values(tanObj).sort((a,b)=>b-a);
    console.log(sorted)
    let result = 0; 
    // 개수가 담긴 배열 선회해서 k 와 비교할 개수 맞추기
    for(let i=0; i<sorted.length; i++){
        result += sorted[i];
        // k 값과 같거나 k 값보다 더 커졌을때의 i 
        if(result >= k){
            return i+1
        }
    }
}