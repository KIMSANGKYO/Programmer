// function solution(s) {
//     return s.split(' ').map((e)=>e[0].toUpperCase()+(e.slice(1)).toLowerCase()).join(' '); //
// }

function solution(s) {
    return s.split(' ').map((word) => {
        if (word.length === 0) {
            return word; 
        }
        
        const firstChar = word[0].toUpperCase();
        const restChars = word.slice(1).toLowerCase();
        return firstChar + restChars;
    }).join(' ');
}
