import math

def solution(fees, records):
    result = []
    parking_list = {}

    def trans_time(time):
        hour, minute = map(int, time.split(":"))
        return hour * 60 + minute

    def calculate_fee(total_time):
        basic_time, basic_fee, unit_time, unit_fee = fees
        exceeded_time = total_time - basic_time

        return basic_fee if exceeded_time < 0 else basic_fee + math.ceil(exceeded_time / unit_time) * unit_fee

    for record in records:
        parking_time, num, state = record.split(" ")

        if state == "IN":
            if num in parking_list:
                parking_list[num] = {
                    **parking_list[num],
                    "time": trans_time(parking_time),
                    "state": state,
                }
            else:
                parking_list[num] = {
                    "time": trans_time(parking_time),
                    "state": state,
                    "total_time": 0,
                }
        else:
            parking_list[num]["total_time"] += trans_time(parking_time) - parking_list[num]["time"]
            parking_list[num] = {
                **parking_list[num],
                "time": trans_time(parking_time),
                "state": state,
            }

    for car in parking_list:
        if parking_list[car]["state"] == "IN":
            parking_list[car]["total_time"] += trans_time("23:59") - parking_list[car]["time"]
        parking_list[car]["fee"] = calculate_fee(parking_list[car]["total_time"])

    for car in sorted(parking_list):
        result.append(parking_list[car]["fee"])

    return result


