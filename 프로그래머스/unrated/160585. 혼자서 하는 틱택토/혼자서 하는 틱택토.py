def solution(board):
    count_o = 0
    count_x = 0
    
    for i in range(3):
        for j in range(3):
            if board[i][j] == "O":
                count_o += 1
            elif board[i][j] == "X":
                count_x += 1

    if count_o - count_x not in [0, 1]:
        return 0

    # 점수
    score_o = 0
    score_x = 0
    
    # 가로, 세로
    for i in range(3):
        if "".join(board[i]) == "XXX":
            score_x += 1
        elif "".join(board[i]) == "OOO":
            score_o += 1
        col = "".join(board[j][i] for j in range(3))
        if col == "XXX":
            score_x += 1
        elif col == "OOO":
            score_o += 1

    # 대각선
    if "".join(board[i][i] for i in range(3)) == "XXX":
        score_x += 1
    elif "".join(board[i][i] for i in range(3)) == "OOO":
        score_o += 1
    if "".join(board[i][2 - i] for i in range(3)) == "XXX":
        score_x += 1
    elif "".join(board[i][2 - i] for i in range(3)) == "OOO":
        score_o += 1

    if score_x > 0 and score_o > 0:
        return 0
    if score_x > 0 and count_x != count_o:
        return 0
    if score_o > 0 and count_x + 1 != count_o:
        return 0

    return 1