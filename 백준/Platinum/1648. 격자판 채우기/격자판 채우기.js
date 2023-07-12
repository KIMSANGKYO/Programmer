const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();
const [n, m] = input.split(" ").map(Number);
const MAX = 15;
const Mod = 9901;
let cache = new Array(MAX * MAX)
  .fill(0)
  .map(() => new Array(1 << MAX).fill(-1));

function solve(N, S) {
  if (N === n * m && S === 0) {
    return 1;
  }

  if (N >= n * m) {
    return 0;
  }

  let ret = cache[N][S];
  if (ret !== -1) {
    return ret;
  }

  ret = 0;

  if ((S & 1) === 1) {
    ret = solve(N + 1, S >> 1);
    ret %= Mod;
  } else {
    ret = solve(N + 1, (S | (1 << m)) >> 1);
    ret %= Mod;

    if ((S & 1) === 0 && (S & 2) === 0 && (N % m) + 1 !== m) {
      ret += solve(N + 2, S >> 2);
      ret %= Mod;
    }
  }

  cache[N][S] = ret;
  return ret % Mod;
}

console.log(solve(0, 0));
