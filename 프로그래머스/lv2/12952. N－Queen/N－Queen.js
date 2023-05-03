function solution(n) {
    // 길이가 n 인 정사각형 타일에 n개의 퀸을 놓을 수 있는 경우의 수 
    // 퀸은 x , y 축 , 대각선 자리 이동
    // 가로줄을 기준으로 퀸들의 위치를 표기 가능 >> 줄마다 하나씩있을것   
    let result = 0; 
  
    
    // board를 순회 퀸을 놓을 수 있는지 
    const isPossible = (board,row) =>{
        
        for(let i = 1; i<row; i++){
            // 열이 같을 때
            if(board[i]===board[row]){
                return false;
            }
            // 행, 열에서 떨어진 거리가 같을 때
            if(Math.abs(i-row)===Math.abs(board[i]-board[row])){
                return false;
            }
        }
        return true;
    }
    // 재귀로 퀸의 위치를 조건에 맞추고 다음 퀸의 조건으로 넘어간다
    const dfs=(board,row)=>{
        // 종료 >> 마지막 행에 퀸이 추가 될때 > 이게 완료되었을때 방법수 증가
        if(row === n){
            return result++;
        }else{
            for(let j=1; j<=n; j++){
                board[row+1] = j;
                if(isPossible(board,row+1)){
                    dfs(board,row+1);
                }
            }
        }
    }
    // 퀸위치의 열을 저장하는 배열 [1,3,0,2]
    
      // 행을 순회하며 보드배열에 첫번째 퀸의 열 저장 > dfs 함수로 재귀반복
   for(let k=1; k<=n; k++){
       let board =new Array(n+1).fill(0);
       board[1]=k;
       dfs(board,1);
   }
    return result;
}