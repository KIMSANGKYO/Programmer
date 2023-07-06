function solution(word, pages) {
    const totalScore = []; // 총 점수
    const basicScore = {}; // 기본 점수 
    const exCount = {}; // 외부링크 수 
    const toLink = {}; // 웹페이지 연결링크 
    
    // 각 웹페이지 기본점수,외부링크수,링크연결 계산
    for(const page of pages){
        // 정규식으로 url 추출
        const title = page.match(/<meta property="og:url" content="(https:\/\/\S+)"/)[1];
        basicScore[title] = 0;
        exCount[title] = 0;
        
        // 검색어와 일치 단어 찾기 점수 
        const matchWord = page.match(/[a-zA-Z]+/g);
        if(matchWord){
            // 일치 단어 순회 대소문자처리
            for(const mWord of matchWord){
                if(mWord.toUpperCase() === word.toUpperCase()){
                    basicScore[title] += 1;
                }
            }
        }
        
        // 외부링크를 찾고 외부 링크 수, 링크 연결 정보
        const links = page.match(/<a href="(https:\/\/\S+)"/g);
        
        if(links){
            for(const link of links){
                const url = link.match(/<a href="(https:\/\/\S+)"/)[1];
                exCount[title] += 1;
                
                if(url in toLink){
                    //url, 제목 추가
                    toLink[url].push(title);
                }else{
                    // 새로운 url 일떄
                    toLink[url] = [title];
                }
            }
        }
    }
    
    // 링크점수 총 점수 계산
    for(const current in basicScore){
        let linkScore = 0;
        
        if(current in toLink){
            for(const l of toLink[current]){
                // 기본점수 반영 링크점수계산
                linkScore += basicScore[l] / exCount[l];
            }
        }
        
        totalScore.push(basicScore[current] + linkScore); // 매칭점수 (기본점수+링크점수)
    }
    return totalScore.indexOf(Math.max(...totalScore)); // 가장 높은 점수를 인덱스로 전환
}