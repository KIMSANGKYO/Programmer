function solution(n) {
    // 결과의 첫번째와 마지막은 무조건 각각(,) ;
    
    // 모든 경우의 수 
    const result = [];
    
    function gen(left,right,current){
        // 왼쪽, 오른쪽 괄호 개수가 모두 0이면 올바름
        if(left === 0 && right === 0){
            result.push(current);
            return;
        }
        
        if(left>0){
            gen(left-1,right,current+'(');
        }
        
        if(right > left){
            gen(left,right-1,current+')')
        }
    }
    
    gen(n,n,'');
    
    return result.length;
}