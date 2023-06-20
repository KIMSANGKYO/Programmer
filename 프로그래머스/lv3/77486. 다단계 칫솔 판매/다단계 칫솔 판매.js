function solution(enroll, referral, seller, amount) {
    // 자신이 판것의 90% 와 각 추천인들이 판것들의 10%
    
    // 칫솔은 100원
    
    // 인덱스가 같은 짝 
    // enroll <=> referral 
    // seller <=> amount 
    
    // referral 에 맞춰 구조를 만들어야함
    // referral 에서 seller 의 상위를 찾은뒤 그상위의 상위를 계속 찾아야함 '-'를 만날때멈추자 
    
  const profit = new Array(enroll.length).fill(0); // 판매원의 이익을 저장할 배열
  const referralMap = {}; // 판매원 이름과 인덱스를 매핑하는 객체
  
  // referralMap 생성
  for (let i = 0; i < enroll.length; i++) {
    referralMap[enroll[i]] = i;
  }

  // 판매원의 추천인을 찾는 함수
  function findReferralIndex(name) {
    const index = referralMap[name];
    if (referral[index] === "-") {
      return null; // 추천인이 없는 경우
    } else {
      return referralMap[referral[index]];
    }
  }
  
  // 판매원들의 이익 계산
  for (let i = 0; i < seller.length; i++) {
    let sellerIndex = referralMap[seller[i]];
    let totalAmount = amount[i] * 100; // 총 이익 금액
    
    while (sellerIndex !== null && totalAmount > 0) {
      const referralIndex = findReferralIndex(enroll[sellerIndex]);
      const referralProfit = Math.floor(totalAmount * 0.1); // 추천인에게 배분될 이익
      
      profit[sellerIndex] += (totalAmount - referralProfit);
      
      sellerIndex = referralIndex;
      totalAmount = referralProfit;
    }
  }
  
  return profit;
}
