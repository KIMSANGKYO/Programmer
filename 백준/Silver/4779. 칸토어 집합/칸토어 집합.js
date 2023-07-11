const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
const lines = input.trim().split("\n");

function solution(N) {
  if (N === 0) {
    return "-";
  } else {
    const prevSet = solution(N - 1);
    const space = " ".repeat(Math.pow(3, N - 1));

    return prevSet + space + prevSet;
  }
}

lines.forEach((line) => {
  const N = parseInt(line);
  console.log(solution(N));
});