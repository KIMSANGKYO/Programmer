def solution(board):
    if not board or not board[0]:
        return 0
    
    rows = len(board)
    cols = len(board[0])
    dp = [[0] * cols for _ in range(rows)]
    rec_side = 0

    for i in range(rows):
        for j in range(cols):
            if i == 0 or j == 0:
                dp[i][j] = board[i][j]
            elif board[i][j] == 1:
                dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
            else:
                dp[i][j] = 0
            rec_side = max(rec_side, dp[i][j])
    
    return rec_side * rec_side