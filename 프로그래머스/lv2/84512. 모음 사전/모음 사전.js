function solution(word) {

  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let count = 0;
  
  for (let i = 0; i < 5; i++) {
    if (word === vowels[i]) return count + 1;
    count++;
    
    for (let j = 0; j < 5; j++) {
      const word2 = vowels[i] + vowels[j];
      if (word === word2) return count + 1;
      count++;
      
      for (let k = 0; k < 5; k++) {
        const word3 = word2 + vowels[k];
        if (word === word3) return count + 1;
        count++;
        
        for (let l = 0; l < 5; l++) {
          const word4 = word3 + vowels[l];
          if (word === word4) return count + 1;
          count++;
          
          for (let m = 0; m < 5; m++) {
            const word5 = word4 + vowels[m];
            if (word === word5) return count + 1;
            count++;
          }
        }
      }
    }
  }
}