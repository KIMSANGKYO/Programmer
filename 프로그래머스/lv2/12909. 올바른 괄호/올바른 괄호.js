function solution(s) {
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openCount++;
        } else {
            closeCount++;
        }

        if (closeCount > openCount) {
            return false; 
        }
    }

    return openCount === closeCount; 
}
