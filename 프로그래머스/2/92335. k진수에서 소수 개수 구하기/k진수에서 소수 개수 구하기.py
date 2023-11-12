def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def solution(n, k):
    result = 0
    converted = ""
    
    while n > 0:
        converted = str(n % k) + converted
        n //= k

    parts = converted.split("0")
    # 분할 소수 점검
    for part in parts:
        if part != "" and is_prime(int(part)):
            result += 1

    return result