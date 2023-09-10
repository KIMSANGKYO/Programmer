def solution(arrows):
    node_check = {} 
    edge_check = {}  

    result = 0
    x, y = 0, 0
    node_check[(x, y)] = True
    dx = [-1, -1, 0, 1, 1, 1, 0, -1]
    dy = [0, 1, 1, 1, 0, -1, -1, -1]

    for dir in arrows:
        for _ in range(2):
            nx = x + dx[dir]
            ny = y + dy[dir]

            if (nx, ny) in node_check and not edge_check.get(((x, y), (nx, ny)), False):
                edge_check[((x, y), (nx, ny))] = True
                edge_check[((nx, ny), (x, y))] = True
                result += 1
                x = nx
                y = ny
                continue

            node_check[(nx, ny)] = True
            edge_check[((x, y), (nx, ny))] = True
            edge_check[((nx, ny), (x, y))] = True
            x = nx
            y = ny

    return result