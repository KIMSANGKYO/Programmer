function solution(places) {
    let answer = [];

    const inNear = val => val >= 0 && val < 5;

    for (const place of places) {
        place.map((row, idx) => {
            place[idx] = row.split('');
        });

        const isPerson = (r, c) => place[r][c] === 'P';
        const isEmpty = (r, c) => place[r][c] === 'O';

        const keepRight = place.every((row, r) =>
            row.every((seat, c) => {
                if (seat === 'P') {
                    if (inNear(r + 1)) {
                        if (isPerson(r + 1, c)) return false; // 아래쪽에 응시자가 있는 경우
                        if (isEmpty(r + 1, c)) {
                            if (inNear(c + 1) && isPerson(r + 1, c + 1)) return false; // 대각선 오른쪽 아래에 응시자가 있는 경우
                            if (inNear(c - 1) && isPerson(r + 1, c - 1)) return false; // 대각선 왼쪽 아래에 응시자가 있는 경우
                            if (inNear(r + 2) && isPerson(r + 2, c)) return false; // 아래쪽 두 칸에 응시자가 있는 경우
                        }
                    }
                    if (inNear(r - 1)) {
                        if (isPerson(r - 1, c)) return false; // 위쪽에 응시자가 있는 경우
                        if (isEmpty(r - 1, c)) {
                            if (inNear(c + 1) && isPerson(r - 1, c + 1)) return false; // 대각선 오른쪽 위에 응시자가 있는 경우
                            if (inNear(c - 1) && isPerson(r - 1, c - 1)) return false; // 대각선 왼쪽 위에 응시자가 있는 경우
                            if (inNear(r - 2) && isPerson(r - 2, c)) return false; // 위쪽 두 칸에 응시자가 있는 경우
                        }
                    }
                    if (inNear(c + 1)) {
                        if (isPerson(r, c + 1)) return false; // 오른쪽에 응시자가 있는 경우
                        if (isEmpty(r, c + 1) && inNear(c + 2) && isPerson(r, c + 2)) return false; // 오른쪽 두 칸에 응시자가 있는 경우
                    }
                    if (inNear(c - 1)) {
                        if (isPerson(r, c - 1)) return false; // 왼쪽에 응시자가 있는 경우
                        if (isEmpty(r, c - 1) && inNear(c - 2) && isPerson(r, c - 2)) return false; // 왼쪽 두 칸에 응시자가 있는 경우
                    }
                }
                return true;
            })
        );
        answer.push(keepRight ? 1 : 0);
    }

    return answer;
}