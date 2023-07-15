#include <bits/stdc++.h>
#define int long long
using namespace std;

struct MaxFlow {
    struct Edge { 
        int num, capacity, order; 
    };

    vector<vector<Edge>> adj;
    int size, source, sink;
    vector<int> level, index;

    void init(int size_) { 
        size = size_; 
        adj.resize(size); 
    }

    void addEdge(int a, int b, int c) {
        adj[a].push_back({b, c, adj[b].size()});
        adj[b].push_back({a, 0, adj[a].size()-1});
    }

    bool bfs() {
        level.clear();
        level.resize(size, -1);
        level[source] = 0;

        queue<int> q;
        q.push(source);

        while (!q.empty()) {
            int x = q.front();
            q.pop();

            for (auto e : adj[x]) {
                int y = e.num;
                int capacity = e.capacity;

                if (level[y] != -1 || capacity == 0) 
                    continue;

                level[y] = level[x] + 1;
                q.push(y);
            }
        }

        if (level[sink] != -1)
            return true;
        else
            return false;
    }

    int dfs(int x, int flow) {
        if (x == sink) 
            return flow;

        for (int &i = index[x]; i < adj[x].size(); i++) {
            int y = adj[x][i].num;
            int capacity = adj[x][i].capacity;

            if (level[x] + 1 != level[y] || capacity == 0)
                continue;

            int subflow = dfs(y, min(flow, capacity));

            if (subflow == 0)
                continue;

            adj[x][i].capacity -= subflow;
            adj[y][adj[x][i].order].capacity += subflow;

            return subflow;
        }

        return 0;
    }

    void findMaxFlow(int source_, int sink_) {
        int maxFlow = 0;
        source = source_;
        sink = sink_;

        while (bfs()) {
            index.clear();
            index.resize(size);

            while (true) {
                int subflow = dfs(source, INT_MAX);

                if (subflow == 0)
                    break;

                maxFlow += subflow;
            }
        }
    }
};

int32_t main() {
    cin.tie(0)->sync_with_stdio(0);

    int N, M;
    cin >> N >> M;

    MaxFlow maxFlow;
    maxFlow.init(N * 2 + 1);

    int source, sink;
    cin >> source >> sink;

    sink += N;

    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        maxFlow.addEdge(i, N + i, x);
    }

    while (M--) {
        int a, b;
        cin >> a >> b;
        maxFlow.addEdge(N + a, b, INT_MAX);
        maxFlow.addEdge(N + b, a, INT_MAX);
    }

    maxFlow.findMaxFlow(source, sink);

    for (int i = 1; i <= N; i++) {
        if (maxFlow.level[i] != -1 && maxFlow.level[N + i] == -1)
            cout << i << " ";
    }

    cout << "\n";
}