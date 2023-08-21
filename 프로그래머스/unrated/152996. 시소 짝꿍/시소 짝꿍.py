from collections import Counter

def solution(weights):
    pair_count = 0
    
    count = Counter(weights)
    for _,people_count in count.items():
        if people_count>=2:
            pair_count+= people_count*(people_count-1)//2
    weights = set(weights) 
    
    for w in weights:
        if w*2/3 in weights:
            pair_count+= count[w*2/3] * count[w]
        if w*2/4 in weights:
            pair_count+= count[w*2/4] * count[w]
        if w*3/4 in weights:
            pair_count+= count[w*3/4] * count[w]
    return pair_count