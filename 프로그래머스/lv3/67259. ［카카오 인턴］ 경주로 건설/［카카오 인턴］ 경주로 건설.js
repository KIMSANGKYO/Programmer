function solution(board) {
    const N = board.length;
    // 기본 이동 방향 배열 
    const direction = [[1, 0], [-1, 0], [0, -1], [0, 1]];
    // 방향 확인 배열 생성, 코스트 입력
    const find = Array.from({ length: N }, () => Array.from({ length: N }, () => new Array(4).fill(Infinity)));

    // 격자 범위
    const outLineCheck = (x, y) => x >= 0 && x < N && y >= 0 && y < N && board[x][y] !== 1;
    // 초기값
    const queue = [[0, 0, 0, 0], [0, 0, 0, 3]];
    
    while(queue.length) {
        const [x, y, cost, dir] = queue.shift();
        for(let i = 0; i < direction.length; i++) {
            const [mx, my] = direction[i];
            const [nx, ny] = [x + mx, y + my];
            if(outLineCheck(nx, ny)) {
                let costStack = cost + 100;
                // 방향 바꿀시 
                if(dir !== i) costStack += 500;
                // 반대 방향 예외 처리 
                if(costStack < find[nx][ny][i]) {
                    find[nx][ny][i] = costStack;
                    queue.push([nx, ny, costStack, i]);
                }
            }
        }
    }
    return Math.min(...find[N - 1][N - 1]);
}