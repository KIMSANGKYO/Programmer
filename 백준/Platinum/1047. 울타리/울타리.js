const fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
const trees = [];
for (let i = 1; i <= N; i++) {
  const [x, y, nfence] = input[i].split(" ").map(Number);
  trees.push([x, y, nfence]);
}

function solution(n, trees) {
  let res = n;
  const x = [];
  const y = [];
  const nfence = [];
  const xsort = [];
  const ysort = [];

  for (let i = 0; i < n; i++) {
    const [xt, yt, nfencet] = trees[i];
    x[i] = xt;
    y[i] = yt;
    nfence[i] = nfencet;
    xsort[i] = xt;
    ysort[i] = yt;
  }

  xsort.sort((a, b) => a - b);
  ysort.sort((a, b) => a - b);

  const inArr = [];

  for (let a = 0; a < n; a++) {
    for (let b = a; b < n; b++) {
      for (let c = 0; c < n; c++) {
        for (let d = c; d < n; d++) {
          let ntree = 0;
          let outSum = 0;
          let inSum = 0;
          const need = 2 * (xsort[b] - xsort[a] + ysort[d] - ysort[c]);

          for (let i = 0; i < n; i++) {
            if (
              x[i] >= xsort[a] &&
              x[i] <= xsort[b] &&
              y[i] >= ysort[c] &&
              y[i] <= ysort[d]
            ) {
              ntree++;
              inArr.push(nfence[i]);
              inSum += nfence[i];
            } else {
              outSum += nfence[i];
            }
          }

          if (outSum >= need) {
            res = Math.min(res, n - ntree);
          } else {
            if (outSum + inSum >= need) {
              inArr.sort((a, b) => b - a);
              for (let i = 0; i < inArr.length; i++) {
                ntree--;
                outSum += inArr[i];
                if (outSum >= need) {
                  res = Math.min(res, n - ntree);
                  break;
                }
              }
            }
          }
          inArr.length = 0;
        }
      }
    }
  }

  return res;
}

console.log(solution(N, trees));