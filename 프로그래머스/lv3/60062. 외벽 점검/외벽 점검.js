function solution(n, weak, dist) {
   // 원형 구조 >> 일자 구조 
    const wLen = weak.length;
    const dLen = dist.length;
    
    for(let i=0; i<wLen; i++){
        weak.push(weak[i]+n);
    }
    // 방문 배열 생성
    const visit = new Array(dLen).fill(false);
    
    // 친구 수 기초값 
    let result = dLen+1;
    
    // 원소 한개 > 1명 
    if(wLen === 1){
        return 1;
    } 
    
    // 배열 순열 구하기
    function getPer(length,arr){
        if(length === dLen){
            for(let i=0; i<wLen; i++){
                // 점검 완료 
                const complete = i + wLen;
                let start = i;
                let dis = 0; // 친구이동 
                
                for(let f of arr){
                    if(start >=complete) break;
                    dis += 1;
                    const xDist = f + weak[start]; // 이동가능 위치 
                    
                    // 친구의 시작위치 갱신 반복
                    while(start < complete && xDist >= weak[start]){
                        start++;
                    }
                }
                
                if(start < complete) continue;
                
                result = Math.min(result,dis);
            }
            return;
        }
        
        for(let i=0; i<dLen; i++){
            if(!visit[i]){
                visit[i] = true;
                getPer(length+1,[...arr, dist[i]]);
                visit[i] = false;
            }
        }
    }
    getPer(0,[]);
    
    return result === dLen+1 ? -1 : result;
}



