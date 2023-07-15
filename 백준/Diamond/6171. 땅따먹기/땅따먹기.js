const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");

function cross(a, b) {
  return (b.b - a.b) / (a.m - b.m);
}

function addLine(lines, m, b) {
  const a = { m, b, x: -Infinity };
  if (lines.length === 0) {
    lines.push(a);
    return;
  }
  while (lines.length > 0) {
    const top = lines[lines.length - 1];
    const x = cross(top, a);
    if (x <= top.x) lines.pop();
    else break;
  }
  a.x = cross(lines[lines.length - 1], a);
  lines.push(a);
}

function query(lines, x, ptr) {
  while (ptr < lines.length - 1 && lines[ptr + 1].x < x) ++ptr;
  return lines[ptr].m * x + lines[ptr].b;
}

function solve(N, a) {
  a.sort((x, y) => x[0] - y[0]);
  let idx = 0;
  const b = [];
  for (let i = 0; i < N; ++i) {
    while (idx > 0 && b[idx - 1][1] <= a[i][1]) --idx;
    b[idx++] = a[i];
  }
  N = idx;
  const lines = [];
  addLine(lines, b[0][1], 0);
  const dp = [];
  let ptr = 0;
  for (let i = 0; i < N - 1; ++i) {
    dp[i] = query(lines, b[i][0], ptr);
    addLine(lines, b[i + 1][1], dp[i]);
  }
  return query(lines, b[N - 1][0], ptr);
}

function main() {
  const inputLines = input.trim().split("\n");
  const N = parseInt(inputLines[0]);
  const a = [];
  for (let i = 1; i <= N; ++i) {
    const [first, second] = inputLines[i].split(" ").map(Number);
    a.push([first, second]);
  }
  const result = solve(N, a);
  console.log(result);
}

main();
