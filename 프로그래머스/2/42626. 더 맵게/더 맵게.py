import heapq

def solution(scoville, K):
    # 최소힙
    heapq.heapify(scoville) 
    mix_count = 0
   
    while scoville[0] < K:
        if len(scoville) < 2:
            return -1
        # 맵지않은 두개
        first = heapq.heappop(scoville)
        second = heapq.heappop(scoville)
        new_food = first + (second * 2)
        heapq.heappush(scoville, new_food)
        mix_count += 1

    return mix_count