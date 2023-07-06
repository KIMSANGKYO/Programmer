function solution(commands) {
    let table = [...Array(51)].map(() => Array(51).fill("EMPTY"));
    // 부모셀 저장 이중 배열 셀의위치 (r,c)
    let pTable = [...Array(51)].map((_, r) => Array.from({ length: 51 }, (_, c) => [r, c]));
    let result = [];

    // 부모셀 찾기
    function find(r, c) {
        if (r === pTable[r][c][0] && c === pTable[r][c][1]) {
             return pTable[r][c];
  }
        // 현재 셀 부모위치 , 갱신
        let [nr, nc] = pTable[r][c];
        pTable[r][c] = find(nr, nc);
        return pTable[r][c];
}

    // 두개의 셀 연결 (동일 부모루트)
    function union(r1, c1, r2, c2) {
        pTable[r2][c2] = pTable[r1][c1];
}

    // 부모 셀에 value 삽입
    function update(r, c, value) {
        let [nr, nc] = find(r, c);
        table[nr][nc] = value;
}

    // 모든 셀의 값 검색, 갱신
    function updateValue(v1, v2) {
        for (let i = 0; i < 51; i++) {
        for (let j = 0; j < 51; j++) {
        if (table[i][j] === v1) {    
            table[i][j] = v2;
      }
    }
  }
}
// 병합 함수
function merge(r1, c1, r2, c2) {
    let [nr1, nc1] = find(r1, c1);
    let [nr2, nc2] = find(r2, c2);

    if (table[nr1][nc1] !== "EMPTY") {
        union(nr1, nc1, nr2, nc2);
  } else {
        if (table[nr2][nc2] !== "EMPTY") {           
            table[nr1][nc1] = table[nr2][nc2];
    }
    union(nr1, nc1, nr2, nc2);
  }
}

function unMerge(r, c) {
  let [nr, nc] = find(r, c);
  // 부모셀로부터 받은 셀에 값이 있을때 저장
  let temp = table[nr][nc];
  let tempList = [];
  // 연결된 셀 병합 전부 해제
  for (let i = 0; i < 51; i++) {
    for (let j = 0; j < 51; j++) {
      if (find(i, j)[0] === nr && find(i, j)[1] === nc) {
        tempList.push([i, j]);
      }
    }
  }

  for (let t of tempList) {
    let [i, j] = t;
    table[i][j] = "EMPTY";
    pTable[i][j] = [i, j];
  }

  table[r][c] = temp;
}

function print(r, c) {
  let [nr, nc] = find(r, c);
  result.push(table[nr][nc]);
}


  for (let command of commands) {
    let c = command.split(" ");

    if (c[0] === "UPDATE") {
      if (c.length === 4) {
        update(parseInt(c[1]), parseInt(c[2]), c[3]);
      } else {
        updateValue(c[1], c[2]);
      }
    } else if (c[0] === "MERGE") {
      merge(parseInt(c[1]), parseInt(c[2]), parseInt(c[3]), parseInt(c[4]));
    } else if (c[0] === "UNMERGE") {
      unMerge(parseInt(c[1]), parseInt(c[2]));
  } else if (c[0] === "PRINT") {
      print(parseInt(c[1]), parseInt(c[2]));
    }
  }

  return result;
}