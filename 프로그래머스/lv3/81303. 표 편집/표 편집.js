function solution(n, k, cmd) {
    
    
    const stack = [];
    const result = Array.from({length:n},()=>"O");
    const thing = Array.from({length:n},(_,index)=>[index-1,index+1]);
    thing[n-1][1] = -1;
    
    // 위로 이동//
    function actionUp(k,row){
        for(let i=0; i<row; i++){
            k = thing[k][0];
        }
        return k;
    }
    // 아래로 이동
    function actionDown(k,row){
        for(let i=0; i<row; i++){
            k = thing[k][1];
        }
        return k;
    }
    
    // 삭제 처리
    function actionDelete(k){
        const [prev,next] = thing[k];
        stack.push([k,prev,next]);
        result[k] = "X";
        
        if(next === -1){
            if(prev !== -1){
                thing[prev][1] = next;
            }
            k = prev;
        }else{
            thing[next][0] = prev;
            if(prev !== -1){
                thing[prev][1] = next;
            }
            k = next;
        }
        return k;
    }
    
    // 복구 처리
    function actionRestore(){
        const [node,prev,next] = stack.pop();
        if(prev !== -1){
            thing[prev][1] = node;
        }
        if(next !== -1){
            thing[next][0] = node;
        }
        result[node] = "O";
    }
    
    for(const act of cmd){
        const [direct,on] = act.split(' ');
        if(direct === 'U'){
            k = actionUp(k,+on);
        }
        if(direct === 'D'){
            k = actionDown(k,+on);
        }
        if(direct === "C"){
            k = actionDelete(k);
        }
        if(direct === "Z"){
            actionRestore();
        }
    }
    return result.join("")
}