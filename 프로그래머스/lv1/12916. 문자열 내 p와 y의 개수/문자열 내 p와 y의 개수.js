function solution(s){
    let S =s.toUpperCase();
    let pCnt = 0;
    let yCnt = 0;
    
    for(let i = 0; i<S.length; i++){
        if(S[i] === 'P'){
            pCnt++;
        }
        if(S[i] === 'Y'){
            yCnt++;
        }
    }
    
    if(pCnt === yCnt){
        return true;
    }
    return false;
}