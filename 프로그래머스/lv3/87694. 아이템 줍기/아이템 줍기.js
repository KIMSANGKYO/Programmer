function solution(rectangle, characterX, characterY, itemX, itemY) {
    let result = 0;
    
    // 좌표 1~50 의 두배이상 범위 2차원배열 150x150
    const field = Array.from(Array(150),()=>Array(150).fill(-1));
    
    // 직사각형 
    for(const r of rectangle){
        // 좌표값 * 2 
        const [x1,y1,x2,y2] = r.map((e)=>e*2);
        // x1~x2 y1~y2
        for(let i=x1; i<=x2; i++){
            for(let j=y1; j<=y2; j++){
                // 테두리 제외 내부 공간 생성
                if(x1<i && i<x2 && y1<j && j<y2){
                    field[i][j] = 0;
                }
                // 다른 직사각형 내부아니고 테두리일때 
                else if(field[i][j] !== 0){
                    field[i][j] = 1;
                }
            }
        }
    }
    
    // 이동 방향
    const dx = [-1,1,0,0];
    const dy = [0,0,-1,1];
    
    // 큐에 캐릭터 출발지점
    const q = [];
    q.push([characterX*2, characterY*2]);
    // 최단거리 방문배열
    const visited = Array.from(Array(150),()=>Array(150).fill(1));
    
    while(q.length > 0){
        const [x,y] = q.shift();
        // 현 장소가 아이템이 있을때 최단거리리턴
        if(x===itemX*2 && y===itemY*2){
            result = Math.floor(visited[x][y]/2);
            break;
        }
        //아이템없을때 방향 확인
        for(let k=0; k<4; k++){
            const nx = x+dx[k];
            const ny = y+dy[k];
            
            // 테두리, 방문 x 일때 q 에 추가
            if(field[nx][ny]===1 && visited[nx][ny]===1){
                q.push([nx,ny]);
                visited[nx][ny] = visited[x][y]+1;
            }
        }
    }
    return result;
}