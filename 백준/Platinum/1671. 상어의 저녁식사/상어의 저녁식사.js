const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const sharks = [];
for (let i = 1; i <= N; i++) {
  const [size, speed, intel] = input[i].split(" ").map(Number);
  sharks.push([size, speed, intel]);
}
let target = new Array(N).fill().map(() => []);
let visited = new Array(N).fill(-1);

function solve() {
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (
        sharks[i][0] >= sharks[j][0] &&
        sharks[i][1] >= sharks[j][1] &&
        sharks[i][2] >= sharks[j][2]
      ) {
        target[i].push(j);
      } else if (
        sharks[i][0] <= sharks[j][0] &&
        sharks[i][1] <= sharks[j][1] &&
        sharks[i][2] <= sharks[j][2]
      ) {
        target[j].push(i);
      }
    }
  }

  let res = 0;

  for (let i = 0; i < N; i++) {
    let checked = Array(N).fill(false);
    if (dfs(i, checked)) {
      res += 1;
    }
    checked.fill(false);
    if (dfs(i, checked)) {
      res += 1;
    }
  }

  console.log(N - res);
}

function dfs(x, checked) {
  for (const i of target[x]) {
    if (checked[i]) {
      continue;
    }
    checked[i] = true;
    if (visited[i] === -1 || dfs(visited[i], checked)) {
      visited[i] = x;
      return true;
    }
  }
  return false;
}
solve();
