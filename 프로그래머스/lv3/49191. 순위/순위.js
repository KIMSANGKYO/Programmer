function solution(n, results) {
    // 선수 승패 결과를 그래프로 >> 탐색 DFS
    // 참가 선수 - 1 (본인제외)  === 본인보다 순위 높은 선수들 + 순위낮은 선수
    // 본인의 순위는 본인과 경기를 한 사람의 결과로도 판단 가능 >> 판단이 되는 선수들의 명수 구하기 
    
    // 그래프는 선수 기준, 연결된 다른 선수 개수가 전체 참가자-1 (본인제외) 와 동일시 값 추가 
    
    let trustPlayer = 0; 
    
    // 경기 결과 배열안 객체 => 순위, 승리, 패배 
    const battle = new Array(n).fill('').map((b)=>(
        {rank: {}, win:[], defeat:[]}
    ));
    // 순위 확인 => 선수를 점으로 연결된 선으로 확인 => 방문 불린 체크 
    // 결과와 연결, 방문여부 확인
    // 연결은 선수들의 숫자 = > 순회를 위한; relation 
    // result 는 경기 결과 win or defeat
    function rankCheck(result, relation, visited) {
        visited[relation] = true;
        // 탈출 조건 
        if(battle[relation].rank[result]){
            return battle[relation].rank[result];
        }
        if(battle[relation][result].length < 1){
            return 0; 
        }
        // 순위를 리턴해야함 
        let rank = 0; 
        
        battle[relation][result].forEach((b)=>{
            // 방문하지 않았으면 트루로 바꾸고 rank에 1더해주고 판별 재귀 
            if(!visited[b]){
                visited[b] = true;
                // 선을 해당값으로 교체
                rank += 1 + rankCheck(result, b, visited);
            }
        });
        return rank;
    }
    
    // 경기 승리, 패배 값 배열 추가 
    results.forEach(([win,defeat])=>{
        battle[win-1].win.push(defeat-1);
        battle[defeat-1].defeat.push(win-1);
    })
    
    // 순위활용 선수 순회 
    // 방문 배열은 두개 필요 앞,뒤 생성
    for(let i = 0; i < n; i++){
        // 기준 선수보다 앞에 있는 선수 
        let front = rankCheck("defeat",i,new Array(n).fill(false));
        // 기준 선수보다 뒤에 있는 선수
        let back = rankCheck("win",i,new Array(n).fill(false));
        // 참가 선수 - 1 (본인제외)  === 본인보다 순위 높은 선수들 + 순위낮은 선수
        if(front+back === n-1){
            trustPlayer++;
        }
    }
    console.log(battle) // 2번 결과 이김,짐 다나옴 (본인제외)
    return trustPlayer;
}