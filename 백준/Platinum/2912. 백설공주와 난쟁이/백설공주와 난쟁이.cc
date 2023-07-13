#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>
#define MAX_N 300001
#define MAX_C 10001
#define FASTIO cin.tie(0); cout.tie(0); ios::sync_with_stdio(false);

using namespace std;

struct Query {
    int left, right, index;
};

int N, C, M, S, A, B;
int colors[MAX_N];
vector<Query> queries;
int leftPtr, rightPtr, value, which;
int countColors[MAX_C], countCount[MAX_N];
int answers[MAX_C];

void initialize() {
    for (int i = 0; i < MAX_C; i++) {
        answers[i] = -1;
    }
}

void readInput() {
    cin >> N >> C;
    for (int i = 0; i < N; i++) {
        cin >> colors[i];
    }
    cin >> M;
    for (int i = 0; i < M; i++) {
        cin >> A >> B;
        queries.push_back({ A - 1, B - 1, i });
    }
}

bool compareQueries(Query a, Query b) {
    if (a.left / S != b.left / S) {
        return (a.left / S < b.left / S);
    }
    return (a.right < b.right);
}

void preprocess() {
    S = sqrt(N);
    sort(queries.begin(), queries.end(), compareQueries);
    leftPtr = queries[0].left;
    rightPtr = queries[0].right;
    for (int i = leftPtr; i <= rightPtr; i++) {
        int currentColor = colors[i];
        countColors[currentColor]++;
    }
    for (int i = 1; i < MAX_C; i++) {
        if (countColors[i] * 2 > (rightPtr - leftPtr + 1)) {
            answers[queries[0].index] = i;
            break;
        }
    }
    for (int i = 1; i < M; i++) {
        while (queries[i].left < leftPtr) {
            leftPtr--;
            int currentColor = colors[leftPtr];
            countColors[currentColor]++;
        }
        while (queries[i].left > leftPtr) {
            int currentColor = colors[leftPtr];
            countColors[currentColor]--;
            leftPtr++;
        }
        while (queries[i].right > rightPtr) {
            rightPtr++;
            int currentColor = colors[rightPtr];
            countColors[currentColor]++;
        }
        while (queries[i].right < rightPtr) {
            int currentColor = colors[rightPtr];
            countColors[currentColor]--;
            rightPtr--;
        }
        for (int j = 1; j < MAX_C; j++) {
            if (countColors[j] * 2 > (queries[i].right - queries[i].left + 1)) {
                answers[queries[i].index] = j;
                break;
            }
        }
    }
}

void printAnswers() {
    for (int i = 0; i < M; i++) {
        if (answers[i] != -1) {
            cout << "yes " << answers[i] << "\n";
        }
        else {
            cout << "no\n";
        }
    }
}

int main() {
    FASTIO
    initialize();
    readInput();
    preprocess();
    printAnswers();

    return 0;
}