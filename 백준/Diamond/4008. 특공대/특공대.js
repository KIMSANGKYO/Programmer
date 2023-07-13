const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const N = +input[0];
const [a, b, c] = input[1].split(" ").map(Number);

function evalLine(line, x) {
  return line.m * x + line.c;
}

function intersectX(line1, line2) {
  return (line1.c - line2.c) / (line2.m - line1.m);
}

function graph(N, a, b, c, input) {
  const v = input[2].split(" ").map(Number);
  const pv = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; ++i) {
    pv[i] = v[i - 1] + pv[i - 1];
  }

  const dq = [];
  dq.push({ m: 0, c: 0 });
  let ans = 0;
  for (let i = 1; i <= N; i++) {
    while (dq.length >= 2 && evalLine(dq[0], pv[i]) <= evalLine(dq[1], pv[i])) {
      dq.shift();
    }

    ans = evalLine(dq[0], pv[i]);

    const cur = {
      m: -2 * a * pv[i],
      c:
        a * pv[i] * pv[i] - b * pv[i] + ans + a * pv[i] * pv[i] + b * pv[i] + c,
    };

    while (
      dq.length >= 2 &&
      intersectX(cur, dq[dq.length - 1]) <=
        intersectX(dq[dq.length - 1], dq[dq.length - 2])
    ) {
      dq.pop();
    }

    dq.push(cur);
  }

  return ans + a * pv[N] * pv[N] + b * pv[N] + c;
}

const result = graph(N, a, b, c, input);
console.log(result);
