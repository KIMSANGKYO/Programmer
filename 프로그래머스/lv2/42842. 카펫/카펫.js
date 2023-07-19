function solution(brown, yellow) {
  let width = 0;
  let height = 0;

  const total = brown + yellow;

  for (let i = 1; i <= Math.sqrt(total); i++) {
    if (total % i === 0) {

      width = total / i;
      height = i;
      if ((width * 2 + height * 2 - 4) === brown) {
        return [width, height];
      }
    }
  }
}
