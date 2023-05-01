function solution(A, B) { 
    // 내림차순으로 큰 순서대로 붙여야 낭비가 없다 
    // B배열의 값이 더 큰 경우를 센다 
    let count = 0;
    
    A.sort((a,b)=>b-a);
    B.sort((a,b)=>b-a);
   // 비교를 위해 A를 반복문으로 돌리고 B는 인덱스 활용 
    let k = 0;
    
    for(let i=0; i<A.length; i++){
        if(A[i]<B[k]){
            count++;
            k++;
        }
    }
    return count;
}

