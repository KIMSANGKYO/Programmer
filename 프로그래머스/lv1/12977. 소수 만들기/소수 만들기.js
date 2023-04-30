 // 소수는 1과 소수로만 나누어떨어진다 
function prime(sum){
    for(let i = 2; i<sum; i++){
        if(sum%i===0){
            return false;
        }
    }
    return true;
}


function solution(nums) {
  // 3개의 값을 더하는 작업 
    let result = 0;
    for(let i=0; i<nums.length; i++){
        for(let j = i +1; j<nums.length; j++){
            for(let k = j+1; k<nums.length; k++){
                let sum = nums[i] + nums[j] +nums[k];
                if(prime(sum)){
                    result ++;
                }
            }
        }
    }
    return result;
}