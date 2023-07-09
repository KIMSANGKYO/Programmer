function move(board, start, end) {
  if (start[0] === end[0] && start[1] === end[1]) return 0;
  const queue = [[start[0], start[1], 0]];  // 시작 위치와 이동 횟수
  const visit = new Set();  // 방문한 위치를 저장
  visit.add(start.join(','));

  while (queue.length > 0) {
    const [x, y, c] = queue.shift();
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];  // 이동 가능한 방향

    for (const [dx, dy] of directions) {
      let nx = x + dx;  // 일반적인 이동
      let ny = y + dy;

      let cx = x;
      let cy = y;
      while (true) {
        cx += dx;  // Ctrl + 이동
        cy += dy;
        if (!(0 <= cx && cx <= 3 && 0 <= cy && cy <= 3)) {  // 보드 범위를 벗어나면 이전 위치로 돌아감
          cx -= dx;
          cy -= dy;
          break;
        } else if (board[cx][cy] !== 0) {  // 카드를 만나면 이동 중단
          break;
        }
      }

      if ((nx === end[0] && ny === end[1]) || (cx === end[0] && cy === end[1])) {  // 도착지에 도달한 경우
        return c + 1;
      }

      const newPosition = [nx, ny].join(',');  // 새로운 위치
      const ctrlPosition = [cx, cy].join(',');  // Ctrl 이동 위치
      if (0 <= nx && nx <= 3 && 0 <= ny && ny <= 3 && !visit.has(newPosition)) {  // 새로운 위치를 방문하지 않았을 경우
        queue.push([nx, ny, c + 1]);
        visit.add(newPosition);
      }
      if (!visit.has(ctrlPosition)) {  
        queue.push([cx, cy, c + 1]);
        visit.add(ctrlPosition);
      }
    }
  }
}

function calCost(board, cdict, curr, order, cost) {
  if (order.length === 0) return cost;  // 모든 카드를 확인한 경우 현재까지의 조작 횟수 반환

  const idx = order[0] + 1;  // 현재 선택해야 할 카드의 종류
  const choice1 =
    move(board, curr, cdict[idx][0]) +
    move(board, cdict[idx][0], cdict[idx][1]) +
    2;  // 현재 위치에서 A1까지의 이동 횟수 + A1에서 A2까지의 이동 횟수 + 2 (카드 선택)
  const choice2 =
    move(board, curr, cdict[idx][1]) +
    move(board, cdict[idx][1], cdict[idx][0]) +
    2;  

  const newBoard = [...board.map(row => [...row])];  
  newBoard[cdict[idx][0][0]][cdict[idx][0][1]] = 0;  // 선택한 카드를 보드에서 제거
  newBoard[cdict[idx][1][0]][cdict[idx][1][1]] = 0;

  if (choice1 < choice2) {  // 더 적은 이동 횟수를 한 경우
    return calCost(newBoard, cdict, cdict[idx][1], order.slice(1), cost + choice1);
  } else {
    return calCost(newBoard, cdict, cdict[idx][0], order.slice(1), cost + choice2);
  }
}

function solution(board, r, c) {
  let answer = Infinity;
  const cdict = {};  // 좌표저장객체
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const num = board[row][col];
      if (num !== 0) {
        if (!cdict[num]) cdict[num] = [];
        cdict[num].push([row, col]);
      }
    }
  }

  const permArr = Array.from({ length: Object.keys(cdict).length }, (_, i) => i);
  const permResult = getPermutations(permArr, permArr.length);  // 순열 생성
  for (const order of permResult) {
    answer = Math.min(answer, calCost(board, cdict, [r, c], order, 0));
  }

  return answer;
}

// 순열 생성
function getPermutations(arr, size) {
  const results = [];
  const visited = new Array(arr.length).fill(false);

  function permute(path) {
    if (path.length === size) {
      results.push(path.slice());
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        path.push(arr[i]);
        permute(path);
        path.pop();
        visited[i] = false;
      }
    }
  }

  permute([]);
  return results;
}