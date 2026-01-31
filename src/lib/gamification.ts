export const getLevelProgress = (exp: number) => {
  // Array threshold sesuai brief IT Consultant
  const thresholds = [0, 200, 500, 900, 1500, 2300, 3500];
  
  let currentLevel = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (exp >= thresholds[i]) {
      currentLevel = i + 1;
    } else {
      break;
    }
  }
  
  const nextExp = thresholds[currentLevel] || 999999; // Cap level max
  return { currentLevel, nextExp };
};