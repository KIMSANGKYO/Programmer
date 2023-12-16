def get_position(maze):
    n, m = len(maze), len(maze[0])
    for row in range(n):
        for col in range(m):
            if maze[row][col] == 1:
                red = (row, col)
            elif maze[row][col] == 2:
                blue = (row, col)
            elif maze[row][col] == 3:
                target_red = (row, col)
            elif maze[row][col] == 4:
                target_blue = (row, col)

    return red, blue, target_red, target_blue

DIR = [(0, -1), (0, 1), (1, 0), (-1, 0)]

def is_valid(cur, maze, visited, target):
    x, y = cur
    answer = []

    if cur == target:
        return [target]

    for dx, dy in DIR:
        if 0 <= x + dx < len(maze) and 0 <= y + dy < len(maze[0]) and (x + dx, y + dy) not in visited and \
                maze[x + dx][y + dy] != 5:
            answer.append((x + dx, y + dy))

    return answer


def solution(maze):
    n, m = len(maze), len(maze[0])
    red, blue, target_red, target_blue = get_position(maze)

    global_minimum = [10**20]

    def back_tracking(red, blue, turn, red_visited, blue_visited):
        nonlocal global_minimum

        if red == target_red and blue == target_blue:
            global_minimum[0] = min(global_minimum[0], turn)
            return

        red_end = is_valid(red, maze, red_visited, target_red)
        blue_end = is_valid(blue, maze, blue_visited, target_blue)

        for rx in red_end:
            for bx in blue_end:
                if rx != bx and (rx, bx) != (blue, red):
                    next_red = red_visited | {rx}  
                    next_blue = blue_visited | {bx}

                    back_tracking(rx, bx, turn + 1, next_red, next_blue)

    red_visited, blue_visited = {red}, {blue}

    back_tracking(red, blue, 0, red_visited, blue_visited)

    return global_minimum[0] if global_minimum[0] != 10**20 else 0


