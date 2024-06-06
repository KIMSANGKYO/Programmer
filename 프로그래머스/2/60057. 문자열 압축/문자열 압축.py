# 문자열 압축 함수
def string_compress(s, unit):
    compressed = ""
    prev = s[:unit]
    count = 1
    
    for i in range(unit, len(s), unit):
        part = s[i:i + unit]
        if part == prev:
            count += 1
        else:
            compressed += (str(count) if count > 1 else '') + prev
            prev = part
            count = 1
    compressed += (str(count) if count > 1 else '') + prev
    return compressed

def solution(s):
    if len(s) == 1:
        return 1
    
    min_length = float('inf')
    
    for unit in range(1, len(s) // 2 + 1):
        compressed = string_compress(s, unit)
        # 짧은 문자열 길이
        min_length = min(min_length, len(compressed))
    
    return min_length
