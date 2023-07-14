const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

function add(x, c, res) {
  c[x]++;
  res += (c[x] * 2 - 1) * x;
  return res;
}

function erase(x, c, res) {
  c[x]--;
  res -= (c[x] * 2 + 1) * x;
  return res;
}

function main() {
  let inputIndex = 0;

  function readLine() {
    return input[inputIndex++];
  }

  function mip() {
    return readLine()
      .split(" ")
      .map((x) => parseInt(x));
  }

  function msp() {
    return readLine().split(" ");
  }

  function lmip() {
    return readLine()
      .split(" ")
      .map((x) => parseInt(x));
  }

  const c = Array(1000001).fill(0);
  let res = 0;

  const [n, qr] = mip();
  const a = [0].concat(lmip());
  const q = [];
  for (let i = 0; i < qr; i++) {
    const [x, y] = mip();
    q.push([i, x, y]);
  }

  const sqrtN = Math.floor(Math.sqrt(n));
  q.sort((a, b) => {
    const aDiv = Math.floor(a[1] / sqrtN);
    const bDiv = Math.floor(b[1] / sqrtN);
    if (aDiv !== bDiv) {
      return aDiv - bDiv;
    }
    return a[2] - b[2];
  });

  const ans = Array(qr).fill(0);

  let s = 0;
  let e = 0;

  for (let i = 0; i < qr; i++) {
    while (s < q[i][1]) {
      res = erase(a[s], c, res);
      s++;
    }
    while (s > q[i][1]) {
      s--;
      res = add(a[s], c, res);
    }
    while (e > q[i][2]) {
      res = erase(a[e], c, res);
      e--;
    }
    while (e < q[i][2]) {
      e++;
      res = add(a[e], c, res);
    }
    ans[q[i][0]] = res;
  }

  console.log(ans.join("\n"));
}

main();
