function solution(play_time, adv_time, logs) {
  // 시간을 초로 변환하는 함수
  function timeToSec(time) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  // 초를 시간으로 변환하는 함수
  function secToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const playTimeSec = timeToSec(play_time);
  const advTimeSec = timeToSec(adv_time);

  // 재생 구간 정보를 시작 시간과 종료 시간으로 분리
  const startTimes = [];
  const endTimes = [];
  for (const log of logs) {
    const [start, end] = log.split("-");
    startTimes.push(timeToSec(start));
    endTimes.push(timeToSec(end));
  }

  // 시청자의 재생 구간별 누적 재생시간을 구함
  const playCount = Array(playTimeSec + 1).fill(0);
  for (let i = 0; i < logs.length; i++) {
    playCount[startTimes[i]]++;
    playCount[endTimes[i]]--;
  }
  for (let i = 1; i <= playTimeSec; i++) {
    playCount[i] += playCount[i - 1];
  }

  // 누적 재생시간을 구간별로 구함
  for (let i = 1; i <= playTimeSec; i++) {
    playCount[i] += playCount[i - 1];
  }

  // 공익광고를 삽입할 최적의 위치를 찾음
  let maxTime = playCount[advTimeSec - 1];
  let startTime = 0;
  for (let i = advTimeSec; i < playTimeSec; i++) {
    if (playCount[i] - playCount[i - advTimeSec] > maxTime) {
      maxTime = playCount[i] - playCount[i - advTimeSec];
      startTime = i - advTimeSec + 1;
    }
  }

  return secToTime(startTime);
}