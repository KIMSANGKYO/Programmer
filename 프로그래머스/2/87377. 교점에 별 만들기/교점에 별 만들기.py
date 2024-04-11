def solution(line):
    
    n = len(line)

    remove_dup_line = set() # 중복좌표 방지
    
    # 2개 직선 모든 교점 
    for i in range(n - 1):
        for j in range(i + 1, n):
            A, B, E = line[i]
            C, D, F = line[j]
            if A*D - B*C != 0:
                if (B*F - E*D) % (A*D - B*C) == 0 and (E*C - A*F) % (A*D - B*C) == 0:
                    remove_dup_line.add(((E*C - A*F) // (A*D - B*C), (B*F - E*D) // (A*D - B*C)))

    # 교점 좌표
    min_x = float('inf')
    min_y = float('inf')
    max_x = float('-inf')
    max_y = float('-inf')
    
    for x, y in remove_dup_line:
        min_x = min(min_x, x)
        max_x = max(max_x, x)
        min_y = min(min_y, y)
        max_y = max(max_y, y)

    answer = [['.'] * (max_y - min_y + 1) for _ in range(max_x - min_x + 1)]
    for x, y in remove_dup_line:
        answer[max_x - x][y - min_y] = '*'
    
    return [''.join(row) for row in answer]
