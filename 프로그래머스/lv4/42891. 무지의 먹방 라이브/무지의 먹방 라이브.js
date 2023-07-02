function solution(food_times, k) {
  // 음식의 총 개수
  let totalFood = food_times.length;

  // 음식 먹는데 필요한 총 시간
  const totalEatingTime = food_times.reduce((acc, cur) => acc + cur, 0);

  //시간이 초과시 
  if (totalEatingTime <= k) return -1;

  // 음식을 남은 시간과 인덱스로 나타내는 배열
  const foodList = food_times.map((time, index) => ({
    index: index + 1,
    time,
  }));

  // 남은 시간을 기준으로 오름차순으로 정렬합니다.
  foodList.sort((a, b) => a.time - b.time);

  let previousTime = 0; // 이전 음식을 먹는데 걸린 시간을 저장하는 변수
  let i = 0; // 현재 가리키고 있는 음식 인덱스

  for (let food of foodList) {
      // 이전 음식을 먹는데 걸린 시간과의 차이
    const diff = food.time - previousTime; 

    if (diff !== 0) {
      const timeSpent = diff * totalFood; // 현재 음식을 먹는데 걸리는 시간

      // 현재 음식 도중에 중단 남은 음식에서 찾기
      if (timeSpent > k) {
        const remainingFoods = foodList.slice(i).sort((a, b) => a.index - b.index);
        return remainingFoods[(k % totalFood)].index;
      }

      k -= timeSpent; //현재 음식 걸린 시간 빼기
      previousTime = food.time;
    }

    totalFood--; // 남은 음식 감소
    i++; // 다음 음식
  }

  return -1; // 모든 음식 끝
}