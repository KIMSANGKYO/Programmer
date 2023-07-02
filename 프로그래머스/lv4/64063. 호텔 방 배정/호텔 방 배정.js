function solution(k, room_number) {
  const parent = new Map(); // 부모 노드를 저장하는 맵

  function findEmptyRoom(room) {
    if (!parent.has(room)) {
      // 방이 비어있는 경우
      parent.set(room, room + 1); // 방을 사용 중으로 표시
      return room;
    }

    const nextRoom = findEmptyRoom(parent.get(room));
    parent.set(room, nextRoom); // 경로 압축
    return nextRoom;
  }

  const result = [];
  for (const room of room_number) {
    const emptyRoom = findEmptyRoom(room);
    result.push(emptyRoom);
  }

  return result;
}

// function solution(k, room_number) {
//     const roomStatus = new Map();
//     const result = [];
    
//     // 재귀로 다음 빈방 찾기 
//     function findEmptyRoom(roomStatus, room) {
//         if(!roomStatus.has(room)){
//             roomStatus.set(room,true);
//             return room;
//         }
        
//         const emptyRoom = findEmptyRoom(roomStatus,room+1);
//         roomStatus.set(emptyRoom,true);
//         return emptyRoom;
//     }
    
//     for(const room of room_number){
//         const emptyRoom = findEmptyRoom(roomStatus, room);
//         result.push(emptyRoom);
//     }
    
//     return result;
// }



// function solution(k, room_number) {
//     // 방 개수 k 
//     // 선착순으로 원하는 방번호에 고객을 넣는데 이미 들어가있다면 그 번호보다 큰 번호들중 가장 작은 번호방에 
//       // 방번호는 자연수임을 생각 
    
//     // 방이 이미 차있는지 확인
//     const isIn = new Array(k).fill(false);
//     // 고객이 들어가는 방번호 
//     let result = [];
    
//     for(let i=0; i<room_number.length; i++){
//         // 고객이 원하는 방이 비어있을때
//         if(!isIn[room_number[i]-1]){
//             isIn[room_number[i]-1] = true;
//             result.push(room_number[i])
//         }else{
//             // 이미 있을땐 다음 방번호들중 false 
//             // isIn 배열을 잘라서 확인 
//             let nextEmptyIdx = isIn.slice(room_number[i]).indexOf(false)
//             isIn[room_number[i]-1+nextEmptyIdx+1] = true;
//             result.push(room_number[i]+nextEmptyIdx+1)
//         }
//     }
//     return result;
// }

// -------- 정확하지만, 시간복잡도 개선 필요 ------

// 해시맵 사용

// function solution(k, room_number) {
//     // 방의 상태를 저장하는 맵
//     const roomStatus = new Map(); 
//     const result = [];

//     for (const room of room_number) {
//         if (!roomStatus.has(room)) { 
//             // 방이 비어있는 경우 
//             // 상태변경
//             roomStatus.set(room, true); 
//             result.push(room);
//         }else{
//             // 이미 방이 차있는 경우, 다음 빈방
//             let nextRoom = room + 1;
//             while (roomStatus.has(nextRoom)) {
//                 // 다음 방으로 이동
//                 nextRoom++; 
//         }
//             roomStatus.set(nextRoom, true); 
//             result.push(nextRoom);
//     }
//   }

//   return result;
// }
///// --------------- 이 코드도 다음 빈방을 찾는 순회에서 시간복잡 -----