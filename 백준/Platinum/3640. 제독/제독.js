const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
let idx = 0;

function solve() {
  const [v, e] = input[idx].split(" ").map(Number);

  const pointCnt = v * 2 + 1;
  const size = Array.from({ length: pointCnt }, () => Array(pointCnt).fill(0));
  const cost = Array.from({ length: pointCnt }, () => Array(pointCnt).fill(0));
  const match = Array.from({ length: pointCnt }, () => []);
  const flow = Array.from({ length: pointCnt }, () => Array(pointCnt).fill(0));
  for (let i = 1; i <= v; i++) {
    match[i].push(i + v);
    match[i + v].push(i);
    size[i][i + v] = 1;
  }

  for (let i = 0; i < e; i++) {
    const [a, b, c] = input[idx + i + 1].split(" ").map(Number);
    match[a + v].push(b);
    match[b].push(a + v);
    size[a + v][b] = 1;
    cost[a + v][b] = c;
    cost[b][a + v] = -c;
  }

  const start = 1 + v;
  const end = v;
  let answer = 0;

  for (let i = 0; i < 2; i++) {
    const prev = Array(pointCnt).fill(-1);
    const distance = Array(pointCnt).fill(Infinity);
    const q = Array(pointCnt).fill(false);
    const queue = [];
    queue.push(start);
    distance[start] = 0;
    q[start] = true;

    while (queue.length > 0) {
      const current = queue.shift();
      q[current] = false;

      for (const target of match[current]) {
        if (
          size[current][target] - flow[current][target] > 0 &&
          distance[target] > distance[current] + cost[current][target]
        ) {
          distance[target] = distance[current] + cost[current][target];
          prev[target] = current;
          if (!q[target]) {
            queue.push(target);
            q[target] = true;
          }
        }
      }
    }

    let current = end;
    while (current !== start) {
      flow[prev[current]][current] += 1;
      flow[current][prev[current]] -= 1;
      answer += cost[prev[current]][current];
      current = prev[current];
    }
  }

  console.log(answer);
}

while (idx < input.length) {
  solve();
  idx += Number(input[idx].split(" ")[1]) + 1;
}
