function solution(babbling) {
    //말할수 있는발음
    let babblingArr = ["aya", "ye", "woo", "ma"];
    let word = "";
    let answer = 0;

    for(let i=0; i<babbling.length; i++) {
        // 요소하나하나를 문자열로 담아놓기

        word = babbling[i].toString();

        for(let j=0; j<babblingArr.length; j++) {

            word = word.replaceAll(babblingArr[j], ' ');    

        }


        if( word.trim().length == 0) {
            answer++;
        }

    }


    return answer;
}
