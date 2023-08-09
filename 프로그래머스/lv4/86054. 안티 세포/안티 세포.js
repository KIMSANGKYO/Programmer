function solution(a, s) {
    const result = [];
    const MOD = Math.pow(10, 9) + 7; // 10^9 + 7
    // 왼쪽부터 순차 탐색, 이분탐색 시작값 갱신
    function fromLeft(arr, stand) {
        let left = 0;
        let right = arr.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] < stand) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
    // 이분탐색
    function binary(arr, stand) {
        const idx = fromLeft(arr, stand);

        if (idx === 0 && arr[idx] !== stand) {
            return -1;
        } else if (idx === arr.length) {
            return -1;
        } else {
            return idx;
        }
    }

    function getAnti(b) {
        // s 의 b의 최대길이값
        const n = b.length;
        // 인덱스, b 값 저장 
        const bBoard = [0, b[0]];
        for (let i = 1; i < n; i++) {
            bBoard.push(bBoard[bBoard.length - 1] + b[i]);
        }

        const maxB = Math.ceil(Math.log2(bBoard[bBoard.length - 1]));

        const dp = Array.from({ length: n }, () => Array(maxB + 1).fill(0));
        dp[0][0] = 1;

        for (let i = 1; i < n; i++) {
            dp[i][0] = dp[i - 1].reduce((acc, val) => acc + val, 0);

            for (let e = 1; e <= maxB; e++) {
                if (dp[i][e - 1] === 0) {
                    continue;
                }

                const current = bBoard[i + 1] - b[i] * Math.pow(2, e - 1);
                // 중간값 인덱스 확인
                const midV = binary(bBoard, current);
                if (midV === -1) {
                    continue;
                }
                // 소수 체크
                const primV = Math.log2(b[i] / b[midV - 1]) + (e - 1);
                if (!Number.isInteger(primV) || primV < 0) {
                    continue;
                }

                if (dp[midV - 1][parseInt(primV)] <= 0) {
                    continue;
                }

                const endV = binary(bBoard, bBoard[i + 1] - b[i] * Math.pow(2, e));
                if (endV === -1) {
                    continue;
                }

                if (endV === 0) {
                    dp[i][e] = 1;
                } else {
                    dp[i][e] = dp[endV - 1].reduce((acc, val) => acc + val, 0) % MOD;
                }
            }
        }

        return dp[n - 1].reduce((acc, val) => acc + val, 0) % MOD;
    }
    // 시작 인덱스
    let start = 0;
    
    for (const leng of s) {
        const b = a.slice(start, start + leng);
        result.push(getAnti(b));
        start += leng;
    }

    return result;
}
