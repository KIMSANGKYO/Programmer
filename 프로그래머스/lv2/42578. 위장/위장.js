function solution(clothes) {
    // 객체에 키가 없으면 옷을 입지않은것 
    // 해당 키가 있다면 반복문으로 result 에 추가
    
    // ==증가조건== 
    // 기본값 1 
    // 해당 종류의 옷을 입었을때 
    // 해당 종류의 옷 중 다른 옷을 입을때마다 +1
    
    let result = 1;
    let len = clothes.length;
    let obj = {};
    // 객체에 키는 의상의 종류 값은 해당 의상 종류 개수 형태로 채워넣기
    // 해당 키가 없을때를 false 값을 1 로 
    for(let i=0; i<len; i++){
        obj[clothes[i][1]] = (obj[clothes[i][1]]||1) + 1
    }
    // 키가 있는 의상 개수 곱해주기 
    //  반복 . 종류의 개수 * 종류의 개수
    for(let key in obj){
        result = result *obj[key]
    }
    // 최소 한개를 입으므로, 아예 착용안한 경우 뺴기
    return result - 1;


}

