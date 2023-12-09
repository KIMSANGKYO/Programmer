function solution(phone_book) {
    let answer = true;

    const table = new Set(phone_book);

    for(const phone_number of phone_book) {
        for(let i = 1; i < phone_number.length; i++) {
            if(table.has(phone_number.slice(0, i))) {
                return false;
            }
        }
    }

    return answer;
}
