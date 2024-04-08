def solution(friends, gifts):
    friends_index = {} # 친구 이름 // 인덱스 맵핑
    graph = []
    gift_score = []

    def cal_gifts(gift):
        giver, receiver = gift.split()
        giver_index = friends_index.setdefault(giver, len(friends_index))
        receiver_index = friends_index.setdefault(receiver, len(friends_index))
        graph[giver_index][receiver_index] += 1
        graph[receiver_index][giver_index] -= 1
        gift_score[giver_index] += 1
        gift_score[receiver_index] -= 1

    for friend in friends:
        friends_index[friend] = len(friends_index)
    
    for _ in range(len(friends_index)):
        graph.append([0] * len(friends_index))
        gift_score.append(0)
    
    for gift in gifts:
        cal_gifts(gift)
        
    answer = 0
    for i in range(len(friends_index)):
        current_gift = 0
        for j in range(len(friends_index)):
            if graph[i][j] > 0:
                current_gift += 1
            elif graph[i][j] == 0:
                if gift_score[i] > gift_score[j]:
                    current_gift += 1
        answer = max(answer, current_gift)
    
    return answer
