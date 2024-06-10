import re
from itertools import permutations

def split_oper(expression):
    numbers = list(map(int, re.findall(r'\d+', expression)))
    operators = re.findall(r'[\+\-\*]', expression)
    return numbers, operators

def calculate(numbers, operators, priority):
    for op in priority:
        stack_nums = []
        stack_ops = []
        stack_nums.append(numbers[0])
        
        for i in range(len(operators)):
            if operators[i] == op:
                if op == '+':
                    stack_nums[-1] = stack_nums[-1] + numbers[i + 1]
                elif op == '-':
                    stack_nums[-1] = stack_nums[-1] - numbers[i + 1]
                elif op == '*':
                    stack_nums[-1] = stack_nums[-1] * numbers[i + 1]
            else:
                stack_nums.append(numbers[i + 1])
                stack_ops.append(operators[i])
        
        numbers = stack_nums
        operators = stack_ops
    
    return abs(numbers[0])

def solution(expression):
    numbers, operators = split_oper(expression)
    operator_set = set(operators)
    max_result = 0

    for priority in permutations(operator_set):
        result = calculate(numbers[:], operators[:], priority)
        max_result = max(max_result, result)

    return max_result