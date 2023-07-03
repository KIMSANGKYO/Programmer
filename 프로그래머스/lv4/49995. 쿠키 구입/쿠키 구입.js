function solution(cookie) {
    const N = cookie.length;
    let result = 0;
    
    for (let m = 0; m < N - 1; m++) {
        let left = m; //첫째
        let right = m + 1; // 둘쨰
        let leftSum = cookie[left];
        let rightSum = cookie[right];
        
        while (true) {
            if (leftSum === rightSum) {
                result = Math.max(result, leftSum);
            }
            
            if (leftSum <= rightSum && left > 0) {
                leftSum += cookie[--left];
            } else if (leftSum >= rightSum && right < N - 1) {
                rightSum += cookie[++right];
            } else {
                break;
            }
        }
    }
    
    return result;
}