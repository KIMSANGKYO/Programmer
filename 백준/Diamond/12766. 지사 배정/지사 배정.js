const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split("\n");
const [n, b, s, r] = input[0].split(" ").map(Number);

const v = new Array(n + 1).fill(null).map(() => []);
const newV = new Array(n + 1).fill(null).map(() => []);
const value = [];
const deep = new Array(5001).fill(0);
const road = new Array(5001).fill(0);
const sum = new Array(5001).fill(0);
const dp = new Array(5001).fill(null).map(() => new Array(5001).fill(0));
const p = new Array(5001).fill(null).map(() => new Array(5001).fill(0));

for (let i = 1; i <= r; i++) {
  const [start, end, l] = input[i].split(" ").map(Number);
  v[start].push([end, l]);
  newV[end].push([start, l]);
}

function findMin(st, dist, e) {
  for (let i = 1; i <= n; i++) dist[i] = 2147483647;
  dist[st] = 0;
  const pq = [[0, st]];

  while (pq.length > 0) {
    const [td, p] = pq.pop();
    const tdPos = -td;
    if (tdPos > dist[p]) continue;

    for (let i = 0; i < e[p].length; i++) {
      const [nd, np] = [tdPos + e[p][i][1], e[p][i][0]];
      if (nd < dist[np]) {
        dist[np] = nd;
        pq.push([-nd, np]);
      }
    }
  }
}

findMin(b + 1, deep, v);
findMin(b + 1, road, newV);

for (let i = 1; i <= b; i++) {
  value.push(deep[i] + road[i]);
}
value.sort((a, b) => a - b);

for (let i = 1; i <= b; i++) {
  sum[i] = sum[i - 1] + value[i - 1];
}

for (let i = 1; i <= b; i++) {
  dp[1][i] = sum[i] * (i - 1);
  p[1][i] = 1;
}

function cost(i, j) {
  return (sum[j] - sum[i]) * (j - i - 1);
}

function dnqo(t, l, r, pl, pr) {
  if (l > r) return;
  const mid = Math.floor((l + r) / 2);
  dp[t][mid] = p[t][mid] = -1;

  for (let k = pl; k <= Math.min(mid - 1, pr); k++) {
    const tmp = dp[t - 1][k] + cost(k, mid);
    if (dp[t][mid] === -1 || dp[t][mid] > tmp) {
      dp[t][mid] = tmp;
      p[t][mid] = k;
    }
  }

  dnqo(t, l, mid - 1, pl, p[t][mid]);
  dnqo(t, mid + 1, r, p[t][mid], pr);
}

for (let i = 2; i <= s; i++) {
  dnqo(i, i, b, 0, b);
}

console.log(dp[s][b]);