function solution(temperature, t1, t2, a, b, onboard) {
  const len = onboard.length;
  const MAX = Number.MAX_SAFE_INTEGER;
  // 인덱스 처리
  temperature += 10;
  t1 += 10;
  t2 += 10;

  const dp = Array.from({ length: 51 }, () => Array(len).fill(MAX));
  dp[temperature][0] = 0;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < 51; j++) {
      if (dp[j][i] === MAX) {
        continue;
      }

      for (let dt = 1; dt >= -1; dt--) {
        const next = j + dt;
        let cnt;

        if (next === temperature) {
          cnt = 0;
        } else if (next === j) {
          cnt = b;
        } else if (j < temperature && dt === 1) {
          cnt = 0;
        } else if (j > temperature && dt === -1) {
          cnt = 0;
        } else {
          cnt = a;
        }

        if (next < 0 || next > 50) {
          continue;
        }

        if (onboard[i + 1] === 1 && (next > t2 || next < t1)) {
          continue;
        }

        dp[next][i + 1] = Math.min(dp[next][i + 1], dp[j][i] + cnt);
      }
    }
  }

  const result = Math.min(...dp.map((ll) => ll[len - 1]));
  return result;
}

