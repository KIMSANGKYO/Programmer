const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input[0];
const numbers = input[1].split(" ").map(Number);

let p = new Array(2001).fill(1);
let b = [];
let visit = [];
let result = [];
let n = N;
const arr = [];

for (let i = 2; i <= 2000; i++) {
  if (!p[i]) {
    continue;
  }
  for (let j = 2 * i; j <= 2000; j += i) {
    p[j] = 0;
  }
}

for (let i = 1; i < n; i++) {
  if (!p[numbers[0] + numbers[i]]) {
    continue;
  }
  let match = 1;
  b = new Array(n).fill(-1);
  b[0] = i;
  b[i] = 0;
  for (let j = 1; j < n; j++) {
    if (numbers[j] % 2 === 1 || i === j) {
      continue;
    }
    visit = new Array(n).fill(false);
    match += find(j);
  }
  if (match * 2 === n) {
    result.push(numbers[i]);
  }
}

result.sort((a, b) => a - b);
if (result.length === 0) {
  console.log("-1");
} else {
  for (let i = 0; i < result.length; i++) {
    arr.push(result[i]);
  }
}

function find(arg) {
  if (visit[arg]) {
    return 0;
  }
  visit[arg] = true;
  for (let i = 1; i < n; i++) {
    if (b[i] === 0 || !p[numbers[arg] + numbers[i]]) {
      continue;
    }
    if (b[i] === -1 || find(b[i])) {
      b[i] = arg;
      return 1;
    }
  }
  return 0;
}

const complete = arr.join(" ");
console.log(complete);