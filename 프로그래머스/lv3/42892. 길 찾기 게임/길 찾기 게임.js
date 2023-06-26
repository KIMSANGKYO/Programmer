function solution(nodeinfo) {
   
    function newTree(nodeinfo){
        const nodes = nodeinfo.map(([x,y],index)=>({
            index : index + 1,
            x,
            y,
            left:null,
            right:null,
        }));
        // y 좌표로 내림차순
        nodes.sort((a,b)=>b.y-a.y);
        
        const root = nodes[0];
        for(let i =1; i < nodes.length; i++){
            const currentNode = nodes[i];
            let parent = root;
            // 조건없이 반복
            while(true){
                if(currentNode.x < parent.x){
                    if(parent.left === null){
                        parent.left = currentNode;
                        break;
                    }
                    parent = parent.left;
                }else{
                    if(parent.right === null){
                        parent.right = currentNode;
                        break;
                    }
                    parent = parent.right;
                }
            }
        }
        return root;
    }
    // 노드처리전
    function prevOrder(node, result){
        if(node === null) return; 
        result.push(node.index);
        prevOrder(node.left,result);
        prevOrder(node.right,result);
    }
    // 노드처리이후
    function postOrder(node,result){
        if(node === null) return;
        postOrder(node.left, result);
        postOrder(node.right,result);
        result.push(node.index);
    }
    
    
    const root = newTree(nodeinfo);
    
    const prevOrderResult = [];
    prevOrder(root,prevOrderResult);
    
    const postOrderResult = [];
    postOrder(root,postOrderResult);
    
    return [prevOrderResult, postOrderResult];
}