export const play = (url: string) => {
  new Audio(url).play();
};

export const sounds = {
  blob: () => play('/sounds/blob.mp3'),
  error: () => play('/sounds/error.mp3'),
  success: () => play('/sounds/success.mp3'),
};

export const repeatSound = (times: number, duration: number, soundF: Function): void => {
  let playedTimes = 0;
  const interval = setInterval(() => {
    if (playedTimes < times) {
      soundF();
      playedTimes = playedTimes + 1;
    } else {
      clearInterval(interval);
    }
  }, duration);
};
