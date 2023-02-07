// ,c , , e, f,g ,h

function solution(s, skip, index) {
    // // 문자열 s 의 알파벳을 index 만큼 뒤의 알파벳으로 바꾸기
    // // 단, skip 문자열은 제외하고
    // let result ='';
    // // 알파벳이 담긴 배열 만들어야됨...
    // // 스킵 알파벳 먼저 제거 
    // let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].filter((e)=>!skip.split('').includes(e))
    // // s 문자도 알파벳하나씩 배열에 담아줘야함 >> 문자열하나를 풀어서 배열에
    // let sArr = s.split('');
    // // s 의 알파벳 개수만큼 반복 
    // for(let i=0; i<sArr.length; i++){
    //     // 변환 시작할 인덱스를 확인
    //     let sIdx = alphabet.indexOf(sArr[i]);
    //     const newIdx = (idx) =>{
    //         // 
    //         if(idx>alphabet.length-1){
    //             return newIdx(idx-alphabet.length)
    //         }else{
    //             return idx;
    //         }
    //         result = result + alphabet[newIdx(sIdx)];
    //     }
    // }
    // return result
   let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    skip.split('').map((e)=>{
        const skipIdx = alphabet.indexOf(e);
        alphabet.splice(skipIdx,1);
     })
     const result = s.split('').map((e)=>{
         const sIdx = alphabet.indexOf(e) + index;
         return alphabet[(sIdx)%alphabet.length]
     })
     return result.join('')
    }