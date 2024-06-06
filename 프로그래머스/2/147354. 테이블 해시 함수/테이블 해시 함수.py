def solution(data, col, row_begin, row_end):
    
    sorted_data = sorted(data, key=lambda x: (x[col-1], -x[0]))

    hash_result = 0
    
    for i in range(row_begin-1, row_end):
        sum_i = sum(value % (i+1) for value in sorted_data[i])
        hash_result ^= sum_i
    
    return hash_result