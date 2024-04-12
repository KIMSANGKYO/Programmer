from collections import deque

# 이동좌표
dx = [0, 1, 0, -1]
dy = [1, 0, -1, 0]

def bfs(arr, start):
    global n, m, result
    
    for i in range(n):
        if arr[i][start] == 0:
            continue
        queue = deque([(i, start)])
        tmp = set([start])
        arr[i][start] = 0
        count = 1
        while queue:
            cur = queue.popleft()
            for j in range(4):
                x = cur[0] + dx[j]
                y = cur[1] + dy[j]
                if x < 0 or x >= n or y < 0 or y >= m:
                    continue
                if arr[x][y] == 0:
                    continue
                tmp.add(y)
                arr[x][y] = 0
                count += 1
                queue.append((x, y))
        for loca in tmp:
            result[loca] += count

def solution(land):
    global n, m, result
    
    answer = 0
    n = len(land)
    m = len(land[0])
    result = [0] * m
    
    for i in range(m):
        bfs(land, i)
    answer = max(result)
    
    return answer