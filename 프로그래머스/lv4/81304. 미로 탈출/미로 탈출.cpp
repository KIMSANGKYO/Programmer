#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>

using namespace std;

const int INF = INT_MAX;

bool reverseCheck(int cs, int ns, int cLoca, const unordered_map<int, int>& index) {
    bool curT = false;
    bool nextT = false;
    if (index.count(cs)) {
        curT = (cLoca & (1 << index.at(cs))) > 0;
    }
    if (index.count(ns)) {
        nextT = (cLoca & (1 << index.at(ns))) > 0;
    }
    return curT != nextT;
}

int setNext(int ns, int cLoca, const unordered_map<int, int>& index) {
    if (index.count(ns)) {
        return cLoca ^ (1 << index.at(ns));
    }
    return cLoca;
}

int solution(int n, int start, int end, vector<vector<int>> roads, vector<int> traps) {
    int result = INF;
    vector<vector<int>> minCost(1 << traps.size(), vector<int>(n + 1, INF));
    unordered_map<int, int> trapBoard;
    for (int i = 0; i < traps.size(); ++i) {
        trapBoard[traps[i]] = i;
    }
    vector<vector<vector<int>>> graph(n + 1);

    for (const auto& road : roads) {
        int rs = road[0];
        int re = road[1];
        int rcost = road[2];
        graph[rs].push_back({re, rcost, false});
        graph[re].push_back({rs, rcost, true});
    }

    priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> queue;
    queue.push({0, start, 0});
    minCost[0][start] = 0;

    while (!queue.empty()) {
        vector<int> cur = queue.top();
        queue.pop();
        int cSum = cur[0];
        int cs = cur[1];
        int cLoca = cur[2];

        if (cs == end) {
            result = min(result, cSum);
            continue;
        }

        if (cSum > minCost[cLoca][cs]) {
            continue;
        }

        for (const auto& next : graph[cs]) {
            int ns = next[0];
            int nCost = next[1];
            bool reverse = next[2];

            if (reverse != reverseCheck(cs, ns, cLoca, trapBoard)) {
                continue;
            }

            int nLoca = setNext(ns, cLoca, trapBoard);
            int nSum = nCost + cSum;

            if (nSum >= minCost[nLoca][ns]) {
                continue;
            }

            minCost[nLoca][ns] = nSum;
            queue.push({nSum, ns, nLoca});
        }
    }

    return result;
}
