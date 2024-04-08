def solution(n, tops):
    a = [0] * (n + 1)
    b = [0] * (n + 1)
    a[0] = 0
    b[0] = 1
    MOD = 10007

    for i in range(len(tops)):
        a[i + 1] = (a[i] + b[i]) % MOD
        if tops[i] == 1:
            b[i + 1] = (2 * a[i] + 3 * b[i]) % MOD
        else:
            b[i + 1] = (a[i] + 2 * b[i]) % MOD

    return (a[n] + b[n]) % MOD
