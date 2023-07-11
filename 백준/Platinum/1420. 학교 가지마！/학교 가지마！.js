const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let idx = 0;
let [n, m] = input[idx++].split(" ").map(Number);
const INF = 1e9;
let size = 2 * n * m;
let graph = Array.from({ length: n }, () => []);
let adj = Array.from({ length: size }, () => []);
let cost = Array.from({ length: size }, () => ({}));
let flow = Array.from({ length: size }, () => ({}));

for (let i = 0; i < n; i++) {
  graph[i] = Array.from(input[idx++].trim());
}

let source, sink;
let sy, sx, ty, tx;
let cnt = 0;

function updateEdge(u, v, x) {
  adj[u].push(v);
  adj[v].push(u);
  cost[u][v] = x;
  cost[v][u] = 0;
  flow[u][v] = 0;
  flow[v][u] = 0;
}

function dfs() {
  let result = 0;

  while (true) {
    const parent = Array(size).fill(-1);
    const queue = [];
    queue.push(source);

    while (queue.length > 0) {
      const pre = queue.shift();
      for (const now of adj[pre]) {
        if (parent[now] === -1 && cost[pre][now] - flow[pre][now] > 0) {
          queue.push(now);
          parent[now] = pre;
        }
      }
    }

    if (parent[sink] === -1) break;

    let idx = sink;
    while (idx !== source) {
      flow[parent[idx]][idx] += 1;
      flow[idx][parent[idx]] -= 1;
      idx = parent[idx];
    }
    result += 1;
  }

  return result;
}

function solution() {
  if ((n === 1 && m === 1) || Math.abs(sy - ty) + Math.abs(sx - tx) === 1) {
    console.log(-1);
    return;
  }

  for (let i = 0; i < n * m; i++) {
    updateEdge(2 * i, 2 * i + 1, 1);
  }

  let current = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (
        row + 1 < n &&
        graph[row][col] !== "#" &&
        graph[row + 1][col] !== "#"
      ) {
        const next = current + 2 * m;
        updateEdge(current + 1, next, INF);
        updateEdge(next + 1, current, INF);
      }
      if (
        col + 1 < m &&
        graph[row][col] !== "#" &&
        graph[row][col + 1] !== "#"
      ) {
        const next = current + 2;
        updateEdge(current + 1, next, INF);
        updateEdge(next + 1, current, INF);
      }
      current += 2;
    }
  }

  console.log(dfs());
}

for (let row = 0; row < n; row++) {
  for (let col = 0; col < m; col++) {
    if (graph[row][col] === "K") {
      sy = row;
      sx = col;
      source = cnt + 1;
    } else if (graph[row][col] === "H") {
      ty = row;
      tx = col;
      sink = cnt;
    }
    cnt += 2;
  }
}

solution();
