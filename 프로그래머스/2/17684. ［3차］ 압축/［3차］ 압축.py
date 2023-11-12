def solution(msg):
    result = []
    dictionary = {chr(i): i - ord('A') + 1 for i in range(ord('A'), ord('Z') + 1)}
    # 새로운 단어번호 저장 변수
    next_index = 27

    start = 0
    # 사전에 등록되있나 확인
    while start < len(msg):
        end = start + 1
        while end <= len(msg) and msg[start:end] in dictionary:
            end += 1

        w = msg[start:end - 1]
        result.append(dictionary[w])

        if end <= len(msg):
            c = msg[end - 1]
            dictionary[w + c] = next_index
            next_index += 1
        # 시작 위치 조정
        start = end - 1

    return result