def solution(elements):
    n = len(elements)
    total_sum = sum(elements)
    dedup = set()

    for i in range(n):
        cur_sum = 0
        for j in range(n):
            cur_sum += elements[(i + j) % n]
            dedup.add(cur_sum)

    return len(dedup)
