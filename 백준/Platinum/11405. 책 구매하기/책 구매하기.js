const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

function MCMF() {
  let c = Array.from({ length: 1010 }, () => Array(1010).fill(0)); // capacity
  let f = Array.from({ length: 1010 }, () => Array(1010).fill(0)); // flow
  let d = Array.from({ length: 1010 }, () => Array(1010).fill(0)); // dist
  let g = Array.from({ length: 1010 }, () => []); // graph
  let source, sink;

  this.init = function (_n) {
    n = _n + 1;
    source = sink = -1;
    c = Array.from({ length: 1010 }, () => Array(1010).fill(0));
    d = Array.from({ length: 1010 }, () => Array(1010).fill(0));
    f = Array.from({ length: 1010 }, () => Array(1010).fill(0));
  };

  this.setSource = function (s) {
    source = s;
  };

  this.setSink = function (t) {
    sink = t;
  };

  this.addEdge = function (s, e, cap, dist) {
    g[s].push(e);
    c[s][e] = cap;
    d[s][e] = dist;
    g[e].push(s);
    c[e][s] = 0;
    d[e][s] = -dist;
  };

  this.mcmf = function () {
    let minCost = 0;
    let prv = Array(1010).fill(-1);
    let dist = Array(1010).fill(Infinity);
    let inque = Array(1010).fill(false);

    while (true) {
      prv.fill(-1);
      dist.fill(Infinity);
      inque.fill(false);

      let q = [];
      dist[source] = 0;
      inque[source] = true;
      q.push(source);

      while (q.length) {
        let now = q.shift();
        inque[now] = false;
        for (let i = 0; i < g[now].length; i++) {
          let nxt = g[now][i];
          if (
            c[now][nxt] - f[now][nxt] > 0 &&
            dist[nxt] > dist[now] + d[now][nxt]
          ) {
            dist[nxt] = dist[now] + d[now][nxt];
            prv[nxt] = now;
            if (!inque[nxt]) {
              q.push(nxt);
              inque[nxt] = true;
            }
          }
        }
      }

      if (prv[sink] === -1) break;

      let flow = 1e9 + 7;
      for (let i = sink; i !== source; i = prv[i]) {
        flow = Math.min(flow, c[prv[i]][i] - f[prv[i]][i]);
      }

      for (let i = sink; i !== source; i = prv[i]) {
        minCost += flow * d[prv[i]][i];
        f[prv[i]][i] += flow;
        f[i][prv[i]] -= flow;
      }
    }

    return minCost;
  };
}

function solve(input) {
  let [n, m] = input[0].split(" ").map(Number);
  let s = 1001;
  let t = 1002;
  let flow = new MCMF();

  flow.init(1002);
  flow.setSource(s);
  flow.setSink(t);

  let ai = input[1].split(" ").map(Number);
  for (let i = 1; i <= n; i++) {
    flow.addEdge(100 + i, t, ai[i - 1], 0);
  }

  let bi = input[2].split(" ").map(Number);
  for (let i = 1; i <= m; i++) {
    flow.addEdge(s, i, bi[i - 1], 0);
  }

  for (let i = 3; i < input.length; i++) {
    let ci = input[i].split(" ").map(Number);
    for (let j = 101; j <= 100 + n; j++) {
      flow.addEdge(i - 2, j, 1e9 + 7, ci[j - 101]);
    }
  }

  return flow.mcmf();
}

console.log(solve(input));
