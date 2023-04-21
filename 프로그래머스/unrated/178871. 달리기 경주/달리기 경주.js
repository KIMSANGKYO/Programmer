function solution(players, callings) {
   //  // 현재 등수 players 배열 
   //  // player 의 이름이 불리면 한칸씩 앞으로 이동 
   // for(let i=0; i<callings.length; i++){
   //     // 콜링 배열의 값과 일치한 플레이어배열의 값을 앞으로 한칸이동
   //     // 해당 인덱스
   //    let callIndex = players.indexOf(callings[i])
   //    let change = players[callIndex]
   //    players[callIndex] = players[callIndex-1]
   //    players[callIndex-1] = change       
   // }
   //  return players
    
    
    // 플레이어와 인덱스를 매핑
    const playerMap = new Map();
    for(let i=0; i<players.length; i++){
        playerMap.set(players[i],i);
    }
    
    // 콜링 배열의 값과 일치한 플레이어배열의 값을 앞으로 한칸 이동 
    for(let i=0; i<callings.length; i++){
        const callIndex = playerMap.get(callings[i]);
        if(callIndex>0){
            const temp = players[callIndex];
            players[callIndex] = players[callIndex-1];
            players[callIndex-1] = temp;
            playerMap.set(temp,callIndex-1);
            playerMap.set(players[callIndex],callIndex);
        }
    }
    return players
}