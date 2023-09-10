def solution(k, num, links):
    node_tree = {}
    for i, v in enumerate(links):
        node_tree[i] = {
            'cost': num[i],
            'l': v[0],
            'r': v[1],
        }

    n = len(num)
    start = n * (n - 1) // 2
    for link in links:
        a, b = link
        if a > 0:
            start -= a
        if b > 0:
            start -= b

    def node_check(limit):
        stack = [start]
        cur_check = {
            -1: {
                'cost': 0,
                'cnt': 0,
            }
        }

        while stack:
            now = stack[-1]
            node_info = node_tree[now]
            left_value = cur_check.get(node_info['l'])
            right_value = cur_check.get(node_info['r'])

            if not left_value:
                stack.append(node_info['l'])
                continue
            if not right_value:
                stack.append(node_info['r'])
                continue

            stack.pop()
            cur_check[now] = {
                'cost': node_info['cost'],
                'cnt': left_value['cnt'] + right_value['cnt'],
            }
            ret = cur_check[now]

            def min_lim(*nodes):
                node_sum = sum(node['cost'] for node in nodes)
                return node_sum <= limit

            if min_lim(ret, left_value, right_value):
                ret['cost'] += left_value['cost'] + right_value['cost']
            elif min_lim(ret, left_value) or min_lim(ret, right_value):
                ret['cost'] += min(left_value['cost'], right_value['cost'])
                ret['cnt'] += 1
            else:
                ret['cnt'] += 2

        return cur_check[start]

    def solve():
        max_value = max(num)
        mod = 11111 * n
        result = mod

        while max_value <= mod:
            m = (max_value + mod) // 2

            if node_check(m)['cnt'] <= k - 1:
                mod = m - 1
                result = min(result, m)
            else:
                max_value = m + 1

        return result

    return solve()


