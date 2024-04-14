def compare_score(rion):
    global answer
    for i in range(10, -1, -1):
        if rion[i] > answer[i]:
            return True
        elif rion[i] < answer[i]:
            return False

def calculate(rion, apeach):
    global answer, max_diff
    rion_score = 0
    apeach_score = 0
    
    for i in range(11):
        if rion[i] > apeach[i]:
            rion_score += 10 - i
        elif apeach[i] > 0:
            apeach_score += 10 - i
    
    diff = rion_score - apeach_score
    if diff > 0 and max_diff <= diff:
        if max_diff == diff and not compare_score(rion):
            return
        max_diff = diff
        answer = rion[:]

def recu_search(score, arrows, rion, apeach):
    global answer
    if score == 11 or arrows == 0:
        rion[10] += arrows
        calculate(rion, apeach)
        rion[10] -= arrows
        return
    if apeach[score] < arrows:
        rion[score] += apeach[score] + 1
        recu_search(score + 1, arrows - apeach[score] - 1, rion, apeach)
        rion[score] -= apeach[score] + 1
    recu_search(score + 1, arrows, rion, apeach)

def solution(n, info):
    global answer, max_diff
    answer = [-1]
    max_diff = 0
    rion = [0] * 11
    recu_search(0, n, rion, info)
    if answer == [-1]:
        answer = [-1]
    return answer