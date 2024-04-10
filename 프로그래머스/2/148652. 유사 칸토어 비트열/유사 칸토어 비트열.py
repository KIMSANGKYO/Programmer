def solution(n, l, r):
    result = 0 # 1 개수 저장 
    # 인덱스 0 부터 시작 
    for l in range(l-1, r): 
        if check_one(l):
            result += 1
    return result

def check_one(l):
    while l >= 5:
        # 나머지 2일때 게속 반복
        if (l - 2) % 5 == 0:
            return False
        l //= 5 # 5로 나눈 몫 l에 대입
    # 2가 아닐때 >> 1이후 패턴 일정
    return l != 2
