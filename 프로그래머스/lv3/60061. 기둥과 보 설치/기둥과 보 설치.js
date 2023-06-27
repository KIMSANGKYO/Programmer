function solution(n, build_frame) {
  const result = [];
  
  // 해당좌표 기둥 설치 가능 확인
  const canBuildPillar = (ans, x, y) => {
    if (y === 0) return true;
    else if (ans.find(([a, b, fr]) => a === x && b === y - 1 && fr === 0)) return true;
    else if (ans.find(([a, b, fr]) => a === x && b === y && fr === 1)) return true;
    else if (ans.find(([a, b, fr]) => a === x - 1 && b === y && fr === 1)) return true;
    return false;
  }
  
  // 해당좌표 보 설치 가능 확인
  const canBuildBeam = (ans, x, y) => {
    if (ans.find(([a, b, fr]) => a === x && b === y - 1 && fr === 0)) return true;
    else if (ans.find(([a, b, fr]) => a === x + 1 && b === y - 1 && fr === 0)) return true;
    else if (ans.find(([a, b, fr]) => a === x + 1 && b === y && fr === 1) &&
      ans.find(([a, b, fr]) => a === x - 1 && b === y && fr === 1)) return true;
    return false;
  }
  // 보,기둥 좌표설치 
  const buildFrame = (ans, x, y, fr) => {
  // 각 기둥이 설치가 불가한곳이면 
  // 각 보가 설치가 불가한곳이면
    if (fr === 0) {
      if (canBuildPillar(ans, x, y)) ans.push([x, y, fr]);
    } else {
      if (canBuildBeam(ans, x, y)) ans.push([x, y, fr]);
    }
  }
  // 해당좌표에서 보,기둥을 없앨 수 있는지 확인\
  const destroyFrame = (ans, x, y, fr) => {
    const copy = ans.slice();
    const idx = ans.findIndex(([a, b, f]) => a === x && b === y && f === fr);

    copy.splice(idx, 1);

    for (const [xpos, ypos, f] of copy) {
      if (f === 0) {
        if (!canBuildPillar(copy, xpos, ypos)) return;
      } else {
        if (!canBuildBeam(copy, xpos, ypos)) return;
      }
    }

    ans.splice(idx, 1);
  }

  for (const frame of build_frame) {
    const [x, y, fr, isInstall] = frame;

    if (isInstall) buildFrame(result, x, y, fr);
    else destroyFrame(result, x, y, fr);
  }

  return result.sort((a, b) => a[0] === b[0] ? a[1] === b[1] ? a[2] - b[2] : a[1] - b[1] : a[0] - b[0]);
}
