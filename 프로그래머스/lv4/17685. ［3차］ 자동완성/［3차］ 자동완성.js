function solution(words) {
    // 노드 생성 
    function createNode(){
        return{
            children : {},
            count : 0,
        }
    }
    
    // 단어를 트리에 넣기
    function insert(root,word){
        let curNode = root; // 현재노드에 할당
        
        for(let i=0; i<word.length; i++){
            const char = word[i];
            if(!curNode.children[char]){
                curNode.children[char] = createNode();
            }
            curNode = curNode.children[char];
            curNode.count++;
        }
    }
    
    // 입력할 총 문자 수 계산
    function getTotalCount(root,word){
        let curNode = root;
        let count = 0;
        
        for(let i=0; i<word.length; i++){
            const char = word[i];
            curNode = curNode.children[char];
            count++;
            // 현재 노드 단어 개수가 1일때
            if(curNode.count === 1){
                break;
            }
        }
        return count;
    }
    const root = createNode(); // 루트노드생성
    
    // 단어들을 트리에 넣기
    for(let i=0; i<words.length; i++){
        insert(root,words[i]);
    }
    
    let totalCount = 0;
    
    // 단어별로 입력할 총 문자 수 중첩
    for(let i=0; i<words.length; i++){
        totalCount += getTotalCount(root,words[i]);
    }
    
    return totalCount;
}