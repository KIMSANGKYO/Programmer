function solution(n)
{
   //500 250 125 124 62 31 30 15 14 7 
   // n 을 이등분 반복하다가 홀수를 만났을때 -1을 해서 짝수로 만듬 
    // 그 홀수를 만나는 경우를 카운트하면 될듯 
    let count = 0;
    //n이 1이 될때까지 n 을 2 로 나누거나 2로나누고 1로 빼는 작업 반복
    while(n>0){
        if(n%2===0){
            n=n/2;
        }else{
            n--;
            count++
        }
    }
    return count;
}