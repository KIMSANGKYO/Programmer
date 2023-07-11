const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const str = input[1].trim();
const Len = str.length;
let pexp;
const MOD = 10007;
const p = 29;
const hashTable = new Array(MOD).fill().map(() => []);

function pre() {
  pexp = [1];
  for (let i = 1; i <= 200000; i++) {
    pexp[i] = (pexp[i - 1] * p) % MOD;
  }
  return pexp;
}

function solve() {
  let l = 0,
    r = Len;
  while (l < r) {
    const m = Math.floor((l + r + 1) / 2);
    if (isRepeatIn(m)) {
      l = m;
    } else {
      r = m - 1;
    }
  }
  console.log(l);
}

function hashClear() {
  for (let i = 0; i < MOD; i++) {
    hashTable[i] = [];
  }
}

function matchWord(s1, s2, L) {
  for (let i = 0; i < L; i++) {
    if (str[s1 + i] !== str[s2 + i]) {
      return false;
    }
  }
  return true;
}

function isRepeatIn(L) {
  hashClear();
  let hash = 0;
  for (let i = 0; i < L; i++) {
    hash *= p;
    hash += str.charCodeAt(i) - "a".charCodeAt(0);
    hash %= MOD;
  }
  hashTable[hash].push(0);
  for (let i = L; i < Len; i++) {
    hash -= ((str.charCodeAt(i - L) - "a".charCodeAt(0)) * pexp[L - 1]) % MOD;
    hash = (hash + MOD) % MOD;
    hash *= p;
    hash += str.charCodeAt(i) - "a".charCodeAt(0);
    hash %= MOD;
    if (hashTable[hash].length) {
      for (let idx of hashTable[hash]) {
        if (matchWord(idx, i - L + 1, L)) return true;
      }
    }
    hashTable[hash].push(i - L + 1);
  }
  return false;
}

function main() {
  const pexp = pre();
  solve();
}

main();