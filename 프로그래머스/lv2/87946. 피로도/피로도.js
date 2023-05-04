function solution(k, dungeons) {
 // 피로도 계산  
 // dfs 
    let result = [];
    
    let visited = new Array(dungeons.length).fill(false);
    // 던전에 들어갈수 있는지 카운트 
    // 재귀를 통해 카운트를 추가해 배열에 들어간 요소 중 가장 큰 값이 최대로 갈 수 있는 값
    const dfs = (count,k) => {
        result.push(count);
        
        for(let i = 0; i<dungeons.length; i++){
            let now = dungeons[i];
            if(k>=now[0]&& !visited[i]){
                visited[i] = 1; 
                dfs(count+1,k-now[1]);
                visited[i] = 0;
            }
        }      
    }
    // 카운팅 0 부터 입력 
    dfs(0,k);
    console.log(result)
    return Math.max(...result);
}