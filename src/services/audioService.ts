export const play = (url: string) => {
  new Audio(url).play();
};

export const sounds = {
  blob: () => play('/sounds/blob.mp3'),
  error: () => play('/sounds/error.mp3'),
  success: () => play('/sounds/success.mp3'),
};
