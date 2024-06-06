# 우박 수열 
def collatz_sequence(k):
    seq = [k]
    while k > 1:
        if k % 2 == 0:
            k //= 2
        else:
            k = 3 * k + 1
        seq.append(k)
    return seq

# 수열 구간 넓이
def calculate_areas(seq):
    areas = []
    for i in range(len(seq) - 1):
        h1 = seq[i]
        h2 = seq[i + 1]
        area = (h1 + h2) / 2
        areas.append(area)
    return areas

def solution(k, ranges):
    seq = collatz_sequence(k)
    areas = calculate_areas(seq)
    total_length = len(areas)
    results = []

    for a, b in ranges:
        end = total_length + b
        # 유효하지않은 구간
        if a > end:
            results.append(-1.0)
        else:
            integral = sum(areas[a:end])
            results.append(float(integral))
    
    return results