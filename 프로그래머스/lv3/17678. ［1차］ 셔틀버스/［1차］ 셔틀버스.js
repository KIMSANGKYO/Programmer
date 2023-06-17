function solution(n, t, m, timetable) {
  const shuttleStartTime = 9 * 60; // 셔틀의 출발 시각을 분으로 변환

  const arrivalTimes = timetable.map(time => {
    const [hour, minute] = time.split(":");
    return parseInt(hour) * 60 + parseInt(minute);
  }).sort((a, b) => b - a);

  let lastArrivalTime = 0;

  for (let i = 0; i < n; i++) {
    const shuttleTime = shuttleStartTime + i * t;
    let count = 0;

    for (let j = 0; j < m; j++) {
      if (arrivalTimes.length === 0 || arrivalTimes[arrivalTimes.length - 1] > shuttleTime) break;

      const arrivalTime = arrivalTimes.pop();
      if (j === m - 1) {
        lastArrivalTime = arrivalTime - 1;
      }
      count++;
    }

    if (i === n - 1 && count < m) {
      lastArrivalTime = shuttleTime;
    }
  }

  const hour = Math.floor(lastArrivalTime / 60).toString().padStart(2, "0");
  const minute = (lastArrivalTime % 60).toString().padStart(2, "0");

  return `${hour}:${minute}`;
}
