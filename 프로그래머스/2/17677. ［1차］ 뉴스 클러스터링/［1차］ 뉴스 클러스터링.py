def solution(str1, str2):
    str1 = [str1[i:i+2].lower() for i in range(len(str1)-1) if str1[i:i+2].isalpha()]
    str2 = [str2[i:i+2].lower() for i in range(len(str2)-1) if str2[i:i+2].isalpha()]

    inter = sum((min(str1.count(el), str2.count(el)) for el in set(str1) & set(str2)))
    union = sum((max(str1.count(el), str2.count(el)) for el in set(str1) | set(str2)))

    if not union:
        return 65536

    similarity = inter / union * 65536
    return int(similarity)
