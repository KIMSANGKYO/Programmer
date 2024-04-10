from collections import defaultdict
# 노드 깊이 탐색
def dfs(start, node):
    # 노드 변환 시작점 
    next_edge = start
    # 시작점 갱신 조건 간선 기준 판별 
    while node[next_edge]:
        if len(node[next_edge]) >= 2:
            return 3
        
        if node[next_edge][0] == start:
            return 1
        else:
            next_edge = node[next_edge][0]
    
    return 2

def solution(edges):
    # 깊이 탐색 노드 데이터 정렬
    node = defaultdict(list)
    node_count = [0] * 1000001 # 정점길이 최대값
    answer = [0] * 4
    # 정점 잇기
    for edge in edges:
        node[edge[0]].append(edge[1])
        node_count[edge[1]] += 1

    for key, value in node.items():
        if len(value) >= 2 and node_count[key] == 0:
            answer[0] = key

    for cur_edge in node[answer[0]]:
        answer[dfs(cur_edge, node)] += 1
    
    return answer