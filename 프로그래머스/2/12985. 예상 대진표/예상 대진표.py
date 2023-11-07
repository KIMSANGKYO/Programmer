def solution(N, A, B):
    count = 0
    
    while A != B:
        count += 1
        A = (A + 1) // 2
        B = (B + 1) // 2
    
    return count