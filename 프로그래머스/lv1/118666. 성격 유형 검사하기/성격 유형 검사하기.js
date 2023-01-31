function solution(survey, choices) {
    // survey 는 비교할 성격 두개 
    // choices 는 성격두개를 비동의 동의로 구분할 숫자 배열 
    // 두개의 성격유형이 네가지 파트로 존재 
    // 1~3 숫자면 왼쪽에 있는 성격 카운팅 
    // 5~7 숫자면 오른쪽에 있는 성격 카운팅
    // 묶어진 두개 성격 유형이 값이 똑같다면 알파벳 빠른순서
    // >> R 이 T 보다 먼저 
    // C 가 F 보다 먼저 
    // J 가 M 보다 먼저 
    // A 가 N 보다 먼저 
    
    // 객체에 넣고 카운팅
    // 객체 담을때도 성격유형끼리 묶어배분
    //아 뉴진스의 하입보이요 
    const hypeboy = {R:0,T:0,C:0,F:0,J:0,M:0,A:0,N:0};
    // 초이스 배열의 요소개수에 맞춰 반복문 
    for(let i= 0; i<choices.length; i++){
    // 반복문 돌려서 성격받은거 쪼개놓기 //키는 어차피 2개니까 구조분해할당 
        const [left,right] = survey[i].split(''); 
        // 4점을 기준으로 왼쪽오른쪽 점수값 > 음수값으로 점수측정가능 (절댓값) 
        const score = Math.abs(choices[i]-4);
        // 비동의 쪽이면 왼쪽 키값에 score 카운트
        if(choices[i]<4){
            // 여기서 성격이 몇 번씩 더나올 수 있으므로 중첩시켜야됨
            hypeboy[left]= hypeboy[left] + score; 
            // 동의 쪽이면  오른쪽 키값에 카운트
        }else if(choices[i]>4){
            hypeboy[right]=hypeboy[right] + score;
        }
    }
    // 이제 정렬해서 같은 유형끼리 묶어주고 비교해야됨
    // 결과는 성격유형 문자4자리
    let result = '';
    
    // 두개의 성격이 4개유형으로 존재한다... 
    // 2개씩 끊어서 순회해야하는데 ?
    // 먼저 성격 유형인 키들을 배열안에 담아야함 
    // 객체의 키를 배열에 담는 메서드 ㅇㅇ
    const newjeans = Object.keys(hypeboy);
    // 키로 이루어진 배열인데 두개씩 끊어 순회하는방식 
    // 왼쪽값 오른쪽값 끊어내기
    for(let j=0; j<newjeans.length; j=j+2){
        const leftValue = hypeboy[newjeans[j]];
        const rightValue = hypeboy[newjeans[j+1]];
        // 왼쪽값이 크거나 같을때 // 같을때는 사전순서로되므로 앞에있는값
        // 두 개씩 끊어놨으니 둘 중하나만 result 문자열에 담기겠다
        if(leftValue>=rightValue){
            result = result + newjeans[j];
        }else{
            result = result + newjeans[j+1];
        }
    }
    return result;
}