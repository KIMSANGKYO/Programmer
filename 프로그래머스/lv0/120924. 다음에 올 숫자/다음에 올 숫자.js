function solution(common) {
   // 공차인지 공비인지 
    //공차라면 첫번째요소 두번쨰요소의 차이와 두번쨰요소의 차이가 같다 
    let result = common[common.length-1]
    if((common[1]-common[0])===(common[2]-common[1])){
            result =  result + common[1]-common[0];
        }
    if((common[1]/common[0])===(common[2]/common[1])){
            result = result * (common[1]/common[0]);
        }
       return result;
    }

