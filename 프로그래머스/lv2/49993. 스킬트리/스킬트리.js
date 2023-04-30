function solution(skill, skill_trees) {
   // skill 문자열 순서만 중요하므로 스킬트리에서 skill 문자열만 뽑아내서 순서를 본다. 
  let count = 0;
    for(let i=0; i<skill_trees.length; i++){
        // 판별 변수 
        let possible = true;
        let index = 0; 
        for(let j=0; j<skill_trees[i].length; j++){
            // skill 문자열에서 skill trees 에 있는것만 뽑기
            if(skill.includes(skill_trees[i][j])){
                if(skill_trees[i][j] === skill[index]){
                    index++
                }else{
                    possible =false; 
                }
            }
        }
        if(possible===true){
            count ++
        }
    }
    return count
}