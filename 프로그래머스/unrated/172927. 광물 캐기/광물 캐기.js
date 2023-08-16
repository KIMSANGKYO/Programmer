function solution(picks, minerals) {
    let sum = 0;
    
    for (const x of picks) {
        sum += x;
    }

    const minPick = sum * 5;
    
    if (minerals.length > minPick) {
        minerals = minerals.slice(0, minPick);
    }

    const minCount = Array.from({ length: 10 }, () => [0, 0, 0]);
    
    for (let i = 0; i < minerals.length; i++) {
        const mineral = minerals[i];
        if (mineral === 'diamond') {
            minCount[Math.floor(i / 5)][0] += 1;
        } else if (mineral === 'iron') {
            minCount[Math.floor(i / 5)][1] += 1;
        } else {
            minCount[Math.floor(i / 5)][2] += 1;
        }
    }

    const sortedCount = minCount.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);

    let result = 0;
    for (const mineral of sortedCount) {
        const [d, i, s] = mineral;
        for (let p = 0; p < picks.length; p++) {
            if (p === 0 && picks[p] > 0) { 
                picks[p]--;
                result += d + i + s;
                break;
            } else if (p === 1 && picks[p] > 0) { 
                picks[p]--;
                result += 5 * d + i + s;
                break;
            } else if (p === 2 && picks[p] > 0) { 
                picks[p]--;
                result += 25 * d + 5 * i + s;
                break;
            }
        }
    }

    return result;
}