'use-strict';

import GameField from './gameField.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDurationSec, carrotCnt, bugCnt) {
    this.gameDurationSec = gameDurationSec;
    this.carrotCnt = carrotCnt;
    this.bugCnt = bugCnt;

    this.btnStop = document.querySelector('.btn__stop i');
    this.btnStop.addEventListener('click', () => {
      this.stop('PAUSE');
    });
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameField = new GameField();
    this.gameField.setClickEventListener(this.onItemClick);
    this.showedPopup = true; //팝업이 떠있는지 여부
    this.isPaused = false; //중지버튼 클릭여부
    this.timer; //타이머
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  //게임 시작 준비
  init(msgKey) {
    if (msgKey === 'LOAD') {
      this.showedPopup = true;
    } else {
      this.gameField.drawCarrotAndBug(this.carrotCnt, this.bugCnt);
    }
    this.setTimer(this.gameDurationSec);
    this.gameScore.innerText = this.carrotCnt;
  }
  //게임 시작
  start(currentTime) {
    sound.playAlert();
    this.showedPopup = false;
    this.startTimer();
    sound.playBackground(currentTime);
  }
  //게임 멈춤
  stop(msgKey) {
    if (msgKey === 'PAUSE') {
      this.isPaused = true;
      sound.playAlert();
    } else if (msgKey === 'LOSE') {
      sound.playBug();
    } else if (msgKey === 'WIN') {
      sound.playWin();
    }
    sound.stopBackground();

    this.stopTimer(this.timer);
    this.onGameStop && this.onGameStop(msgKey);
    this.showedPopup = true;
  }

  //timer 값을 변경하는 함수
  setTimer(time) {
    const mm = String(Math.floor(time / 60)).padStart(2, '0');
    const ss = String(time % 60).padStart(2, '0');
    this.gameTimer.innerText = `${mm}:${ss}`;
  }
  //timer 시작 함수
  startTimer() {
    this.isPaused = false;
    let time = this.gameTimer.innerText.split(':');
    time = Number(time[0]) * 60 + Number(time[1]);

    this.timer = setInterval(() => {
      time--;
      this.setTimer(time);
      if (time < 1) {
        this.stop('LOSE');
      }
    }, 1000);
  }
  //timer를 멈추는 함수
  stopTimer(timer) {
    clearInterval(timer);
  }
  //당근, 벌레 클릭 이벤트
  onItemClick = (event) => {
    if (this.showedPopup) return;

    const targetId = event.target.dataset.id;

    if (targetId === 'carrot') {
      sound.playCarrot();
      event.target.remove();
      this.gameScore.innerText = Number(this.gameScore.textContent) - 1;
      if (Number(this.gameScore.textContent) === 0) this.stop('WIN');
    } else if (targetId === 'bug') {
      event.target.remove();
      this.stop('LOSE');
    }
  };
}
