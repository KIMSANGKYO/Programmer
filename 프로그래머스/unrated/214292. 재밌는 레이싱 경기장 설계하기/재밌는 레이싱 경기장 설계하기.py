def solution(heights):
    heights.sort()
    result = float('inf')
    length = len(heights)

    # 길이 짝수
    if length % 2 == 0:
        for i in range(length // 2):
            result = min(result, heights[i + length // 2] - heights[i])
    # 홀수
    else:
        stack = []
        for i in range(length // 2 + 1):
            gap = heights[i + length // 2] - heights[i]
            stack.append(gap)
        stack.sort()
        result = stack[1]

    return result
