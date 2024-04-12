from collections import defaultdict
from bisect import bisect_left

# 이분탐색
def binary(info, score, ground):
    for i in range(16):
        string = ""
        num = i
        for j in range(3, -1, -1):
            if num <= 0 or num % 2 == 0:
                string = "-" + string
            else:
                string = info[j] + string
            num //= 2
        ground[string].append(score)

def solution(info, query):
    ground = defaultdict(list)

    for inf in info:
        word = inf.split()
        binary(word[:-1], int(word[-1]), ground)

    for key in ground:
        ground[key].sort()

    answer = []
    # 쿼리 분할
    for que in query:
        word = que.split()
        word = [x for x in word if x != "and"]
        key = "".join(word[:-1])
        score = int(word[-1])

        if key in ground:
            index = bisect_left(ground[key], score)
            answer.append(len(ground[key]) - index)
        else:
            answer.append(0)
    
    return answer
