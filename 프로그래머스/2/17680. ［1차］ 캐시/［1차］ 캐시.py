from collections import deque

def solution(cacheSize, cities):
    if cacheSize == 0:
        return len(cities) * 5

    cache = deque(maxlen=cacheSize)
    time = 0

    for city in cities:
        city_lower = city.lower()

        if city_lower in cache:
            cache.remove(city_lower)
            cache.append(city_lower)
            time += 1
        else:
            cache.append(city_lower)
            time += 5

    return time
