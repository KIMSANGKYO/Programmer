function solution(phone_book) {
    const hashSet = new Set();

    // 해시셋에 전화번호를 추가합니다.
    for (let i = 0; i < phone_book.length; i++) {
        hashSet.add(phone_book[i]);
    }

    // 각 전화번호의 가능한 모든 접두어에 대해 해시셋을 검사합니다.
    for (let i = 0; i < phone_book.length; i++) {
        let prefix = "";
        for (let j = 0; j < phone_book[i].length; j++) {
            prefix += phone_book[i][j];
            if (hashSet.has(prefix) && prefix !== phone_book[i]) {
                // 현재 전화번호의 접두어가 해시셋에 존재하고 현재 전화번호와 다를 경우 false를 반환합니다.
                return false;
            }
        }
    }

    // 모든 전화번호에 대해 접두어 여부를 확인했을 때, true를 반환합니다.
    return true;
}
