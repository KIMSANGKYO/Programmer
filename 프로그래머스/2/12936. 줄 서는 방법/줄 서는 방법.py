def solution(n, k):
    from math import factorial

    numbers = list(range(1, n + 1))
    result = []
    k -= 1
    
    while n > 0:
        n -= 1
        fact = factorial(n)
        index = k // fact
        result.append(numbers.pop(index))
        k %= fact

    return result
