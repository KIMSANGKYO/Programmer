from collections import deque

def solution(maps):
    result = []
    R, C = len(maps), len(maps[0])
    visited = [[0] * C for _ in range(R)]
    DIRS = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    def bfs(a, b):
        cnt = 0
        q = deque([(a, b)])
        cnt += int(maps[a][b])
        visited[a][b] = 1

        while q:
            r, c = q.popleft()
            for dr, dc in DIRS:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc] and maps[nr][nc] != "X":
                    visited[nr][nc] = 1
                    cnt += int(maps[nr][nc])
                    q.append((nr, nc))
        result.append(cnt)

    for i in range(R):
        for j in range(C):
            if not visited[i][j] and maps[i][j] != "X":
                bfs(i, j)

    if not result:
        return [-1]

    return sorted(result)
