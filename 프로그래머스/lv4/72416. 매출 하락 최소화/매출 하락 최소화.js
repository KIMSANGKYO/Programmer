function solution(sales, links) {
  const count = new Array(sales.length + 1);
  const dp = new Array(sales.length + 1).fill(0).map(() => [Number.MAX_VALUE, Number.MAX_VALUE]);
  const board = new Map();

  for (let i = 0; i < sales.length; i++) {
    count[i + 1] = sales[i];
  }

  for (let i = 0; i < links.length; i++) {
    const start = links[i][0];
    const end = links[i][1];
    if (board.has(start)) {
      board.get(start).push(end);
    } else {
      board.set(start, [end]);
    }
  }

  function dfs(cur, valid) {
    if (dp[cur][valid] !== Number.MAX_VALUE) return dp[cur][valid];
    if (!board.has(cur)) return valid === 0 ? 0 : count[cur];

    let result = valid === 0 ? 0 : count[cur];
    let dif = Number.MAX_VALUE;
    let judge = false;

    for (const target of board.get(cur)) {
      const noV = dfs(target, 0);
      const V = dfs(target, 1);
      dif = Math.min(dif, V - noV);

      if (noV < V) {
        result += noV;
      } else {
        result += V;
        judge = true;
      }
    }

    if (valid === 0 && !judge) {
      result += dif;
    }

    return dp[cur][valid] = result;
  }

  return Math.min(dfs(1, 0), dfs(1, 1));
}