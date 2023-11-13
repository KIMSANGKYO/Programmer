def solution(n, t, m, p):
    # 10진수 변환
    def convert(num, base):
        result = ''
        while num > 0:
            num, remainder = divmod(num, base)
            result = (str(remainder) if remainder < 10 else chr(remainder + 55)) + result
        return result if result else '0'

    answer = ''
    number = 0
    tube_order = 1

    while len(answer) < t:
        converted_number = convert(number, n)
        for digit in converted_number:
            if tube_order == p:
                answer += digit
                if len(answer) == t:
                    break
            tube_order = (tube_order % m) + 1
        number += 1

    return answer