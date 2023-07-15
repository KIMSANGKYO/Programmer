const fs = require("fs");

function readFile(file) {
  const input = fs.readFileSync(file, "utf8").trim().split("\n");
  let idx = 0;

  function readLine() {
    return input[idx++];
  }

  return readLine;
}
let n;

const visit = new Array(9999).fill(0);

function clockCheck(a, b, c, d, e, f) {
  const res = (c - a) * (f - b) - (d - b) * (e - a);
  return res > 0 ? 1 : -1;
}

const X1 = new Array(9999);
const Y1 = new Array(9999);
const X2 = new Array(9999);
const Y2 = new Array(9999);

function cross(i, j) {
  const t1 =
    clockCheck(X1[i], Y1[i], X2[i], Y2[i], X1[j], Y1[j]) *
    clockCheck(X1[i], Y1[i], X2[i], Y2[i], X2[j], Y2[j]);
  const t2 =
    clockCheck(X1[j], Y1[j], X2[j], Y2[j], X1[i], Y1[i]) *
    clockCheck(X1[j], Y1[j], X2[j], Y2[j], X2[i], Y2[i]);
  return t1 < 0 && t2 < 0;
}

const graph1 = new Array(9999).fill().map(() => []);
const dNum = [];

function dfs1(v) {
  visit[v] = 1;
  for (const i of graph1[v]) {
    if (!visit[i]) dfs1(i);
  }
  dNum.push(v);
}

const graph2 = new Array(9999).fill().map(() => []);
const connect = new Array(9999).fill(0);

function dfs2(v, color) {
  connect[v] = color;
  for (const i of graph2[v]) {
    if (!connect[i]) dfs2(i, color);
  }
}

function getConnect() {
  for (let i = 0; i < 6 * n; i++) {
    if (!visit[i]) dfs1(i);
  }
  dNum.reverse();
  let cnt = 1;
  for (const i of dNum) {
    if (!connect[i]) dfs2(i, cnt++);
  }
}

function updateL(x) {
  if (x >= 3 * n) return x - 3 * n;
  else return x + 3 * n;
}

function addEdge(a, b) {
  graph1[a].push(b);
  graph2[b].push(a);
  graph1[updateL(b)].push(updateL(a));
  graph2[updateL(a)].push(updateL(b));
}

function solve() {
  const readLine = readFile("/dev/stdin");
  n = parseInt(readLine());
  for (let i = 0; i < 3 * n; i++) {
    const [x1, y1, x2, y2] = readLine().split(" ").map(Number);
    X1[i] = x1;
    Y1[i] = y1;
    X2[i] = x2;
    Y2[i] = y2;
  }
  for (let i = 0; i < n; i++) {
    addEdge(3 * i, updateL(3 * i + 1));
    addEdge(3 * i, updateL(3 * i + 2));
    addEdge(3 * i + 1, updateL(3 * i));
    addEdge(3 * i + 1, updateL(3 * i + 2));
    addEdge(3 * i + 2, updateL(3 * i));
    addEdge(3 * i + 2, updateL(3 * i + 1));
  }
  for (let i = 0; i < 3 * n; i++) {
    for (let j = i + 1; j < 3 * n; j++) {
      if (cross(i, j)) addEdge(updateL(i), j);
    }
  }
  getConnect();
  const result = [];
  for (let i = 0; i < 3 * n; i++) {
    if (connect[i] === connect[updateL(i)]) {
      console.log(-1);
      return;
    }
    if (connect[i] > connect[updateL(i)]) result.push(i + 1);
  }
  console.log(result.length);
  console.log(result.join(" "));
}

solve();