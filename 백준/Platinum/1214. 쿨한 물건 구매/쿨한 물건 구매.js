const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();
let [D, P, Q] = input.split(" ").map(Number);

function solution(D, P, Q) {
  if (D % P === 0 || D % Q === 0) return D;

  [P, Q] = [Math.max(P, Q), Math.min(P, Q)];
  const maxP = Math.floor(D / P) + 1;
  let answer = P * maxP;

  for (let i = maxP - 1; i >= 0; i--) {
    const [quo, remain] = [(D - i * P) / Q, (D - i * P) % Q];
    if (remain === 0) return D;
    const minV = i * P + (Math.floor(quo) + 1) * Q;
    if (answer === minV) break;
    answer = Math.min(answer, minV);
  }

  return answer;
}

const result = solution(D, P, Q);
console.log(result);