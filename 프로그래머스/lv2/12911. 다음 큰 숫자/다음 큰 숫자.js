function solution(n) {
    const countOne = num => {
        let count = 0;
        while (num > 0) {
            if (num % 2 === 1) {
                count++;
            }
            num = Math.floor(num / 2);
        }
        return count;
    }
    
    const targetCount = countOne(n);
    
    while (true) {
        n++;
        if (targetCount === countOne(n)) {
            return n;
        }
    }
}