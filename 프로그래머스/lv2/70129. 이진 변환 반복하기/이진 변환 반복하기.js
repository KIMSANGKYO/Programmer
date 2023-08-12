function solution(s) {
    let cnt = 0; // 변환 횟수
    let remove = 0;   // 제거된 0의 개수

    while (s !== "1") {
        let zeroCount = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === "0") {
                zeroCount++;
            }
        }

        remove += zeroCount;
        s = (s.length - zeroCount).toString(2);
        cnt++;
    }

    return [cnt, remove];
}
