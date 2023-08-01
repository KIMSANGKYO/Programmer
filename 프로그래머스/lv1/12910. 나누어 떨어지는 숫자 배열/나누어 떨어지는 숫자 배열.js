function solution(arr, divisor) {
  const result = arr.filter(element => element % divisor === 0);
  
  if (result.length === 0) {
    return [-1];
  } else {
    return result.sort((a, b) => a - b);
  }
}
