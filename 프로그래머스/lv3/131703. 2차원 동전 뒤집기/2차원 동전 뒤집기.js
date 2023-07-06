function solution(beginning, target) {
    // 배열 열 뒤집기
    function flipCol(arr,col){
        let n = arr.length;
        
        for(let i=0; i<n; i++){
            if(arr[i][col] === 1){
                arr[i][col] = 0;
            }else{
                arr[i][col] = 1;
            }
        }
    }
    // 최솟값 비교를 위한 초기 
    let result = Infinity; 
    let rows = beginning.length;
    let cols = beginning[0].length;
    
    // 뒤집은 배열 저장
    let flipped = [];
    for(let i=0; i<rows; i++){
        flipped.push([]);
        for(let j=0; j<cols; j++){
            //뒤집기
            if(beginning[i][j]){
                flipped[i].push(0);
            }else{
                flipped[i].push(1);
            }
        }
    }
    
    for(let unit=0; unit<Math.pow(2,rows); unit++){
        let rowFlipped =[];
        let flipCount = 0;
        for(let i=0; i<rows; i++){
            let com = Math.pow(2,i);
            
            // and 값 아니면 열뒤집기 
            if(unit & com){
                rowFlipped.push(flipped[i].slice());
                flipCount += 1; // 뒤집기 카운팅
            }else{
                rowFlipped.push(beginning[i].slice()); // 원본 저장
            }
        }
        
        // 열 뒤집기 
        for(let i=0; i<cols; i++){
            let currentCol = [];
            let targetCol = [];
            
            for(let j=0; j<rows; j++){
                currentCol.push(rowFlipped[j][i]);
                targetCol.push(target[j][i]);
            }
            
            // 현재 col 과 목표가 다르면 뒤집는다
            if(JSON.stringify(currentCol) !== JSON.stringify(targetCol)){
                flipCol(rowFlipped,i); 
                flipCount += 1;
            }
        }
        //뒤집은 결과가 목표와 같으면 횟수 갱신
        if(JSON.stringify(rowFlipped)===JSON.stringify(target)){
            result = Math.min(result,flipCount);
        }
    }
    
    return result === Infinity ? -1 : result;
}