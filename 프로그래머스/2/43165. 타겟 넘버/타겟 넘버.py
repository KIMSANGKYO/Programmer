def solution(numbers, target):
    def dfs(index, current_sum):
        if index == len(numbers):
            if current_sum == target:
                return 1
            else:
                return 0

        positive = dfs(index + 1, current_sum + numbers[index])
        negative = dfs(index + 1, current_sum - numbers[index])

        return positive + negative

    answer = dfs(0, 0)
    return answer