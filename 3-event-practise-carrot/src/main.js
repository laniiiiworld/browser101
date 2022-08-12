'use-strict';

import PopUp from './popup.js';
import GameField from './gameField.js';
import * as sound from './sound.js';

const GAME_DURATION_SEC = 30; //타이머 제한 시간(초)
const CARROT_CNT = 15;
const BUG_CNT = 10;

let nIntervId; //타이머
let showedPopup = true; //팝업이 떠있는지 여부
let isPaused = false; //중지버튼 클릭여부

const btnStop = document.querySelector('.btn__stop i');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const gameStopBanner = new PopUp();
const gameField = new GameField();
/***********************************************
 * 게임 초기설정, 시작, 멈춤
 ***********************************************/
//게임 시작 준비
function fnInitGame(msgKey) {
  if (msgKey !== 'LOAD') {
    gameField.drawCarrotAndBug(CARROT_CNT, BUG_CNT);
  }
  fnSetTimer(GAME_DURATION_SEC);
  gameScore.innerText = CARROT_CNT;
}
//게임 시작
function fnStartGame(currentTime) {
  sound.playAlert();

  showedPopup = false;
  gameStopBanner.hide();
  fnStartTimer();

  sound.playBackground(currentTime);
}
//게임 멈춤
function fnStopGame(msgKey) {
  if (msgKey === 'PAUSE') {
    isPaused = true;
    sound.playAlert();
  } else if (msgKey === 'LOSE') {
    sound.playBug();
  } else if (msgKey === 'WIN') {
    sound.playWin();
  }
  sound.stopBackground();

  fnStopTimer(nIntervId);
  gameStopBanner.showWithText(msgKey);
  showedPopup = true;
}

/***********************************************
 * 타이머
 ***********************************************/
//timer 값을 변경하는 함수
function fnSetTimer(time) {
  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');
  gameTimer.innerText = `${mm}:${ss}`;
}
//timer 시작 함수
function fnStartTimer() {
  isPaused = false;
  let time = gameTimer.innerText.split(':');
  time = Number(time[0]) * 60 + Number(time[1]);

  nIntervId = setInterval(() => {
    time--;
    fnSetTimer(time);
    if (time < 1) {
      fnStopGame('LOSE');
    }
  }, 1000);
}
//timer를 멈추는 함수
function fnStopTimer(nIntervId) {
  clearInterval(nIntervId);
}
/***********************************************
 * 이벤트
 ***********************************************/
//당근, 벌레 클릭 이벤트
gameField.setClickEventListener((event) => {
  if (showedPopup) return;

  const targetId = event.target.dataset.id;

  if (targetId === 'carrot') {
    sound.playCarrot();
    event.target.remove();
    gameScore.innerText = Number(gameScore.textContent) - 1;
    if (Number(gameScore.textContent) === 0) fnStopGame('WIN');
  } else if (targetId === 'bug') {
    event.target.remove();
    fnStopGame('LOSE');
  }
});
//멈춤 버튼 클릭 이벤트
btnStop.addEventListener('click', () => {
  fnStopGame('PAUSE');
});
//시작 버튼 클릭 이벤트
gameStopBanner.setClickEventListener(() => {
  if (!isPaused) {
    fnInitGame();
    fnStartGame();
  } else {
    fnStartGame('NONE');
  }
});
//load Event
window.addEventListener('load', () => {
  fnInitGame('LOAD');
  gameStopBanner.showWithText('LOAD');
  showedPopup = true;
});