const { utils } = require("./AES.js");
const { generateRandomHex } = require("./AES.js/lib/random.js");
const { increaseHex } = require("./helpers.js");

function generatePuzzleKey(bytesCount) {
  const last4bytesOfKey = utils.generateRandomHex(bytesCount);
  const key = last4bytesOfKey.padStart(32, "0");

  return key;
}

function generatePuzzle({ encrypt, message, keySize = 4 }) {
  const key = generatePuzzleKey(keySize);

  const cipherText = encrypt(key, message);

  return cipherText;
}

function generatePuzzles({ encrypt, puzzleSize = 4 }) {
  const hash = {};
  const arr = [];
  let puzzlesCount = 2 ** (puzzleSize * 8);

  let secretKey = null;
  let message = null;
  let puzzle = null;

  for (let i = 0; i < puzzlesCount; i++) {
    secretKey = generateRandomHex(16);

    message = ["Puzzle #", i, secretKey].join("");
    hash[i] = secretKey;
    puzzle = generatePuzzle({ encrypt, keySize: puzzleSize, message });
    arr.push(puzzle);
  }

  return { hash, arr };
}

function solvePuzzle({ decrypt, puzzle }) {
  let iterationsCount = 0;
  let key = "0".repeat(32);
  let decrypted = null;

  while (true) {
    decrypted = decrypt(key, puzzle);

    if (decrypted.startsWith("Puzzle #")) {
      const key = decrypted.substr(-32);
      const number = decrypted.slice(8, -32);

      return { key, number };
    }

    key = increaseHex(key);
    iterationsCount++;
  }
}

module.exports = {
  generatePuzzleKey,
  generatePuzzle,
  generatePuzzles,
  solvePuzzle,
};
