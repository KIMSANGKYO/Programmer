def solution(cap, n, deliveries, pickups):
    result = 0
    pick = pickups.copy()
    delete = deliveries.copy()

    delete = zero_delete(delete)
    pick = zero_delete(pick)

    while delete or pick:
        result += max(len(delete), len(pick)) * 2
        temp_cap = cap

        while delete:
            if delete[-1] > temp_cap:
                delete[-1] -= temp_cap
                break
            else:
                temp_cap -= delete[-1]
                delete.pop()

        temp_cap = cap
        while pick:
            if pick[-1] > temp_cap:
                pick[-1] -= temp_cap
                break
            else:
                temp_cap -= pick[-1]
                pick.pop()

    return result

def zero_delete(arr):
    while arr and arr[-1] == 0:
        arr.pop()
    return arr
