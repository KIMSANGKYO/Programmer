function solution(a) {
    const mod = 10000019;
    const rowLen = a.length;
    const colLen = a[0].length;
    
    
    function combine(v, row) {
        v[0][0] = 1;
        for (let i = 1; i <= row; i++) {
            for (let j = 0; j <= row; j++) {
                if (j === 0) v[i][j] = 1;
                else if (i === j) v[i][j] = 1;
                else v[i][j] = (v[i - 1][j - 1] + v[i - 1][j]) % mod;
            }
        }
    }

    function count(v, board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                v[j] += board[i][j];
            }
        }
    }

    const nv = new Array(rowLen + 1).fill().map(() => new Array(rowLen + 1).fill(0));
    combine(nv, rowLen);

    const cntCheck = new Array(colLen + 1).fill(0);
    count(cntCheck, a);

    const dp = new Array(colLen + 2).fill().map(() => new Array(rowLen + 1).fill(0));
    dp[1][rowLen - cntCheck[0]] = nv[rowLen][rowLen - cntCheck[0]];
    
      
    for (let i = 1; i < colLen; i++) {
        const OneCnt = cntCheck[i];
        for (let j = 0; j <= rowLen; j++) {
            if (dp[i][j] === 0) continue;
            for (let k = 0; k <= OneCnt; k++) {
                if (j < k) continue;

                const evenRow = j + OneCnt - (2 * k);
                if (evenRow > rowLen) continue;

                const Result = (nv[j][k] * nv[rowLen - j][OneCnt - k]) % mod;
                dp[i + 1][evenRow] = (dp[i + 1][evenRow] + dp[i][j] * Result) % mod;
            }
        }
    }
    return dp[colLen][rowLen];
}