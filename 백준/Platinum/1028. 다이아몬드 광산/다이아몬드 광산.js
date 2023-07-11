const fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString();

const maxRC = 800;
const UL = 1,
  UR = 2,
  DL = 3,
  DR = 4;
const DIR = 4;
const dirRef = [
  [0, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

function minCombine(a, b, c, d) {
  if (a < b && a < c && a < d) return a;
  else if (b < c && b < d) return b;
  else if (c < d) return c;
  else return d;
}

function findLongDP(r, c, map, diaRow) {
  for (let i = UL; i <= UR; i++) {
    for (let j = 1; j <= r; j++) {
      for (let k = 1; k <= c; k++) {
        if (map[j][k] === 0) diaRow[i][j][k] = 0;
        else
          diaRow[i][j][k] = Math.max(
            diaRow[i][j + dirRef[i][0]][k + dirRef[i][1]] + 1,
            1
          );
      }
    }
  }

  for (let i = DL; i <= DR; i++) {
    for (let j = r; j >= 1; j--) {
      for (let k = 1; k <= c; k++) {
        if (map[j][k] === 0) diaRow[i][j][k] = 0;
        else
          diaRow[i][j][k] = Math.max(
            diaRow[i][j + dirRef[i][0]][k + dirRef[i][1]] + 1,
            1
          );
      }
    }
  }
}

function findBigDia(r, c, diaRow) {
  let maxDia = 0;

  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      const maxAbleSize = minCombine(i, j, r - i + 1, c - j + 1);
      for (let k = maxAbleSize; k >= 1; k--) {
        if (
          diaRow[UL][i][j + k - 1] >= k &&
          diaRow[UR][i][j - k + 1] >= k &&
          diaRow[DL][i][j + k - 1] >= k &&
          diaRow[DR][i][j - k + 1] >= k
        ) {
          maxDia = Math.max(maxDia, k);
          break;
        }
      }
    }
  }

  return maxDia;
}

function solution() {
  const tempString = [];

  const lines = input.split("\n");
  const [r, c] = lines[0].split(" ").map(Number);

  for (let i = 1; i <= r; i++) {
    tempString.push(lines[i]);
  }

  const map = new Array(maxRC).fill(null).map(() => new Array(maxRC).fill(0));
  const diaRow = new Array(DIR + 1)
    .fill(null)
    .map(() => new Array(maxRC).fill(null).map(() => new Array(maxRC).fill(0)));

  for (let i = 1; i <= r; i++) {
    for (let j = 0; j < tempString[i - 1].length; j++) {
      map[i][j + 1] = tempString[i - 1][j] === "0" ? 0 : 1;
    }
  }

  findLongDP(r, c, map, diaRow);

  const result = findBigDia(r, c, diaRow);
  console.log(result);
}

solution();
