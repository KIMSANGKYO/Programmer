function solution(arr) {
  const n = (arr.length + 1) / 2; 
  const dpMax = new Array(n).fill(null).map(() => new Array(n).fill(-Infinity));
  const dpMin = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));


  for (let i = 0; i < n; i++) {
    dpMax[i][i] = parseInt(arr[i * 2]);
    dpMin[i][i] = parseInt(arr[i * 2]);
  }

  for (let gap = 1; gap < n; gap++) {
    for (let i = 0; i < n - gap; i++) {
      const j = i + gap;
      for (let k = i; k < j; k++) {
        const op = arr[k * 2 + 1];
        const leftMax = dpMax[i][k];
        const leftMin = dpMin[i][k];
        const rightMax = dpMax[k + 1][j];
        const rightMin = dpMin[k + 1][j];


        if (op === '+') {
          dpMax[i][j] = Math.max(dpMax[i][j], leftMax + rightMax);
          dpMin[i][j] = Math.min(dpMin[i][j], leftMin + rightMin);
        } else if (op === '-') {
          dpMax[i][j] = Math.max(dpMax[i][j], leftMax - rightMin);
          dpMin[i][j] = Math.min(dpMin[i][j], leftMin - rightMax);
        }
      }
    }
  }

  return dpMax[0][n - 1]; 
}
