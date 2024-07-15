import heapq

def solution(N, road, K):
    # 그래프 초기화
    graph = [[] for _ in range(N + 1)]
    for a, b, c in road:
        graph[a].append((b, c))
        graph[b].append((a, c))
    
    # 거리 배열 초기화
    distances = [float('inf')] * (N + 1)
    distances[1] = 0

    queue = []
    heapq.heappush(queue, (0, 1))  # 거리 마을번호쌍 
    
    while queue:
        cur_distance, cur_node = heapq.heappop(queue)
        
        if cur_distance > distances[cur_node]:
            continue
        
        for neighbor, weight in graph[cur_node]:
            distance = cur_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(queue, (distance, neighbor))
    
    return sum(1 for d in distances if d <= K) # 최단거리 k 이하 