def dfs(users, emoticons, tmp, ind, val):
    global join, cost
    
    sum_val = 0  
    total_cost = 0 
    user_count = 0  
    
    if ind == len(emoticons):
        for i in range(len(users)):
            sum_val = 0
            for j in range(len(tmp)):
                if users[i][0] <= tmp[j]:
                    sum_val += emoticons[j] - (emoticons[j] * tmp[j] // 100)
            if users[i][1] <= sum_val:
                user_count += 1
            else:
                total_cost += sum_val
        
        if join < user_count:
            join = user_count
            cost = total_cost
        elif join == user_count:
            cost = max(cost, total_cost)
        return
    
    for i in range(1, 5):
        tmp[ind] = i * 10
        dfs(users, emoticons, tmp, ind + 1, val + emoticons[ind] - (emoticons[ind] * tmp[ind] // 100))

def solution(users, emoticons):
    global join, cost
    join = 0  # 정답 가입
    cost = 0  # 정답 가격
    
    result = []
    dis = []
    tmp = [0] * len(emoticons)
    dfs(users, emoticons, tmp, 0, 0)
    
    result = [join, cost]
    return result