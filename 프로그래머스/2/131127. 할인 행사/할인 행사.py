def solution(want, number, discount):
    result = 0
    
    for i in range(len(discount)): 
        idx = i 
        count = number.copy()
        
        while idx < len(discount) and idx < i + 10: 
            for j in range(len(want)): 
                if want[j] == discount[idx]: 
                    count[j] -= 1 
            idx += 1 
        
        check = False 
        for k in count: 
            if k > 0: 
                check = True 
        
        if not check: 
            result += 1
    
    return result



