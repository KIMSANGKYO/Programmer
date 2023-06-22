function solution(spell, dic) {
    //spell을 오름차순정렬 후 하나로 합침
    let russian = spell.sort().join("")
    // dic 배열의 요소를 분해해서 오름차순정렬한뒤 
    //  합친것이 오름차순완료한 위 스펠을 정렬한것과 일치한것만 dic 에 새 배열로 담아놓는다 
    let blue = dic.filter((el)=>el.split("").sort().join("") === russian)
    // 일치한다면 하나는 무조건 들어가므로 첫번째요소의 존재여부 확인
    if(blue[0]===undefined){
        return 2;
    }else return 1;
    
}
// dic 배열요소안에 spell의 알파벳들이 다 담겨있다면 1 