function solution(operations) {
    // I 입력 
    // D 1 최댓값 삭제 D -1 최솟값 삭제 
    // 명령어를 받아서 실행한뒤 나오는 배열을 내림차순 정렬한 뒤 첫째, 마지막값을 배열에 담아 리턴 
    let baseArr = [];
    
    for(let i = 0; i<operations.length; i++){
        let operation = operations[i].split(' ');
        if(operation[0]==='I'){
            baseArr.push(operation[1]);
        }
        if(operation[0]==='D' && baseArr.length!==0){
            if(operation[1]==='1'){
                baseArr.sort((a,b)=>a-b).pop();
            }else if(operation[1]==='-1'){
                baseArr.sort((a,b)=>b-a).pop();
            }
        }
    }
    if(baseArr.length===0){
        return [0,0]
    }
    baseArr.sort((a,b)=>b-a);
    return [Number(baseArr.slice(0,1).join()),Number(baseArr.slice(-1).join())]
}