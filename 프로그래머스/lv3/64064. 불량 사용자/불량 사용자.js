function solution(user_id, banned_id) {
   // 제재아이디에서 보이는 알파벳, 위치가 같은 유저아이디의 개수를 구한다 
    // 제재아이디 기준으로 순회 
    // 이미 제재된 아이디인지 판별 >> 불린으로 분류
    let banIds = [];
    let banned = new Array(user_id.length).fill(false);
    
    // id 하나하나 비교, 제재된 아이디 판별
    const isBanId = (userBan,userId) =>{
        // 길이 우선 판별
        if(userBan.length !== userId.length){
            return false;
        }
        for(let i=0; i<userId.length; i++){
            if(userBan[i] === '*'){
                continue;
            }
            if(userBan[i] !== userId[i]){
                return false;
                break;
            }
        }
        return true;
    }
    
    const check = (count,idList) =>{
        if(count===banned_id.length){
            // 원래 존재하는 배열인지 확인
            for(let j = 0; j<banIds.length; j++){
                if(banIds[j].slice().sort().join(',')===idList.slice().sort().join(',')){
                    return false;                 
                }
            }
            // 없는거라면 그 경우의수를 넣는다
            if(true){
                return banIds.push(idList);
            } 
        }
        const banId = banned_id[count];
        for(let k = 0; k<user_id.length; k++){
            const userId = user_id[k];
            
            if(isBanId(banId,userId) && banned[k] === false){
                banned[k] = true;
                check(count+1, [...idList,userId]);
                banned[k] = false;
            }
        }
    }
 check(0,[]);
    
    return banIds.length;
}