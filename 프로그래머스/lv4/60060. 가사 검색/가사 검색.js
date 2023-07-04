class Node {
  constructor(key) {
    this.key = key;
    this.count = 0;  // 자식노드 개수
    this.children = {};
  }
}

// 트라이객체 생성
class Trie {
  constructor() {
    this.root = new Node("");
  }

  insert(word) {
    let currentNode = this.root;

    for (const char of word) {
      const str = char.toString();
      currentNode.count++;
      if (!currentNode.children[str]) {
        currentNode.children[str] = new Node(str);
      }

      currentNode = currentNode.children[str];
    }
  }

  search(query) {
    let currentNode = this.root;
    for (const char of query) {
      const str = char.toString();
      if (str === "?") {
        return currentNode.count;
      }

      if (!currentNode.children[str]) {
        return 0; 
      }

      currentNode = currentNode.children[str];
    }

    return currentNode.count;
  }
}

function solution(words, queries) {
  const result = [];

  const tries = {}; // 다른길이 단어 저장 객체
  const reversedTries = {}; // 다른단어들을 뒤집은 배열 저장

  // 각 쿼리 탐색  
  for (const word of words) {
    if (!tries[word.length]) {
      tries[word.length] = new Trie();
      reversedTries[word.length] = new Trie();
    }

    tries[word.length].insert(word);
    reversedTries[word.length].insert(word.split("").reverse().join(""));
  }

  for (const query of queries) {
    let count = 0;
    if (query.startsWith("?")) {
      const reversedTrie = reversedTries[query.length];
      if (reversedTrie) {
        const reversedQuery = query.split("").reverse().join("");
        count = reversedTrie.search(reversedQuery);
      }
    } else {
      const trie = tries[query.length];
      if (trie) {
        count = trie.search(query);
      }
    }
    result.push(count);
  }

  return result;
}

/// 첫번째시도 , 정확도 100 , 효율성 2,3 실패

// function solution(words, queries) {
//     // 단어 저장객체 
//     const wordMap = {};
//     const result = [];
    
//     // 객체 생성 단어 길이 : 단어배열
    
//     for(let i=0; i<words.length; i++){
//         const word = words[i];
//         const len = word.length;
        
//         if(!wordMap[len]){
//             wordMap[len] = [];
//         }
        
//         wordMap[len].push(word);
//     }
//     // 요소하나씩 처리 
//     for(let i=0; i<queries.length; i++){
//         const query = queries[i];
//         const len = query.length;
        
//         if(!wordMap[len]){
//             // 맞는 길이 단어가 없을때 0을 추가 
//             result.push(0);
//             continue;
//         }
        
//         let count = 0;
//         const regex = new RegExp('^' +query.replace(/\?/g,'.')+'$');
        
//         // 일치 단어 가사 찾아 개수 저장 
//         const matchedWords = wordMap[len];
        
//         for(let j=0; j<matchedWords.length; j++){
//             if(regex.test(matchedWords[j])){
//                 count++;
//             }
//         }
//         result.push(count);
//     }
//     return result;
// }
