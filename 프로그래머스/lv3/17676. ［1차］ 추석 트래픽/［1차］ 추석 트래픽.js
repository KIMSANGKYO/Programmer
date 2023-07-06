function solution(lines) {
    const timestamps = [];
    
    // 각 로그 시작, 끝시간을 변환하고 배열저장 
    for (let i = 0; i < lines.length; i++) {
        const [date, time, duration] = lines[i].split(" ");
        const endTime = new Date(`${date} ${time}`).getTime();
        const startTime = endTime - parseFloat(duration) * 1000 + 1;
        timestamps.push(startTime, endTime);
    }

    let maxCount = 0;

    // 모든 구간 처리량 
    for (let i = 0; i < timestamps.length; i++) {
        const start = timestamps[i];
        const end = start + 1000; // 1초 간격
        let count = 0;

        for (let j = 0; j < timestamps.length; j += 2) {
            const [logStart, logEnd] = [timestamps[j], timestamps[j + 1]];

            // 현재 시간 구간과 로그의 시간 구간이 겹침
            if ((logStart >= start && logStart < end) || (logEnd >= start && logEnd < end) || (logStart <= start && logEnd >= end)) {
                count++;
            }
        }

        maxCount = Math.max(maxCount, count);
  }

  return maxCount;
}






 // 테케 4,5 미통과//////
// function solution(lines) {
//   let maxThroughput = 0;
    

//   // 로그 데이터 처리량 계산
//   for (let i = 0; i < lines.length; i++) {
//     let count = 1; // 현재 로그포함 처리량
//     const endTime = parseTime(lines[i].split(" ")[1]); // 응답 완료 시간
//     const startTime = endTime - parseDuration(lines[i].split(" ")[2]) + 1; // 시작 시간

//     // 다른 로그와 구간 겹침 처리량 계산
//     for (let j = i + 1; j < lines.length; j++) {
//       const currStartTime = parseTime(lines[j].split(" ")[1]) - parseDuration(lines[j].split(" ")[2]) + 1;
//       const currEndTime = parseTime(lines[j].split(" ")[1]);
      
//       // 겹치는 구간이 있다면 처리량 증가
//       if (currEndTime >= startTime - 1000 && currStartTime <= endTime) {
//         count++;
//       }
//     }

//     // 최대 처리량 갱신
//     maxThroughput = Math.max(maxThroughput, count);
//   }

//   return maxThroughput;
// }

// // 시간을 밀리초 단위로 변환하는 함수
// function parseTime(time) {
//   const [hour, minute, second] = time.split(":").map(Number);
//   const millisecond = Math.floor(time.split(".")[1]);
//   return hour * 3600000 + minute * 60000 + second * 1000 + millisecond;
// }

// // 처리시간을 밀리초 단위로 변환하는 함수
// function parseDuration(duration) {
//   return Math.floor(parseFloat(duration) * 1000);
// }