def solution(book_time):
    # 시작시간 순 정렬
    book_time.sort()

    # 종료 시간
    list_end = []

    for t in book_time:
        # 분으로 변환
        start_time = int(t[0][:2]) * 60 + int(t[0][3:])
        
        idx = -1
        for i, end_time in enumerate(list_end):
            if end_time <= start_time:
                idx = i
                break
        
        if idx == -1:
            list_end.append(get_next(t[1]))
        else:
            list_end[idx] = get_next(t[1])

    # room의 길이(필요한 객실 수)를 반환합니다.
    return len(list_end)

# 다음 가능 시간
def get_next(end_time):
    # 분으로 변환 + 청소 10분
    next_time = int(end_time[:2]) * 60 + int(end_time[3:]) + 10
    
    return next_time

# # 디폴트 타입 지정 
# from collections import defaultdict

# def solution(book_time):
#     # 분 단위로 변환
#     def time_to_minutes(time_str):
#         hours, minutes = map(int, time_str.split(':'))
#         return hours * 60 + minutes

#     # 각 시간별 이용 여부 체크
#     room_status = defaultdict(int)

#     for booking in book_time:
#         start_time = time_to_minutes(booking[0])
#         end_time = time_to_minutes(booking[1])

#         # 예약한 시간 동안 객실 사용 체크
#         for time in range(start_time, end_time):
#             room_status[time] += 1

#     max_rooms_needed = max(room_status.values())  # 최대 객실 수

#     return max_rooms_needed


