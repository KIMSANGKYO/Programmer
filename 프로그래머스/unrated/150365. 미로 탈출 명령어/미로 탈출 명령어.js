function calc_dist(x, y, r, c) {
  return Math.abs(x - r) + Math.abs(y - c);
}

function solution(n, m, x, y, r, c, k) {
  if ((k - calc_dist(x, y, r, c)) % 2 || k < calc_dist(x, y, r, c)) {
    return "impossible"; // 도달 불가
  }
  // 이동 경로
  let result = ""; 
  // 이동 횟수
  let move = 0; 
  
  // 아래로 최대한 이동
  while (x < n && (k - move) > calc_dist(x, y, r, c)) {
    move += 1; // 이동 횟수 증가
    x += 1; // 아래로 이동
    result += "d"; // 이동 방향을 경로에 추가
  }
  
  // 좌측으로 최대한 이동
  while (1 < y && (k - move) > calc_dist(x, y, r, c)) {
    move += 1; 
    y -= 1; 
    result += "l"; 
  }
  
  // 우좌 반복 이동
  while ((k - move) > calc_dist(x, y, r, c)) {
    move += 2; // 이동 횟수 증가 좌우 2칸
    result += "rl"; // 좌우 반복 경로
  }
  
  //  dlru 순으로 이동
  if (x < r) {
    result += "d".repeat(r - x); //아래
    x = r; 
  }
  if (y > c) {
    result += "l".repeat(y - c); //왼쪽
    y = c; 
  }
  if (y < c) {
    result += "r".repeat(c - y); //오른쪽
    y = c; // 현재 위치를 목표 위치로 갱신
  }
  if (x > r) {
    result += "u".repeat(x - r); // 위
    x = r; // 현재 위치를 목표 위치로 갱신
  }
  
  return result;
}