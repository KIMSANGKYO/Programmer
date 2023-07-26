function solution(k, n, reqs) {
  const board = new Array(6).fill(null).map(() => ({
    waitTime: [],
    times: [],
    mentoCnt: 0,
  }));

  for (let i = 0; i < reqs.length; i++) {
    board[reqs[i][2]].times.push([reqs[i][0], reqs[i][1]]);
  }

  const mentos = [];
  for (let i = 0; i < 6; i++) {
    if (board[i].times.length > 0) {
      mentos.push(i);
    }
  }

  for (let i = 0; i < mentos.length; i++) {
    board[mentos[i]].waitTime = waitTime(board[mentos[i]].times, n);
  }

  for (let i = 1; i <= k; i++) {
    board[i].mentoCnt = 1;
    n--;
  }

  while (n > 0) {
    let maxTime = 0;
    let maxCnt = 0;

    for (let i = 0; i < mentos.length; i++) {
      const num = board[mentos[i]].mentoCnt;
      if (maxTime < board[mentos[i]].waitTime[num] - board[mentos[i]].waitTime[num + 1]) {
        maxTime = board[mentos[i]].waitTime[num] - board[mentos[i]].waitTime[num + 1];
        maxCnt = mentos[i];
      }
    }

    if (maxCnt > 0) {
      board[maxCnt].mentoCnt++;
      n--;
    } else {
      return 0;
    }
  }

  
  let result = 0;
  for (let i = 0; i < mentos.length; i++) {
    const cnt = board[mentos[i]].mentoCnt;
    result += board[mentos[i]].waitTime[cnt];
  }

  return result;
}


function waitTime(times, mentoCnt) {
  const timesSort = times.sort((a,b)=>a[0] - b[0]);
  const waitTime = new Array(mentoCnt + 1).fill(0);

  for (let i = 1; i <= mentoCnt; i++) {
    waitTime[i] = waitSum(timesSort, i);
  }

  return waitTime;
}

function waitSum(times, mentoCnt) {
  let sumWaitTime = 0;
  const waitB = new Array(mentoCnt).fill(-1); 

  for (let i = 0; i < times.length; i++) {
    if (waitB[0] <= times[i][0]) {
      waitB[0] = times[i][1] + times[i][0];
    } else {
      sumWaitTime += waitB[0] - times[i][0];
      waitB[0] = waitB[0] + times[i][1];
    }
    waitB.sort((a, b) => a - b);
  }

  return sumWaitTime;
}

