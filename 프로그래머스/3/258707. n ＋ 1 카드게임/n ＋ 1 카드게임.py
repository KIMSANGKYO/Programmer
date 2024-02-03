from collections import deque

def card_set(check_number):
    global preset, coin_cnt
    queue_size = len(player)
    
    for i in range(queue_size):
        num = player.popleft()
        if check_num[num] == 0:
            player.append(num)
            continue
        
        if check_num[(card_len + 1) - num] != 0:
            if check_number == 0:
                if check_num[(card_len + 1) - num] != 1 or check_num[num] != 1:
                    player.append(num)
                    continue
                
                preset = (check_num[num], check_num[(card_len + 1) - num])
                check_num[num] = 0
                check_num[(card_len + 1) - num] = 0
                return True
            elif check_number == 1:
                if (check_num[(card_len + 1) - num] == 1 and check_num[num] == 2 and coin_cnt >= 1) or \
                   (check_num[(card_len + 1) - num] == 2 and check_num[num] == 1 and coin_cnt >= 1):
                    coin_cnt -= 1
                    preset = (check_num[num], check_num[(card_len + 1) - num])
                    check_num[num] = 0
                    check_num[(card_len + 1) - num] = 0
                    return True
            elif check_number == 2:
                if check_num[(card_len + 1) - num] == 2 and check_num[num] == 2 and coin_cnt >= 2:
                    coin_cnt -= 2
                    preset = (check_num[num], check_num[(card_len + 1) - num])
                    check_num[num] = 0
                    check_num[(card_len + 1) - num] = 0
                    return True
    
        player.append(num)
    
    return False

def solution(coin, cards):
    global card_len, player, check_num, coin_cnt
    answer = 0
    card_len = len(cards)
    check_num = [0] * 1001
    index = card_len // 3
    coin_cnt = coin
    player = deque()
    
    for i in range(card_len // 3):
        player.append(cards[i])
        check_num[cards[i]] = 1
    
    while True:
        answer += 1
        if index >= len(cards) - 1:
            break
        
        is_complete = False
        check_num[cards[index]] = 2
        check_num[cards[index + 1]] = 2
        player.append(cards[index])
        player.append(cards[index + 1])
        index += 2
        
        is_complete = card_set(0)
        if is_complete:
            continue
        
        if coin_cnt > 0:
            is_complete = card_set(1)
            if is_complete:
                continue
            
            is_complete = card_set(2)
            if is_complete:
                continue
        
        if not is_complete:
            break
    
    return answer
