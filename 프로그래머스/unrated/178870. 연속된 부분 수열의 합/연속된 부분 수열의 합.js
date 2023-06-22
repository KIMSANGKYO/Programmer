function solution(sequence, k) {
    let result = [];
   // 위치 변수 index 
    let [a,b] = [0,0];
    // a~b 사이 값 합
    let sum = sequence[a];
     //최대길이보다 작은 범위에서 순회
    while (b<sequence.length){
        if(sum<k){
            sum += sequence[++b]
        }else if(sum>k){
         sum -=sequence[a++]   
        }else if(sum==k) {
            result.push([a,b])
            sum += sequence[++b]
            sum -= sequence[a++]
        }
    }
    console.log(result)
    // 정렬해서 둘 사이 차가 제일 적은것 >> 길이가 제일 짧은것 리턴
    return result.sort((a,b)=>(a[1]-a[0])-(b[1]-b[0]))[0]
}