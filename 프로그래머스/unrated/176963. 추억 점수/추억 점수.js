function solution(name, yearning, photo) {
    const scores = [];
  
    for (const pic of photo) {
        let totalScore = 0;
        for (const person of pic) {
            const index = name.indexOf(person);
            if (index !== -1) {
                totalScore += yearning[index];
            }
        }
        scores.push(totalScore);
    }

    return scores;
}