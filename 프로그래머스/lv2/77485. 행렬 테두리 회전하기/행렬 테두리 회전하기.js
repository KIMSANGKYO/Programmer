function solution(rows, columns, queries) {
    // 행렬 초기화
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = i * columns + j + 1;
        }
    }

    const answer = [];
    // 각 회전마다 테두리 숫자를 회전하고 최솟값을 찾음
    for (let i = 0; i < queries.length; i++) {
        const [x1, y1, x2, y2] = queries[i];
        answer.push(rotateAndFindMin(x1 - 1, y1 - 1, x2 - 1, y2 - 1, matrix));
    }

    return answer;
}

function rotateAndFindMin(x1, y1, x2, y2, matrix) {
    const temp = matrix[x1][y1];
    let min = temp;

    // 왼쪽 변
    for (let i = x1; i < x2; i++) {
        matrix[i][y1] = matrix[i + 1][y1];
        min = Math.min(min, matrix[i][y1]);
    }
    // 아래쪽 변
    for (let i = y1; i < y2; i++) {
        matrix[x2][i] = matrix[x2][i + 1];
        min = Math.min(min, matrix[x2][i]);
    }
    // 오른쪽 변
    for (let i = x2; i > x1; i--) {
        matrix[i][y2] = matrix[i - 1][y2];
        min = Math.min(min, matrix[i][y2]);
    }
    // 위쪽 변
    for (let i = y2; i > y1; i--) {
        matrix[x1][i] = matrix[x1][i - 1];
        min = Math.min(min, matrix[x1][i]);
    }

    matrix[x1][y1 + 1] = temp;

    return min;
}