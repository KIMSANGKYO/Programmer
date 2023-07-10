 function solution(numbers) {
    const pattern = [ 
        [1, 7, 6, 7, 5, 4, 5, 3, 2, 3], 
        [7, 1, 2, 4, 2, 3, 5, 4, 5, 6], 
        [6, 2, 1, 2, 3, 2, 3, 5, 4, 5], 
        [7, 4, 2, 1, 5, 3, 2, 6, 5, 4], 
        [5, 2, 3, 5, 1, 2, 4, 2, 3, 5], 
        [4, 3, 2, 3, 2, 1, 2, 3, 2, 3], 
        [5, 5, 3, 2, 4, 2, 1, 5, 3, 2], 
        [3, 4, 5, 6, 2, 3, 5, 1, 2, 4], 
        [2, 5, 4, 5, 3, 2, 3, 2, 1, 2], 
        [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
    ]

    let weight = new Array(10).fill().map(_ => new Array(10).fill(null));

    
    weight[4][6] = 0;
    weight[6][4] = 0;
    
    for (let number of numbers) {
        number = Number(number); 

        const dicMap = new Array(10).fill().map(_ => new Array(10).fill(null));
        
        weight.forEach((row, idx1) => {
            row.forEach((el, idx2) => {
                if (el !== null) { 
                    const value = el; 
                    if (idx1 === number || idx2 === number) { 
                        const resultValue = dicMap[idx1][idx2] ? Math.min(dicMap[idx1][idx2], value + 1) : value + 1; 
                        dicMap[idx1][idx2] = resultValue;
                        dicMap[idx2][idx1] = resultValue;
                    } else {
                        const weightValue1 = pattern[idx1][number]; 
                        const weightValue2 = pattern[idx2][number]; 
                        
                        const resultValue1 = dicMap[idx1][number] ? Math.min(dicMap[idx1][number], value + weightValue2) : value + weightValue2; 
                        const resultValue2 = dicMap[idx2][number] ? Math.min(dicMap[idx2][number], value + weightValue1) : value + weightValue1; 
    
                        dicMap[idx1][number] = resultValue1;
                        dicMap[number][idx1] = resultValue1;
                        dicMap[number][idx2] = resultValue2;
                        dicMap[idx2][number] = resultValue2;
                    }
                }
            }) 
        })

        weight = dicMap;
    }
    
    return Math.min(...weight.map(el => Math.min(...el.filter(el => Number(el)))).filter(el => Number(el)));
}

// 16~20 런타임에러 => 재귀.. bfs 로 해결했어야한다
// function solution(numbers) {
//     // 들어오는 입력 숫자
//     const input = [];
//     const keypad = [
//         ['1','2','3'],
//         ['4','5','6'],
//         ['7','8','9'],
//         ['*','0','#']
//     ];
//     // numbers 만큼 숫자 키패드 배당 이중배열
//     const dp = Array.from({length:100001},()=>Array.from({length:10},()=>Array(10).fill(0)));
    
//     // 위치 값 생성자 
//     function Point(x,y){
//         this.x = x;
//         this.y = y;
//     }
    
//     // 가중치 게산
//     function weight(pos,target){
//         // 현위치
//         const cx = pos.x;
//         const cy = pos.y;
//         const x = target.x;
//         const y = target.y;
        
//         // 타겟이 현위치일때
//         if(cx === x && cy === y) return 1;
//         // 상하좌우 일때
//         if(cx === x || cy === y) return Math.abs((cx-x)*2 + (cy-y)*2);
//         // 대각선 일때 
//         if(Math.abs(cx-x)===Math.abs(cy-y)) return Math.abs(cx-x)*3;
        
//         // 다음 이동 좌표 
//         const nx = Math.abs(cx-x);
//         const ny = Math.abs(cy-y);
//         const dia = Math.min(nx,ny); // 대각선
//         const line = Math.max(nx,ny); //일직선
        
//         return dia*3 + (line-dia)*2;
//     }
    
//     function execution(left,right,idx){
//         if (idx >= input.length) return 0;
//         // 좌우 좌표 동일 시 예외처리 
//         if(left.x === right.x && left.y === right.y) return Number.MAX_SAFE_INTEGER;
        
//         const leftNum = keypad[left.x][left.y] - '0';
//         const rightNum = keypad[right.x][right.y] - '0';
//         // dp 반환
//         if(dp[idx][leftNum][rightNum] !== 0) return dp[idx][leftNum][rightNum];
        
//         const leftWeight = weight(left,input[idx]);
//         const rightWeight = weight(right,input[idx]);
        
//         const leftCost = leftWeight + execution(input[idx],right,idx+1);
//         const rightCost = rightWeight + execution(left,input[idx],idx+1);
        
//         const minCost = Math.min(leftCost,rightCost);
        
//         return dp[idx][leftNum][rightNum] = minCost;
//     }
    
//     const numArray = numbers.split('');
//     for(let i=0; i<numArray.length; i++){
//         for(let j=0; j<keypad.length; j++){
//             for(let k=0; k<keypad[j].length; k++){
//                 if(keypad[j][k] === numArray[i]){
//                     input.push(new Point(j,k));
//                 }
//             }
//         }
//     }
    
//     let result = 0;
//     // 초기 위치 불러오기
//     const left = new Point(1,0);
//     const right = new Point(1,2);
    
//     result = execution(left,right,0);//
    
//     return result;
// }