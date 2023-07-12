const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +input[0];
const pl = [];
for (let i = 1; i <= n; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  pl.push([x, y]);
}

pl.sort((a, b) => a[0] - b[0]);

function getDist(p1, p2) {
  return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
}

function dac(start, end) {
  if (start === end) {
    return Infinity;
  }

  if (end - start === 1) {
    return getDist(pl[start], pl[end]);
  }

  const mid = Math.floor((start + end) / 2);
  let minDist = Math.min(dac(start, mid), dac(mid + 1, end));

  const targetPl = [];
  for (let i = start; i <= end; i++) {
    if ((pl[mid][0] - pl[i][0]) ** 2 < minDist) {
      targetPl.push(pl[i]);
    }
  }

  targetPl.sort((a, b) => a[1] - b[1]);

  const t = targetPl.length;
  for (let i = 0; i < t - 1; i++) {
    for (let j = i + 1; j < t; j++) {
      if ((targetPl[i][1] - targetPl[j][1]) ** 2 < minDist) {
        minDist = Math.min(minDist, getDist(targetPl[i], targetPl[j]));
      } else {
        break;
      }
    }
  }

  return minDist;
}

console.log(dac(0, n - 1));