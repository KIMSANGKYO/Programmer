#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>

const int MAXN = 510000;
const int INF = 0x3f3f3f3f;

typedef std::pair<int, int> pii;
typedef std::vector<std::pair<int, int>> vpi;

vpi visit[MAXN];

int n, u, d, s;
int upBoard[2 * MAXN], downBoard[2 * MAXN];

int query(int *arr, int l, int r)
{
    int ans = -INF;
    for (l += MAXN, r += MAXN; l <= r; l >>= 1, r >>= 1)
    {
        if (l & 1)
            ans = std::max(ans, arr[l++]);
        if (~(r & 1))
            ans = std::max(ans, arr[r--]);
    }
    return ans;
}

void update(int *arr, int x, int v)
{
    x += MAXN;
    arr[x] = std::max(arr[x], v);
    for (; x > 1; x >>= 1)
        arr[x >> 1] = std::max(arr[x], arr[x ^ 1]);
}

void setLocation(int x, int v)
{
    update(upBoard, x, v - u * x);
    update(downBoard, x, v + d * x);
}

int setQuery(int a)
{
    return std::max(query(downBoard, 0, a) - d * a, query(upBoard, a, MAXN - 1) + u * a);
}

void find(vpi &market)
{
    if (market.size() == 0)
        return;
    std::sort(market.begin(), market.end());
    std::vector<int> U, D;
    int len = market.size();
    for (int i = 0; i < len; i++)
    {
        int current = setQuery(market[i].first);
        U.push_back(current), D.push_back(current);
    }
    for (int i = 0; i < len; i++)
    {
        if (i != 0)
            D[i] = std::max(D[i], D[i - 1] - d * (market[i].first - market[i - 1].first));
        D[i] += market[i].second;
    }
    for (int i = len - 1; i >= 0; i--)
    {
        if (i != len - 1)
            U[i] = std::max(U[i], U[i + 1] - u * (market[i + 1].first - market[i].first));
        U[i] += market[i].second;
    }
    for (int i = 0; i < len; i++)
        setLocation(market[i].first, std::max(U[i], D[i]));
}

int main()
{
    std::cin >> n >> u >> d >> s;
    for (int i = 0, x, y, z; i < n; i++)
    {
        std::cin >> x >> y >> z;
        visit[x].push_back(std::make_pair(y, z));
    }
    std::memset(upBoard, 0xc0, sizeof(upBoard));
    std::memset(downBoard, 0xc0, sizeof(downBoard));
    setLocation(s, 0);
    for (int i = 1; i <= 500001; i++)
        find(visit[i]);
    std::cout << setQuery(s) << std::endl;
    
    return 0;
}