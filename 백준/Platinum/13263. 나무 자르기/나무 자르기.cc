#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using pll = pair<ll, ll>;
const ll INF = 1e10;

int N;
ll a[100005], b[100005], dp[100005];
int ptr;
struct Line {
    ll slope, yIntercept;
    double intersectionX;

    Line(ll _slope, ll _yIntercept, double _intersectionX) : slope(_slope), yIntercept(_yIntercept), intersectionX(_intersectionX) {}

    ll eval(ll x) {
        return slope * x + yIntercept;
    }
};

vector<Line> lines;

double intersection(Line& a, Line& b) {
    return static_cast<double>(b.yIntercept - a.yIntercept) / (a.slope - b.slope);
}

void addLine(ll slope, ll yIntercept) {
    Line newLine(slope, yIntercept, -INF);

    if (lines.empty()) {
        lines.push_back(newLine);
        return;
    }

    while (!lines.empty()) {
        Line top = lines.back();
        double x = intersection(top, newLine);
        if (x <= top.intersectionX) {
            lines.pop_back();
        } else {
            break;
        }
    }

    newLine.intersectionX = intersection(lines.back(), newLine);
    lines.push_back(newLine);
    if (ptr >= lines.size()) {
        ptr = lines.size() - 1;
    }
}

ll query(ll x) {
    while (ptr < lines.size() - 1 && lines[ptr + 1].intersectionX < x) {
        ++ptr;
    }
    return lines[ptr].eval(x);
}

int main() {
    cin.tie(nullptr);
    ios::sync_with_stdio(false);

    cin >> N;
    for (int i = 0; i < N; ++i) {
        cin >> a[i];
    }
    for (int i = 0; i < N; ++i) {
        cin >> b[i];
    }

    dp[0] = 0;
    addLine(b[0], dp[0]);

    for (int i = 1; i < N; ++i) {
        dp[i] = query(a[i]);
        addLine(b[i], dp[i]);
    }

    cout << dp[N - 1] << '\n';

    return 0;
}