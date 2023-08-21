def solution(numbers):
    stack = [] 
    result = [-1] * len(numbers)  

    for i in range(len(numbers)):
        while stack and numbers[i] > numbers[stack[-1]]:
            idx = stack.pop()
            result[idx] = numbers[i]

        stack.append(i)

    return result