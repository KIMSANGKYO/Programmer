function solution(citations) {
    citations.sort((a, b) => b - a);
    
    let hIndex = 0;
    
    while (hIndex < citations.length && citations[hIndex] > hIndex) {
        hIndex++;
    }

    return hIndex;
}
