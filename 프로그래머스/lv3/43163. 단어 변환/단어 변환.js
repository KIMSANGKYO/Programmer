function solution(begin, target, words) {
    // 한단어씩바꿔서 begin 을 target으로 바꿀 때 최소 과정 
    // words 안에있는 단어로만 변환가능 
    
    // 방문 여부 
    let visit = new Array(words.length).fill(0);
    let process = [[begin,0]];
    
    while(process.length>0){
        let [start,count] = process.shift();
        if(start === target) return count;
        
        words.forEach((word)=>{
            if(!visit.includes(word)){
                if(dfs(start,word)){
                    process.push([word, ++count]);
                    visit.push(word);
                }
            }
        })
    }
    return 0;
}

function dfs(word1,word2){
    let check = 0;
    for(let i = 0; i<word1.length; i++){
        if(word1[i] !== word2[i]) check++;
    }
    return check === 1;
}