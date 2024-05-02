def solution(cards):
    check = [False] * 100
    box = []

    for index in range(len(cards)):
        count = 0

        while True:
            if check[index]:
                if count:
                    box.append(count)
                break
            count += 1
            check[index] = True
            index = cards[index] - 1

    if len(box) <= 1:
        return 0

    box.sort()

    score = len(box)
    return box[score - 1] * box[score - 2]