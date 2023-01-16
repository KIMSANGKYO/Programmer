function solution(dots) {
   
    let newArr = dots.sort(()=>Math.random()-0.5);
    
    while(true){
    if((newArr[1][1]-newArr[0][1])/(newArr[1][0]-newArr[0][0]) === (newArr[3][1]-newArr[2][1])/(newArr[3][0]-newArr[2][0])){
        return 1;
    }
    return 0;
    }
   
}