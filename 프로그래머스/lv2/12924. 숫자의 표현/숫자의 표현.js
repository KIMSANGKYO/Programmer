function solution(n) {
    let result = 0;
    for (let start = 1; start <= n; start++) {
        let sum = 0;
        for (let num = start; sum < n; num++) {
            sum += num;
            if (sum === n) {
                result++;
                break;
            }
        }
    }
    return result;
}
