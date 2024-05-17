from itertools import combinations

def solution(relation):
    row_len = len(relation)
    col_len = len(relation[0])
    # 속성 조합 찾기
    candidates = []
    for i in range(1, col_len + 1):
        candidates.extend(combinations(range(col_len), i))
    # 유일성
    unique = []
    for candidate in candidates:
        temp = [tuple(item[i] for i in candidate) for item in relation]
        if len(set(temp)) == row_len:
            unique.append(candidate)
    # 최소성 / 부분집합 제거
    final_keys = set(unique)
    for i in range(len(unique)):
        for j in range(i + 1, len(unique)):
            if set(unique[i]).issubset(set(unique[j])):
                final_keys.discard(unique[j])
    
    return len(final_keys)
