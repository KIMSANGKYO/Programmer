function solution(genres, plays) {
    // 장르별로 많이 재생된 노래 두개 
    let result = [];
    // 장르명 : 장르별 곡 정보 [고유번호, 재생횟수]  
    let song = {};
    // 장르명 : 재생횟수
    let playNum = {};
    
    for(let i = 0 ; i < genres.length; i++){
        //추가
        if(song[genres[i]]){
            song[genres[i]].push([i,plays[i]])
        //생성
        }else{
            song[genres[i]] = [[i,plays[i]]]
        } 
        // 장르 키에 횟수 저장 
        // 키가 이미 있을떄
        if(playNum[genres[i]]){
            playNum[genres[i]]+=plays[i]
        // 없을때
        }else{
            playNum[genres[i]]=plays[i]
        }
    }
    // 정렬을 위한 변환 
    let totalPlay = [];
    let best = [];
    for ( let genre in playNum){
        totalPlay.push([genre,playNum[genre]]);
    }
    for ( let genre in song ){
        best.push([genre,song[genre]]);
    }
    totalPlay.sort((a,b)=>b[1]-a[1]);
    console.log(totalPlay)
    console.log(best)
    
    // best 2개의 고유번호를 result 에 담기 
    for (let i =0; i<totalPlay.length; i++){
        let targeted = totalPlay[i][0];
        
        let sorted = best.filter((s)=>s[0] ===targeted).pop()[1]
        console.log(sorted)
        sorted.sort((a,b)=>b[1]-a[1])
        console.log(sorted)
        // 곡이 하나일떄
    if(sorted.length ===1){
        result.push(sorted[0][0]);
    }
    // 두 곡 이상일때 앞 두개만
    if(sorted.length > 1 ){
        result.push(sorted[0][0]);
        result.push(sorted[1][0]);
    }
    }
    
    return result;
}