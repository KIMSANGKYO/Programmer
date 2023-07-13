const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin", "utf8")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dir = new Array(110).fill(0).map(() => new Array(110).fill(0));
const board = new Array(101).fill(0).map(() => new Array(101).fill(false));

for (let i = 1; i <= N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  board[a][b] = board[b][a] = true;
}

for (let e = 1; e <= 100; e++) {
  for (let s = e - 1; s >= 1; s--) {
    let ans = 0;
    for (let k = s; k <= e; k++) {
      ans = Math.max(
        ans,
        dir[s][k - 1] + dir[k + 1][e - 1] + (board[k][e] ? 1 : 0)
      );
    }
    dir[s][e] = ans;
  }
}
console.log(dir[1][100]);