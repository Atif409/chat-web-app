// Generates a random emoji from a specific Unicode range (smileys)
export const getRandomEmoji = () => {
  const emojiRange = [0x1F600, 0x1F64F]; // Unicode range for smileys
  const randomCode = Math.floor(Math.random() * (emojiRange[1] - emojiRange[0])) + emojiRange[0];
  return String.fromCodePoint(randomCode); // Convert to emoji character
};

// Converts the emoji to a base64 image using canvas
export const emojiToImage = (emoji, size = 72) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.font = `${size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2);


  return canvas.toDataURL();
};
