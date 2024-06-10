def solution(p):
    def is_correct(u):
        stack = []
        for char in u:
            if char == '(':
                stack.append(char)
            else:  
                if stack:
                    stack.pop()
                else:
                    return False
        return not stack

    def split_string(w):
        count = 0
        for i in range(len(w)):
            if w[i] == '(':
                count += 1
            else:  
                count -= 1
            if count == 0:
                return w[:i+1], w[i+1:]

    def convert(w):
        if not w:
            return ""
        
        u, v = split_string(w)
        
        if is_correct(u):
            return u + convert(v)
        else:
            new_str = "(" + convert(v) + ")"
            u = u[1:-1]
            u = ''.join(')' if char == '(' else '(' for char in u)
            return new_str + u

    return convert(p)