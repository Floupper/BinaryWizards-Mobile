export const timerModes = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  NONE: 'none',
};

export const getModeFromTimer = (timer) => {
  switch (timer) {
    case 30:
      return timerModes.EASY;
    case 15:
      return timerModes.MEDIUM;
    case 5:
      return timerModes.HARD;
    default:
      return timerModes.NONE;
  }
};
