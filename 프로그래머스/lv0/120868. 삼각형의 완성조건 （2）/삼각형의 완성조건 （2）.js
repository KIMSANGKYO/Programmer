function solution(sides) {
   return Math.min(...sides)*2-1
}
// 두 변의 길이 sides 배열 
// 가장 긴 변은 두변의 길이합보다 작아야한다
// 나올 수 있는 가장 긴변의 개수는?
// 가장 긴 변이 c 
// a-b < c < a+b