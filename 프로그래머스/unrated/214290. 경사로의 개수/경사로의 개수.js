function solution(grid, d, k) {
  const MOD = 1000000007;
  const n = grid.length;
  const m = grid[0].length;
  let oneL = dirRoad(grid, d, n, m);
  let board = null;
  let cnt = 1;

  while (cnt <= k) {
    if ((cnt & k) === cnt) {
      board = roadLink(board, oneL, n, m);
    }
    oneL = roadLink(oneL, oneL, n, m);
    cnt <<= 1;
  }

  let result = 0;
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < m; b++) {
      for (let c = 0; c < n; c++) {
        for (let q = 0; q < m; q++) {
          result = (result + board[a][b][c][q]) % MOD;
        }
      }
    }
  }
  return result;
}


function dirRoad(grid, d, n, m) {
  let board = null; 
  const MOD = 1000000007;
  for (let s of d) {
    let RBoard = board;
    board = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => Array.from({ length: n }, () => Array(m).fill(0)))
    );

    for (let a = 0; a < n; a++) {
      for (let b = 0; b < m; b++) {
        if (a > 0 && grid[a - 1][b] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a - 1][b][a][b] = 1;
          } else {
            for (let c = 0; c < n; c++) {
              for (let q = 0; q < m; q++) {
                board[a - 1][b][c][q] = (board[a - 1][b][c][q] + RBoard[a][b][c][q]) % MOD;
              }
            }
          }
        }
        if (b > 0 && grid[a][b - 1] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a][b - 1][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a][b - 1][w][e] = (board[a][b - 1][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
        if (a < n - 1 && grid[a + 1][b] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a + 1][b][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a + 1][b][w][e] = (board[a + 1][b][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
        if (b < m - 1 && grid[a][b + 1] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a][b + 1][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a][b + 1][w][e] = (board[a][b + 1][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
      }
    }
  }
  return board;
}

function roadLink(r1, r2, n, m) {
  const MOD = 1000000007;
  if (r1 === null) {
    return r2;
  }
  if (r2 === null) {
    return r1;
  }

  const board = Array.from({ length: n }, () => Array.from({ length: m }, () => Array.from({ length: n }, () => Array(m).fill(0))));

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < m; b++) {
      for (let c = 0; c < n; c++) {
        for (let q = 0; q < m; q++) {
          for (let w = 0; w < n; w++) {
            for (let e = 0; e < m; e++) {
              const p = BigInt(r1[a][b][c][q]) * BigInt(r2[c][q][w][e]) % BigInt(MOD);
              board[a][b][w][e] = (board[a][b][w][e] + Number(p)) % MOD;
            }
          }
        }
      }
    }
  }
  return board;
}






// function solution(grid, d, k) {
//   const MOD = 1000000007;
//   const n = grid.length;
//   const m = grid[0].length;


//   function matrix(row, col) {
//     let board = new Array(row.length).fill().map(() => new Array(col[0].length).fill(0));

//     for (let i = 0; i < row.length; ++i) {
//       for (let j = 0; j < col[0].length; ++j) {
//         let cnt = 0;

//         for (let k = 0; k < row[0].length; ++k) {
//           cnt += (row[i][k] * col[k][j]) % MOD;
//           cnt %= MOD; 
//         }

//         board[i][j] = cnt;
//       }
//     }

//     return board;
//   }

// function calc(i, j, d, grid) {
//   const k = d.length;
//   const resSave = new Map();
//   resSave.set(i * m + j, 1);

//   for (let t = 0; t < k; ++t) {
//     const curRes = new Map();
//     const dir = d[t];

//     for (const [idx, cnt] of resSave.entries()) {
//       const ci = Math.floor(idx / m); // 이전 위치의 행 인덱스 보존
//       const cj = idx % m; // 이전 위치의 열 인덱스 보존
//       const curV = grid[ci][cj]; // 이전 위치의 값 보존

//       // 각 방향으로 이동 가능한 경우의 수
//       if (ci - 1 >= 0 && grid[ci - 1][cj] - curV === dir) {
//         curRes.set((ci - 1) * m + cj, (curRes.get((ci - 1) * m + cj) || 0) + cnt);
//       }
//       if (ci + 1 < n && grid[ci + 1][cj] - curV === dir) {
//         curRes.set((ci + 1) * m + cj, (curRes.get((ci + 1) * m + cj) || 0) + cnt);
//       }
//       if (cj - 1 >= 0 && grid[ci][cj - 1] - curV === dir) {
//         curRes.set(ci * m + cj - 1, (curRes.get(ci * m + cj - 1) || 0) + cnt);
//       }
//       if (cj + 1 < m && grid[ci][cj + 1] - curV === dir) {
//         curRes.set(ci * m + cj + 1, (curRes.get(ci * m + cj + 1) || 0) + cnt);
//       }
//     }
//     resSave.clear();
//     for (const [idxCur, cntCur] of curRes.entries()) {
//       resSave.set(idxCur, cntCur % MOD);
//     }
//   }

//   return resSave;
// }  
//   function createMatrix(row, col, initialValue) {
//      return Array.from({ length: row }, () => Array(col).fill(initialValue));
//   }

//   let mat1 = createMatrix(n*m, n*m, 0);
//   let mat2 = createMatrix(n*m, n*m, 0);

//   for (let i = 0; i < n; ++i) {
//     for (let j = 0; j < m; ++j) {
//       let idx = i * m + j;
//       mat2[idx][idx] = 1;
//       let current = calc(i, j, d, grid);
//       for (const [curIdx, curCnt] of current.entries()) {
//         mat1[idx][curIdx] = curCnt;
//       }
//     }
//   }

//   while (k > 0) {
//     if (k % 2 === 1) {
//       mat2 = matrix(mat2, mat1).map(row => row.map(val => val % MOD)); 
//     }
//     mat1 = matrix(mat1, mat1).map(row => row.map(val => val % MOD)); 
//     k = Math.floor(k / 2);
//   }

//   let result = 0;
//   for (const row of mat2) {
//     for (const v of row) {
//       result += v;
//       result %= MOD; 
//     }
//   }
//   return result;
// }



// function solution(grid, d, k) {
//   const MOD = 1000000007;
//   const n = grid.length;
//   const m = grid[0].length;
//   const dx = [0, 0, 1, -1];
//   const dy = [1, -1, 0, 0];

//   let memo = new Array(k * d.length);
//   for (let i = 0; i < k * d.length; i++) {
//     memo[i] = new Array(n).fill(null).map(() => new Array(m).fill(null));
//   }

//   function isValid(i, j) {
//     return i >= 0 && i < n && j >= 0 && j < m;
//   }

//   function dfs(i, j, idx, sum) {
//     if (idx === d.length * k) {
//       return 1;
//     }

//     if (memo[idx][i][j] !== null) {
//       return memo[idx][i][j];
//     }

//     let count = 0;
//     for (let k = 0; k < 4; k++) {
//       const ni = i + dx[k];
//       const nj = j + dy[k];

//       if (isValid(ni, nj)) {
//         const diff = grid[ni][nj] - grid[i][j];
//         if (diff === d[idx % d.length]) {
//           count = (count + dfs(ni, nj, idx + 1, sum + diff)) % MOD;
//         }
//       }
//     }

//     memo[idx][i][j] = count;
//     return count;
//   }

//   let result = 0;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       result = (result + dfs(i, j, 0, 0)) % MOD;
//     }
//   }

//   return result;
// }



