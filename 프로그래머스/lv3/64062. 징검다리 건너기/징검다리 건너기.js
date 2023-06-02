function checkStone(stones, mid, k) {
    let now = 0; // 몇 개가 연속으로 0 미만이 되었는지
    for (let i = 0; i < stones.length; i++) {
        if (stones[i] < mid) {
            now += 1;
        } else {
            now = 0;
        }
        if (now >= k) {
            return false;
        }
    }
    return true;
}

function solution(stones, k) {
    let left = 1; // 최소, 최대값
    let right = 200000000;

    while (left < right - 1) {
        let mid = Math.floor((left + right) / 2);
        if (checkStone(stones, mid, k)) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return left;
}