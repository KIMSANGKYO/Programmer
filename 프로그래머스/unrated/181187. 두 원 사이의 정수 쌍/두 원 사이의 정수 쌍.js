function solution(r1, r2) {
    var result = 0;
    for(let x = 1;x <= r2; x++){
        let Y = Math.floor(Math.sqrt(r2**2 - x**2));
        let y = 0
        if(r1 > x){
            y = Math.ceil(Math.sqrt(r1**2 - x**2));
        }
        else{
            y = 0;
        }
        result+= (Y - y + 1);
    }
    return result*4;
}


