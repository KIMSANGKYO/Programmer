function solution(sticker) {
    // 스티커를 떼면 인접한 스티커는 뗄 수 없음 
    // 몇개를 떼는지는 안정해졌으므로 한 스티커를 정하고 한칸띄워서 더해가지는방식으로
    // 첫번째와 마지막을 같이 뗄수 없다 
//     let firstSticker = 0;
//     for(let i=0; i<sticker.length; i+=2){
//         if(sticker.length%2!==0){
//             sticker.pop();
//         }
//         firstSticker+=sticker[i];
//     }
//     let secondSticker = 0;
//     for(let j=1; j<sticker.length; j+=2){
//         secondSticker+=sticker[j];
//     }
    
//     let result = 0;
//     result = Math.max(firstSticker,secondSticker);
//     return result;
    
    //== 테스트만 통과 ... => 한칸씩 띄우는게 아니라 뒤에 더큰값이 나올수 있다.
    
   const n = sticker.length;

if (n === 1) {
  return sticker[0];
}

let stSearchPrev = sticker[0];
let stSearchCurrent = Math.max(sticker[0], sticker[1]);

let ndSearchPrev = 0;
let ndSearchCurrent = sticker[1];

for (let i = 2; i < n; i++) {
  if (i !== n - 1) {
    const stSearchNext = Math.max(stSearchCurrent, stSearchPrev + sticker[i]);
    stSearchPrev = stSearchCurrent;
    stSearchCurrent = stSearchNext;
  }

  const ndSearchNext = Math.max(ndSearchCurrent, ndSearchPrev + sticker[i]);
  ndSearchPrev = ndSearchCurrent;
  ndSearchCurrent = ndSearchNext;
}

return Math.max(stSearchCurrent, ndSearchCurrent);
}