def solution(name):
    answer = 0
    n = len(name)
    move = n - 1 

    for i in range(n):
        answer += min(ord(name[i]) - ord('A'), ord('Z') - ord(name[i]) + 1)

        index = i + 1
        while index < n and name[index] == 'A':
            index += 1

        move = min(move, i + n - index + min(i, n - index))

    answer += move
    return answer