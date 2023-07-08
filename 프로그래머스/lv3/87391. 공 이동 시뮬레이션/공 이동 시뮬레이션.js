function solution(n, m, x, y, queries) {
    let result = 0;
    let minX = x;
    let maxX = x;
    let minY = y;
    let maxY = y;
    
    for(let i = queries.length-1; i>=0; i--){
        const [dir,dist] = queries[i];
        
        if(dir === 0){
            maxY += dist;
            if(maxY > m-1){
                maxY = m-1;
            }
            if(minY !== 0){
                minY += dist;
            }
        }else if (dir === 1){
            minY -= dist;
            if(minY < 0){
                minY = 0;
            }
            if(maxY !== m-1){
                maxY -= dist;
            }
        }else if(dir === 2){
            maxX += dist;
            if(maxX > n-1){
                maxX = n-1;
            }
            if(minX !== 0){
                minX += dist;
            }
        }else{
            minX -= dist;
            if(minX < 0){
                minX = 0;
            }
            if(maxX !== n-1){
                maxX -= dist;
            }
        }
        
        if(minY > m-1 || maxY < 0 || minX > n-1 || maxX < 0){
            return result;
        }
    }
    
    result = BigInt(maxY - minY + 1) * BigInt(maxX - minX + 1);
    return result;
}