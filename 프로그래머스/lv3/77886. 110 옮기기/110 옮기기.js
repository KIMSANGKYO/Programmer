function solution(s) {
    // 110을 찾아 스택 배열에 저장하고, 원래 s 값 갱신 
    // 새로 만든 s 가 최소일때로 만들고, 110이 더있으면 확인 
    
    const result = [];

    for (const str of s) {
      const stack = [];
      let count = 0;

      for (const rd of str) {
        if (stack.length >= 2 && stack[stack.length - 2] === '1' && stack[stack.length - 1] === '1' && rd === '0') {
          count++;
          stack.pop();
          stack.pop();
        } else {
          stack.push(rd);
        }
      }

      if (count === 0) {
        result.push(str);
      } else {
        const target = '011';
        const list = [];

        while (stack.length && stack[stack.length - 1] !== '0') {
          list.push(stack.pop());
        }

        while (count > 0) {
          list.push(...target);
          count--;
        }

        while (stack.length) {
          list.push(stack.pop());
        }

        result.push(list.reverse().join(''));
      }
    }

    return result;
}