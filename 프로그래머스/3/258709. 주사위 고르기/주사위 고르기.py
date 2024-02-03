from itertools import combinations

def solution(dice):
    n = len(dice)
    set_size = n // 2
    dices = list(range(1, n + 1))

    def get_combinations(array, pick):
        if pick == 1:
            return [[element] for element in array]

        results = []
        for index, change in enumerate(array):
            rest = array[index + 1:]
            combinations = get_combinations(rest, pick - 1)
            attached = [[change, *combination] for combination in combinations]
            results.extend(attached)

        return results

    groups = get_combinations(dices, set_size)
    com_groups = [list(filter(lambda elemB: elemB not in elemA, dices)) for elemA in groups]

    def get_sums(combo):
        sums = []

        def calculate_sums(count, total):
            nonlocal sums
            if count == set_size:
                sums.append(total)
                return

            for i in range(6):
                calculate_sums(count + 1, total + dice[combo[count] - 1][i])

        calculate_sums(0, 0)
        return sorted(sums)

    answer = None
    wins = 0
    group_len = len(groups)

    for k in range(group_len):
        current_wins = 0
        sum_A = get_sums(groups[k])
        sum_B = get_sums(com_groups[k])
        len_A, len_B = len(sum_A), len(sum_B)
        pointer = 0

        for i in range(len_A):
            for j in range(pointer, len_B):
                if sum_A[i] <= sum_B[j]:
                    pointer = j
                    break
                current_wins += 1
            current_wins += pointer

        if current_wins > wins:
            wins = current_wins
            answer = groups[k]

    return answer
