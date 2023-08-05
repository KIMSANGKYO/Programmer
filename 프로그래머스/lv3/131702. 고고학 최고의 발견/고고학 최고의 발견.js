function solution(clockHands) {
  const len = clockHands.length;
  
  let result = Infinity;

    // 좌표, 시간, 각
  function rotate(x, y, cT, rot) {
    const dx = [0, -1, 1, 0, 0];
    const dy = [0, 0, 0, 1, -1];

    for (let k = 0; k < 5; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];
      // 범위체크
      if (nx >= 0 && nx < len && ny >= 0 && ny < len) {
        cT[ny][nx] = (cT[ny][nx] + rot) % 4;
      }
    }
  }  
    
  for (let i = 0; i < 4 ** len; i++) {
    let cur = 0;
    const curClock = JSON.parse(JSON.stringify(clockHands));

    for (let j = 0; j < len; j++) {
      const rot = Math.floor(i % (4 ** (j + 1)) / (4 ** j));
      if (rot === 0) continue;

      rotate(j, 0, curClock, rot);
      cur += rot;
    }

    for (let y = 1; y < len; y++) {
      for (let x = 0; x < len; x++) {
        if (curClock[y - 1][x] === 0) continue;
        const rat = 4 - curClock[y - 1][x];
        rotate(x, y, curClock, rat);
        cur += rat;
      }
    }

    if (curClock[len - 1].every(control => control === 0)) {
      result = Math.min(result, cur);
    }
  }

  return result;
}

