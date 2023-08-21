from collections import deque

def solution(x, y, n):
    if x == y:
        return 0  # x와 y가 이미 같은 경우

    if x >= y:
        return -1  # x가 이미 y 이상이면 변환 불가

    visited = [False] * (y + 1) 
    queue = deque([(x, 0)]) 

    while queue:
        current, operations = queue.popleft()

        if current == y:
            return operations  # 변환완료시

        next_values = [current + n, current * 2, current * 3]
        for next_val in next_values:
            if next_val <= y and not visited[next_val]:
                visited[next_val] = True
                queue.append((next_val, operations + 1))

    return -1 