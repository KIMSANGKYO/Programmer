#include <vector>
#include <unordered_map>
using namespace std;

int answer = 0;
vector<vector<int>> board(100100);
vector<bool> visited(100100, false);

pair<int, int> dfs(int node) {
    visited[node] = true;

    if (board[node].empty()) {
        return {1, 0};
    }

    int on = 1;
    int off = 0;

    for (const int v : board[node]) {
        if (!visited[v]) {
            pair<int, int> link = dfs(v);
            on += min(link.first, link.second);
            off += link.first;
        }
    }

    return {on, off};
}

int solution(int n, vector<vector<int>> lighthouse) {
    for (int i = 1; i <= n; i++) {
        board[i].clear();
    }

    for (const auto& l : lighthouse) {
        int u = l[0];
        int v = l[1];
        board[u].push_back(v);
        board[v].push_back(u);
    }

    pair<int, int> result = dfs(1);
    return min(result.first, result.second);
}