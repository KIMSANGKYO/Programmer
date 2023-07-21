function solution(game_board, table) {
  function match(mch, num) {
    const arr = [];
    const n = mch.length;
    const visit = new Array(n).fill(0).map(() => new Array(n).fill(false));

    function isValid(row, col) {
      return row >= 0 && row < n && col >= 0 && col < n;
    }

    function dfs(row, col) {
      if (!isValid(row, col) || visit[row][col] || mch[row][col] !== num) {
        return;
      }

      const Q = [[row, col]];
      visit[row][col] = true;
      let k = 0;

      while (k < Q.length) {
        const [r, c] = Q[k];
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (isValid(nr, nc) && !visit[nr][nc] && mch[nr][nc] === num) {
            Q.push([nr, nc]);
            visit[nr][nc] = true;
          }
        }
        k += 1;
      }

      arr.push(Q);
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!visit[i][j] && mch[i][j] === num) {
          dfs(i, j);
        }
      }
    }

    return arr;
  }

  function sorting(group) {
    let minR = 50, minC = 50;
    for (const [r, c] of group) {
      minR = Math.min(minR, r);
      minC = Math.min(minC, c);
    }

    for (let i = 0; i < group.length; i++) {
      group[i][0] -= minR;
      group[i][1] -= minC;
    }

    group.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    const arr = [];
    for (const [r, c] of group) {
      arr.push(r.toString());
      arr.push(c.toString());
    }

    return arr.join('');
  }

  function rotate(board) {
    for (let i = 0; i < board.length; i++) {
      const [r, c] = board[i];
      board[i][0] = c;
      board[i][1] = -r;
    }
  }

  const n = game_board.length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let result = 0;

  const block = match(table, 1);
  const blank = match(game_board, 0);

  for (let i = 0; i < block.length; i++) {
    block[i] = sorting(block[i]);
  }

  const temp = {};
  for (const i of block) {
    temp[i] = (temp[i] || 0) + 1;
  }

  for (let i = 0; i < blank.length; i++) {
    for (let j = 0; j < 4; j++) {
      rotate(blank[i]);
      const blankI = sorting(blank[i]);
      if (temp[blankI]) {
        temp[blankI]--;
        result += blankI.length / 2;
        break;
      }
    }
  }

  return result;
}
