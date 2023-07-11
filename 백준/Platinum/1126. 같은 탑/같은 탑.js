const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input[0];
const heights = input[1].split(" ").map(Number);

function solve() {
  if (N == 1) {
    console.log(-1);
    return;
  }

  const totalSum = heights.reduce((a, b) => a + b);
  const dp = Array(N)
    .fill(0)
    .map(() => Array(totalSum).fill(-1));
  dp[0][0] = 0;
  dp[0][heights[0]] = heights[0];

  for (let ind = 0; ind < N - 1; ind++) {
    for (let j = 0; j < totalSum / 2 + 1; j++) {
      if (dp[ind][j] != -1) {
        dp[ind + 1][j] = Math.max(dp[ind + 1][j], dp[ind][j]);
        if (j + heights[ind + 1] < totalSum) {
          dp[ind + 1][j + heights[ind + 1]] = Math.max(
            dp[ind + 1][j + heights[ind + 1]],
            dp[ind][j] + heights[ind + 1]
          );
        }
        if (heights[ind + 1] > j) {
          dp[ind + 1][heights[ind + 1] - j] = Math.max(
            dp[ind + 1][heights[ind + 1] - j],
            dp[ind][j] + heights[ind + 1] - j
          );
        } else {
          dp[ind + 1][j - heights[ind + 1]] = Math.max(
            dp[ind + 1][j - heights[ind + 1]],
            dp[ind][j]
          );
        }
      }
    }
  }

  if (dp[N - 1][0] == 0) {
    console.log(-1);
  } else {
    console.log(dp[N - 1][0]);
  }
}

solve();
