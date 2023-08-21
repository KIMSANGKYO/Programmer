from collections import deque

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
# 좌표, 이동, 좌표배열, 방문, 행, 열
def bfs(coor, target, board, visited, N, M):
    for i in range(N):
        for j in range(M):
            visited[i][j] = False
    q = deque([(coor, 0)])
    visited[coor[0]][coor[1]] = True
    while q:
        (curx, cury), curt = q.popleft()
        for k in range(4):
            if curx + dx[k] == target[0] and cury + dy[k] == target[1]:
                return curt + 1
            if 0 <= curx + dx[k] < N and 0 <= cury + dy[k] < M:
                if not visited[curx + dx[k]][cury + dy[k]] and board[curx + dx[k]][cury + dy[k]] != 1:
                    visited[curx + dx[k]][cury + dy[k]] = True
                    q.append(((curx + dx[k], cury + dy[k]), curt + 1))
    return 0

def solution(maps):
    global result
    N = len(maps)
    M = len(maps[0])
    board = [[0 for _ in range(M)] for _ in range(N)]
    visited = [[False for _ in range(M)] for _ in range(N)]

    for i in range(N):
        for j in range(M):
            if maps[i][j] == 'S':
                s = (i, j)
                board[i][j] = 2
            elif maps[i][j] == 'E':
                e = (i, j)
                board[i][j] = 3
            elif maps[i][j] == 'L':
                l = (i, j)
                board[i][j] = 4
            elif maps[i][j] == 'O':
                board[i][j] = 0
            elif maps[i][j] == 'X':
                board[i][j] = 1

    result = 0

    cnt = bfs(s, l, board, visited, N, M)
    if not cnt:
        return -1
    else:
        result += cnt

    cnt = bfs(l, e, board, visited, N, M)
    if not cnt:
        return -1
    else:
        result += cnt

    return result