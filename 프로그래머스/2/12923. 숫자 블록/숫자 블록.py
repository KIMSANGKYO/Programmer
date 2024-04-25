# 약수 찾기
def divisor_search(n):
    if n == 1:
        return 0
    
    table = []
    mod = 10000000
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            table.append(i)
            if n // i <= mod:
                return n // i
    if len(table) >= 1:
        return table[-1]
    return 1

def solution(begin, end):
    answer = []
    # 최대공약수
    for i in range(begin, end + 1):
        divisor = divisor_search(i)
        answer.append(divisor)
        
    return answer