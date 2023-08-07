#include <iostream>
#include <vector>
#include <deque>

std::vector<std::vector<int>> solution(std::vector<std::vector<int>> rc, std::vector<std::string> operations) {
    int rowLen = rc.size();
    int colLen = rc[0].size();
    
    std::deque<std::deque<int>> rows;
    for (const auto& row : rc) {
        rows.emplace_back(row.begin() + 1, row.end() - 1);
    }
  
    std::deque<int> out_cols[2];
    for (int r = 0; r < rowLen; ++r) {
        out_cols[0].push_back(rc[r][0]);
        out_cols[1].push_back(rc[r][colLen - 1]);
    }

    for (const auto& operKey : operations) {
        if (operKey[0] == 'S') {
            rows.push_front(std::move(rows.back()));
            rows.pop_back();
            out_cols[0].push_front(out_cols[0].back());
            out_cols[0].pop_back();
            out_cols[1].push_front(out_cols[1].back());
            out_cols[1].pop_back();
        } else {
            rows.back().push_back(out_cols[1].back());
            out_cols[1].pop_back();
            out_cols[0].push_back(rows.back().front());
            rows.back().pop_front();
            rows.front().push_front(out_cols[0].front());
            out_cols[0].pop_front();
            out_cols[1].push_front(rows.front().back());
            rows.front().pop_back();
        }
    }
    
    std::vector<std::vector<int>> result;
    for (int r = 0; r < rowLen; ++r) {
        result.push_back({out_cols[0][r]});
        result[r].insert(result[r].end(), rows[r].begin(), rows[r].end());
        result[r].push_back(out_cols[1][r]);
    }
    
    return result;
}

