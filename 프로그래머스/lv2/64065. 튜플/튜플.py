import re
from collections import Counter

def solution(s):
    s = s[2:-2].split('},{')
    s.sort(key=len)

    result = []
    for group in s:
        numbers = list(map(int, re.findall('\d+', group)))
        counter = Counter(numbers)
        most_common = counter.most_common()
        for num, _ in most_common:
            if num not in result:
                result.append(num)

    return result