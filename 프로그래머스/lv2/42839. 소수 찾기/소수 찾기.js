function solution(numbers) {
  const numberSet = new Set();

  function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  function combine(current, remaining) {
    if (current.length > 0) {
      const number = parseInt(current.join(''));
      if (isPrime(number)) {
        numberSet.add(number);
      }
    }

    for (let i = 0; i < remaining.length; i++) {
      const nextl = current.concat(remaining[i]);
      const nextR = remaining.slice(0, i).concat(remaining.slice(i + 1));
      combine(nextl, nextR);
    }
  }

  const arrNumbers = numbers.split('');

  combine([], arrNumbers);

  return numberSet.size;
}
