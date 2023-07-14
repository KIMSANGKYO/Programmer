const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const T = +input[0];

let testCases = [];
let index = 1;
for (let i = 0; i < T; i++) {
  const [c, d, v] = input[index++].split(" ").map(Number);
  let votes = [];
  for (let j = 0; j < v; j++) {
    const [chosen, eliminated] = input[index++].split(" ");
    votes.push([chosen, eliminated]);
  }
  testCases.push({ c, d, v, votes });
}

function clearStatus(A, v1, v2, vst) {
  for (let i = 0; i < 501; ++i) {
    A[i] = [];
    v1[i] = "";
    v2[i] = "";
    vst[i] = -1;
  }
}

function match(A, chk, vst, a) {
  for (let b of A[a]) {
    if (chk[b]) continue;
    chk[b] = true;
    if (vst[b] === -1 || match(A, chk, vst, vst[b])) {
      vst[b] = a;
      return true;
    }
  }
  return false;
}

function solve(testCases) {
  let result = "";

  const A = Array.from({ length: 501 }, () => []);
  const v1 = Array(501).fill("");
  const v2 = Array(501).fill("");
  const vst = Array(501).fill(-1);
  const chk = Array(501).fill(false);

  for (const { c, d, v, votes } of testCases) {
    clearStatus(A, v1, v2, vst);

    for (let i = 0; i < v; ++i) {
      v1[i] = votes[i][0];
      v2[i] = votes[i][1];
    }

    for (let i = 0; i < v - 1; ++i) {
      for (let j = i + 1; j < v; ++j) {
        if (v1[i] === v2[j] || v1[j] === v2[i]) {
          if (v1[i][0] === "C") A[i].push(j);
          else A[j].push(i);
        }
      }
    }

    let sum = 0;
    for (let i = 0; i < v; ++i) {
      chk.fill(false);
      if (match(A, chk, vst, i)) ++sum;
    }
    result += `${v - sum}\n`;
  }

  return result;
}

const results = solve(testCases);
console.log(results);