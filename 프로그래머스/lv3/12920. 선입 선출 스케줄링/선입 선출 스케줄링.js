function solution(n, cores) {
    // 작업 수가 코어길이 보다 작을때
    if(n<=cores.length){
        return n;
    }else{
        n-=cores.length;
        let left = 1; 
        // 끝 자리는 작업 수와 코어 최댓값의 곱
        let right = Math.max(...cores) * n
        
        while(left<right){
            let mid = Math.floor((left+right)/2);
            let cap = 0;
            
            for(let core of cores){
                cap += Math.floor(mid/core);
            }
            // 이분 탑색
            if(cap >= n){
                right = mid;
            }else{
                left = mid +1;
            }
        }
        
        for(let core of cores){
            n -= Math.floor((right-1)/core);
        }
        
        for(let i=0; i<cores.length; i++){
            if(right % cores[i]===0){
                n--;
                if(n===0){
                    return i+1;
                }
            }
        }
    }
    
} 
