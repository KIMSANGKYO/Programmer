const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").trim();
const lines = input.split("\n");
let lineIndex = 0;

const T = parseInt(lines[lineIndex++]);

function dfs(current, visit, graph, b) {
  visit[current] = 1;
  for (const next of graph[current]) {
    if (b[next] === -1 || (!visit[b[next]] && dfs(b[next], visit, graph, b))) {
      b[next] = current;
      return 1;
    }
  }
  return 0;
}

for (let t = 0; t < T; t++) {
  const [n, m] = lines[lineIndex++].split(" ").map(Number);
  const graph = new Array(n).fill(null).map(() => []);
  const b = new Array(n).fill(-1);

  for (let i = 0; i < m; i++) {
    const [u, v] = lines[lineIndex++].split(" ").map(Number);
    graph[u].push(v);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    const visit = new Array(n).fill(0);
    result += dfs(i, visit, graph, b);
  }

  console.log(result);
}
