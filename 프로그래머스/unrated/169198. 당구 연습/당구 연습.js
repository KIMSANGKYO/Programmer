function solution(m, n, startX, startY, balls) {
    const result = [];

    for (const [x2, y2] of balls) {
        if (startX === x2) {
            const a = (y2 - startY) * (y2 - startY) + 4 * startX * startX;
            const b = (y2 - startY) * (y2 - startY) + 4 * (m - startX) * (m - startX);
            const c = startY < y2 ? (startY + y2) * (startY + y2) : (2 * n - startY - y2) * (2 * n - startY - y2);
            result.push(Math.min(Math.min(a, b), c));
        } else if (startY === y2) {
            const a = (x2 - startX) * (x2 - startX) + 4 * startY * startY;
            const b = (x2 - startX) * (x2 - startX) + 4 * (n - startY) * (n - startY);
            const c = startX < x2 ? (startX + x2) * (startX + x2) : (2 * m - startX - x2) * (2 * m - startX - x2);
            result.push(Math.min(Math.min(a, b), c));
        } else {
            const a = (x2 - startX) * (x2 - startX) + (y2 + startY) * (y2 + startY);
            const b = (x2 + startX) * (x2 + startX) + (y2 - startY) * (y2 - startY);
            const c = (y2 - startY) * (y2 - startY) + (2 * m - startX - x2) * (2 * m - startX - x2);
            const d = (x2 - startX) * (x2 - startX) + (2 * n - startY - y2) * (2 * n - startY - y2);
            result.push(Math.min(Math.min(a, b), Math.min(c, d)));
        }
    }

    return result;
}



