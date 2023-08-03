#include <iostream>
#include <cmath>

using namespace std;

int check(int n, int m) {
    if (n == 3 && m == 2) return 1;
    else if (n < 3 || std::log(n) / std::log(3) * 2 < m) return 0;
    else if (n == 3 && m == 3) return 0;

    return check(n - 1, m + 1) + (n % 3 == 0 && m > 1 ? check(n / 3, m - 2) : 0);
}

int solution(int n) {
    return check(n - 2, 2);
}


