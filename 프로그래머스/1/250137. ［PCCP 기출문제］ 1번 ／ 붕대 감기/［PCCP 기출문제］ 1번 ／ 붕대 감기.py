def solution(bandage, health, attacks):
    
    current_health = health
    bandage_count = 0  
    attack_time = attacks[0][0]  
    attack_count = attacks[0][1]  
    
    m_cnt = 0  
    
    for i in range(1, attacks[-1][0] + 1):
        if attack_time == i:  
            bandage_count = 0
            current_health -= attack_count
            if current_health <= 0:
                return -1  
            
            if m_cnt + 1 < len(attacks):
                m_cnt += 1
                attack_time = attacks[m_cnt][0]
                attack_count = attacks[m_cnt][1]
        else:  
            bandage_count += 1
            current_health += bandage[1]
            if bandage_count == bandage[0]: # 추가회복 카운트
                bandage_count = 0
                current_health += bandage[2]
            if current_health > health:
                current_health = health 
    
    return current_health
