const { AES_CTR } = require("./lib/AES.js/lib/aes_ctr");
const { AES_GCM_SHA256 } = require("./lib/AES.js/lib/aes_gcm_sha256");
const { solvePuzzle, generatePuzzles } = require("./lib/puzzles");

// Alice
// Generates puzzles
const puzzles = generatePuzzles({ encrypt: AES_CTR.encrypt, puzzleSize: 2 });

/**
 *
 * Sends puzzles to Bob
 *  |
 *  |
 *  |
 * \/
 * Bob
 */

// Bob
// Picks a random puzzle
const randomPuzzle = puzzles.arr[Math.floor(Math.random() * puzzles.arr.length)];

// Solves the picked puzzle
const solvedPuzzle = solvePuzzle({ decrypt: AES_CTR.decrypt, puzzle: randomPuzzle });

// Keeps the key
const { key: bobsKey } = solvedPuzzle;

/**
 *
 * Sends puzzle number to Alice
 *  |
 *  |
 *  |
 * \/
 * Alice
 */

// Alice
// Gets the secret key from the puzzles database

const { hash } = puzzles;

const alicesKey = hash[solvedPuzzle.number];

// Now they can use this key to exchange messages
