function solution(n, computers) {
    // 배열에 있는 인덱스는 컴퓨터 번호와 같다 
    // 서로 연결이 되어있다면 하나의 묶음
    // 독자적으로 떨어져있는 컴퓨터가 있을때 
    let result = 0; 
    
    // 해당 컴퓨터와의 네트워크 연결 확인 여부 
    let visit = new Array(n).fill(false);
    
    function dfs(idx){
        visit[idx] = true;
        
        for(let i = 0; i< computers.length; i++){
            // 해당 컴퓨터와 연결되고, 방문하지 않았을때
            if(computers[idx][i] ===1 && visit[i] ===false){
                dfs(i);
            }
        }
    }
    
    for(let j = 0; j<computers.length; j++){
        //방문여부를 확인해서 체크 후 네트워크 개수 증가
        if(visit[j] === false){
            dfs(j);
            result++;
        }
    }
    
    return result;
}