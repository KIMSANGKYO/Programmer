const fs = require("fs");
const readline = require("readline");

const inputFile = "/dev/stdin";

function solve() {
  const [N, P] = input().split(" ").map(Number);

  const length = N * 2;
  const flow = Array(length)
    .fill(0)
    .map(() => Array(length).fill(0));
  const capacity = Array(length)
    .fill(0)
    .map(() => Array(length).fill(0));
  const connect = Array(length)
    .fill()
    .map(() => []);

  for (let i = 0; i < N; i++) {
    connect[i].push(i + N);
    connect[i + N].push(i);
    capacity[i][i + N] = 1;
  }

  for (let i = 0; i < P; i++) {
    const [a, b] = input().split(" ").map(Number);
    const aIdx = a - 1;
    const bIdx = b - 1;

    connect[aIdx + N].push(bIdx);
    connect[bIdx].push(aIdx + N);
    capacity[aIdx + N][bIdx] = 1;

    connect[bIdx + N].push(aIdx);
    connect[aIdx].push(bIdx + N);
    capacity[bIdx + N][aIdx] = 1;
  }

  const start = N;
  const end = 1;
  let answer = 0;

  while (true) {
    const prev = Array(length).fill(-1);
    const queue = [start];

    while (queue.length > 0) {
      const here = queue.shift();

      if (here === end) {
        break;
      }

      for (const there of connect[here]) {
        if (
          capacity[here][there] - flow[here][there] > 0 &&
          prev[there] === -1
        ) {
          prev[there] = here;
          queue.push(there);
        }
      }
    }

    if (prev[end] === -1) {
      break;
    }

    let here = end;
    while (here !== start) {
      flow[prev[here]][here] += 1;
      flow[here][prev[here]] -= 1;
      here = prev[here];
    }

    answer += 1;
  }

  console.log(answer);
}

function convertToNumberArray(input) {
  return input.split(" ").map(Number);
}

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
});

let lines = [];
let lineIndex = 0;

function input() {
  return lines[lineIndex++];
}

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  solve();
});