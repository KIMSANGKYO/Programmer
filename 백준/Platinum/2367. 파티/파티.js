const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const [N, K, D] = input[0].split(" ").map(Number);

const cover = Array.from({ length: N + D + 2 }, () => Array(N + D + 2).fill(0));
const flow = Array.from({ length: N + D + 2 }, () => Array(N + D + 2).fill(0));

const foodCover = input[1].split(" ").map(Number);

const sort = 0;
const match = N + D + 1;

for (let i = 1; i <= N; i++) {
  cover[sort][i] = K;
}

for (let i = 0; i < D; i++) {
  cover[N + 1 + i][match] = foodCover[i];
}

let lineIndex = 2;
for (let i = 1; i <= N; i++) {
  const inputs = input[lineIndex++].split(" ").map(Number);
  for (let j = 1; j < inputs.length; j++) {
    const end = inputs[j];
    cover[i][N + end] = 1;
  }
}

let ans = 0;

while (true) {
  const queue = [];
  queue.push(sort);
  const parent = Array(N + D + 2).fill(-1);
  parent[sort] = sort;

  while (queue.length > 0) {
    const cur = queue.shift();

    for (let end = 1; end <= N + D + 1; end++) {
      if (cover[cur][end] - flow[cur][end] > 0 && parent[end] === -1) {
        queue.push(end);
        parent[end] = cur;
      }
    }
  }

  if (parent[match] === -1) {
    break;
  }

  let amount = Infinity;

  let from = match;
  while (from !== sort) {
    const to = parent[from];
    amount = Math.min(cover[to][from] - flow[to][from], amount);
    from = to;
  }

  from = match;
  while (from !== sort) {
    const to = parent[from];
    flow[to][from] += amount;
    flow[from][to] -= amount;
    from = to;
  }

  ans += amount;
}

console.log(ans);