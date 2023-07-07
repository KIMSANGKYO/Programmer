function solution(board) {
    
    let result = 0;
    // 좌표이동 
    const dx = [-1,1,0,0];
    const dy = [0,0,-1,1];
    // 도형 블럭 찾기 
    
    
    let blockList = findBlocks(board);
    
    
    function dfs(board,x,y,boardNum,visited){
        const block = [[x,y,1]];
        const len = board.length;
        const queue = [[x,y]];
        
        visited[y][x] = true;
        
        while(queue.length){
            const [x,y] = queue.pop();
            
            for(let i=0; i<4; i++){
                const nx = x + dx[i];
                const ny = y + dy[i];
                
                // 이동 범위 설정 
                if(nx >= 0 && nx < len && ny >=0 && ny < len && board[ny][nx] === boardNum && !visited[ny][nx]){
                    block.push([nx,ny,1]);
                    visited[ny][nx] = true;
                    queue.push([nx,ny]);
                }
            }
        }
        
        return block;
    }
    
    // 사각형 완성 함수 
    function rectangle(board, boardNum, block){
        const xArr = block.map((b)=>b[0]).sort((a,b)=>a-b);
        const yArr = block.map((b)=>b[1]).sort((a,b)=>a-b);
        
        for(let i=yArr[0]; i<=yArr[yArr.length-1]; i++){
            for(let j=xArr[0]; j<=xArr[xArr.length-1]; j++){
                if(board[i][j] !== boardNum){
                    block.push([j,i,0]);
                }
            }
        }
    }
    
    // 블럭 찾기 함수 
    function findBlocks(board){
        const len = board.length;
        const visited = Array.from({length:len},()=>Array(len).fill(false));
        const blockArr = [];
        
        for(let i=0; i<len; i++){
            for(let j=0; j<len; j++){
                if(!visited[i][j] && board[i][j]){
                    const block = dfs(board,j,i,board[i][j], visited);
                    rectangle(board,board[i][j],block);
                    blockArr.push(block);
                }
            }
        }
        
        return blockArr;
    }
    
    // 블록을 넣을 수 있는지 판별 
    function isBlockIn(board,block){
        for(const [x,y,check] of block){
            if(check === 1){
                continue;
            }
            for(let i=y; i>=0; i--){
                if(board[i][x] !== 0){
                    return false;
                }
            }
        }
        return true;
    }
    
    // 모든 블럭을 확인하는 함수 
    function checkAll(board,blockList){
        if(!blockList.length){
            return [0,[]];
        }
        
        const len = board.length;
        let count = 0;
        const newBlockArr = [];
        
        for(let i=0; i<blockList.length; i++){
            const block = blockList[i];
            if(isBlockIn(board,block)){
                for(const [x,y] of block){
                    board[y][x] = 0;
                }
                count++;
                continue;
            }
            newBlockArr.push(block);
        }
        
        return [count,newBlockArr];
    }
    
    
    while(true){
        const [count, newBlockArr] = checkAll(board,blockList);
        result += count;
        
        if(count === 0){
            break;
        }
        
        blockList = newBlockArr;
    }
    
    return result;
}