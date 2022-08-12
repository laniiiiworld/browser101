'use-strict';

const alert_sound = new Audio('sound/alert.wav');
const carrot_sound = new Audio('sound/carrot_pull.mp3');
const win_sound = new Audio('sound/game_win.mp3');
const bug_sound = new Audio('sound/bug_pull.mp3');
const bg_sound = new Audio('sound/bg.mp3');
bg_sound.loop = true; // 반복재생

export function playAlert() {
  playSound(alert_sound);
}

export function playCarrot() {
  playSound(carrot_sound);
}
export function playWin() {
  playSound(win_sound);
}
export function playBug() {
  playSound(bug_sound);
}
export function playBackground(currentTime) {
  playSound(bg_sound, currentTime);
}
export function stopBackground() {
  stopSound(bg_sound);
}

//오디오 실행
function playSound(sound, currentTime) {
  if (!currentTime) sound.currentTime = 0;
  sound.play();
}
//오디오 멈춤
function stopSound(sound) {
  sound.pause();
}
