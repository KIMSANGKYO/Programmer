def solution(h1, m1, s1, h2, m2, s2):
    # 겹치는 횟수 반환
    def overlap_count(h, m, s):
        # 1h > 30도 12등분
        h_degree = (h * 30 + m * 0.5 + s * 0.5 / 60) % 360
        m_degree = (m * 6 + s * 0.1) % 360
        s_degree = s * 6
        # 자정 시작 기본값 설정
        start = -1
        # 초침이 분침 시침 지날때 카운팅
        if s_degree >= m_degree:
            start += 1
        if s_degree >= h_degree:
            start += 1
        start += (h * 60 + m) * 2  
        start -= h
        if h >= 12:
            start -= 2 # 12시 일때 둘다 분시침 둘다 겹칠때 카운팅 1로 처리
        return start

    alarm = overlap_count(h2, m2, s2) - overlap_count(h1, m1, s1)
    if (h1 == 0 or h1 == 12) and m1 == 0 and s1 == 0:
        alarm += 1 
    return alarm