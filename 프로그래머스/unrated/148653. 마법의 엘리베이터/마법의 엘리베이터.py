def solution(storey):
    result = 0

    while storey:
        remain = storey % 10
        if remain > 5:
            result += (10 - remain)
            storey += 10
        elif remain < 5:
            result += remain
        else:
            if (storey // 10) % 10 > 4:
                storey += 10
            result += remain
        storey //= 10

    return result

