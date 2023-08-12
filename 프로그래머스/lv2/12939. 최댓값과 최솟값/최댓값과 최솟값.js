function solution(s) {
    let newS = s.split(' ').map(Number);
    let max = Math.max(...newS);
    let min = Math.min(...newS);
    
    return String(min)+' '+String(max);
}