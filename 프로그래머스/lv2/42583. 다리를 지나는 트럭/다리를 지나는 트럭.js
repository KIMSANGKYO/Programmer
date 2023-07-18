function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = [];
  let totalWeight = 0;

  while (truck_weights.length > 0 || bridge.length > 0) {
    time++;

    if (bridge.length > 0 && bridge[0][1] + bridge_length === time) {
      const [truck, arrivalTime] = bridge.shift();
      totalWeight -= truck;
    }

    if (totalWeight + truck_weights[0] <= weight) {
      const truck = truck_weights.shift();
      bridge.push([truck, time]);
      totalWeight += truck;
    }
  }

  return time;
}