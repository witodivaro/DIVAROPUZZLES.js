function increaseHex(hex) {
  let toAdd = 1;

  const hexBlocks = hex.match(/.{1,2}/g);
  const increasedBlocks = [];

  for (let i = hexBlocks.length - 1; i >= 0; i--) {
    const currentBlock = hexBlocks[i];

    const currentBlockInteger = parseInt(currentBlock, 16);
    const increasedBlock = currentBlockInteger + toAdd;

    if (increasedBlock > 255) {
      toAdd = toAdd - 255 + currentBlockInteger;
    } else {
      toAdd = 0;
    }

    const increasedBlockHex = increasedBlock.toString(16).padStart(2, "0");
    const twoHexChars = increasedBlockHex.substr(-2);
    increasedBlocks.push(twoHexChars);
  }

  if (toAdd) {
    increasedBlocks.push(toAdd.toString(16).padStart(2, "0"));
  }

  return increasedBlocks.reverse().join("");
}

module.exports = {
  increaseHex,
};
