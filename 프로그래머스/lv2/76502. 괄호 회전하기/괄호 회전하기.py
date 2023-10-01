def rotate(s):
    return s[1:] + s[0]

def is_valid(s):
    stack = []
    for char in s:
        if char in "([{":
            stack.append(char)
        else:
            if not stack:
                return False
            top = stack.pop()
            if (top == "(" and char == ")") or (top == "[" and char == "]") or (top == "{" and char == "}"):
                continue
            else:
                return False
    return not stack

def solution(s):
    count = 0
    rotated_s = s
    for _ in range(len(s)):
        if is_valid(rotated_s):
            count += 1
        rotated_s = rotate(rotated_s)
    return count
