function solution(progresses, speeds) {
    const answer = [];
    const queue = [];

    for (let i = 0; i < progresses.length; i++) {
        const remaining = Math.ceil((100 - progresses[i]) / speeds[i]);

        if (queue.length === 0 || queue[0] < remaining) {
            queue.unshift(remaining);
            answer.push(1);
        } else {
            answer[answer.length - 1]++;
        }
    }

    return answer;
}