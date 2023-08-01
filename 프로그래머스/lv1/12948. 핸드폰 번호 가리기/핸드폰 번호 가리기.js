function solution(phone_number) {
  const length = phone_number.length;
  const hiddenDigits = phone_number.slice(0, length - 4).replace(/\d/g, '*');
  const lastDigits = phone_number.slice(length - 4);
  return hiddenDigits + lastDigits;
}