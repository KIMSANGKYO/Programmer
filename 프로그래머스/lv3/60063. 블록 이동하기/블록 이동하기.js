const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
// 수직이동 
function isRobotVertical(robot) {
  const [a, b] = robot;
  if (a[0] === b[0]) {
    return false;
  }
  return true;
}

// 이동가능경로
function canMove(board, robot) {
  const N = board.length;
  const cands = [];
  const [a, b] = robot;

  for (const [dx, dy] of directions) {
    const n_a = [a[0] + dx, a[1] + dy];
    const n_b = [b[0] + dx, b[1] + dy];

    if (!(0 <= n_a[0] && n_a[0] < N) || !(0 <= n_a[1] && n_a[1] < N)) {
      continue;
    }

    if (!(0 <= n_b[0] && n_b[0] < N) || !(0 <= n_b[1] && n_b[1] < N)) {
      continue;
    }

    if (board[n_a[0]][n_a[1]] === 0 && board[n_b[0]][n_b[1]] === 0) {
      cands.push([n_a, n_b]);
    }
  }
  return cands;
}
//회전가능경로
function canRotate(board, robot) {
  const N = board.length;
  const [a, b] = robot;
  const cands = [];
  let selectedDirs = [];

  if (isRobotVertical(robot)) {
    selectedDirs = directions.slice(0, 2);
  } else {
    selectedDirs = directions.slice(2);
  }

  for (const [dx, dy] of selectedDirs) {
    const n_a = [a[0] + dx, a[1] + dy];
    const n_b = [b[0] + dx, b[1] + dy];

    if (!(0 <= n_a[0] && n_a[0] < N) || !(0 <= n_a[1] && n_a[1] < N)) {
      continue;
    }

    if (!(0 <= n_b[0] && n_b[0] < N) || !(0 <= n_b[1] && n_b[1] < N)) {
      continue;
    }

    if (board[n_a[0]][n_a[1]] === 0 && board[n_b[0]][n_b[1]] === 0) {
      cands.push([a, n_a]);
      cands.push([b, n_b]);
    }
  }
  return cands;
}

function solution(board) {
  const N = board.length;
  //방문여부 확인
  const visited = {};

  const queue = [];
  const initialRobot = [
    [0, 0],
    [0, 1],
  ];

  queue.push(initialRobot);
  visited[initialRobot] = 0;

  while (queue.length > 0) {
      // 경로를 큐에서 빼내기
    const node = queue.shift();
    if (node[0][0] === N - 1 && node[0][1] === N - 1 || node[1][0] === N - 1 && node[1][1] === N - 1) {
      return visited[node];
    }

    const nextNodes = canMove(board, node).concat(canRotate(board, node));
    for (const cand of nextNodes) {
      if (!(cand in visited)) {
        queue.push(cand);
        visited[cand] = visited[node] + 1;
      }
    }
  }
}


// 실행시간초과 // 
// function solution(board) {
//     // board 외벽 감싸기
//     const N = board.length;
//     const newBoard = Array.from({length:N+2},()=> Array(N+2).fill(1));
    
//     for(let i=0; i<N; i++){
//         for(let j=0; j<N; j++){
//             newBoard[i+1][j+1] = board[i][j];
//         }
//     }
//     // 방문 확인
//     const visited = Array.from({length:N+2},()=> Array(N+2).fill(false));

//     // 이동 함수 생성
//     function move(cur1,cur2,newBoard,visited){
//         const can = [];
        
//         // 평행 이동 // 좌표계
//         const parallel = [[-1,0],[1,0],[0,1],[0,-1]];
//         for(const [dy,dx] of parallel){
//             const next1 = [cur1[0]+dy,cur1[1]+dx];
//             const next2 = [cur2[0]+dy,cur2[1]+dx];
//             if(newBoard[next1[0]][next1[1]]===0 && newBoard[next2[0]][next2[1]]===0){
//                 can.push([next1,next2]);
//             }
//         }
        
//         // 회전
//         // 가로
//         if(cur1[0]===cur2[0]){
//             const up =-1;
//             const down = 1;
//             for(const i of [up,down]){
//                 if(newBoard[cur1[0]+i][cur1[1]]===0 && newBoard[cur2[0]+i][cur2[1]]===0){
//                     can.push([cur1,[cur1[0]+i,cur1[1]]]);
//                     can.push([cur2,[cur2[0]+i,cur2[1]]]);
//                 }
//             }
//         }else{
//             //세로
//             const left = -1;
//             const right = 1;
//             for(const k of [left,right]){
//                 if(newBoard[cur1[0]][cur1[1]+k]===0 && newBoard[cur2[0]][cur2[1]+k]===0){
//                     can.push([[cur1[0],cur1[1]+k],cur1]);
//                     can.push([[cur2[0],cur2[1]+k],cur2]);
//                 }
//             }
//         }
        
//         return can;
//     }
    
    
//     // 현재 좌표 위치
//     const que = [[[1,1],[1,2],0]];
//     visited[1][1] = true;
    
//     while(que.length > 0){
//         const [cur1,cur2,count] = que.shift();
//         if(cur1[0]===N && cur1[1]===N || cur2[0]===N && cur2[1]===N){
//             return count;
//         }
//         for(const next of move(cur1,cur2,newBoard,visited)){
//             const next1 = next[0];
//             const next2 = next[1];
            
//             que.push([...next,count+1]);
//             visited[next1[0]][next1[1]]=true;
//             visited[next2[0]][next2[1]]=true;
//         }
//     }
// }