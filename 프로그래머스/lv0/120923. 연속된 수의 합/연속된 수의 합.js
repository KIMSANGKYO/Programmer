function solution(num, total) {
   let start = 0 ;
    let arrSum = new Array(num).fill(0).reduce((a,b)=>a+b);
    if(total === 0){
       arrSum =new Array(num)
     }
    while(arrSum !== total){
        if(arrSum <total ){
            start++;
        }else if(arrSum >total){
            start--;
        }
        arrSum = new Array(num).fill(0).map((e,i)=>i+start).reduce((a,b)=>a+b);
    }
    return new Array(num).fill(0).map((e,i)=>i+start)
}