'use-strict';

import Game from './game.js';
import PopUp from './popup.js';

const GAME_DURATION_SEC = 30; //타이머 제한 시간(초)
const CARROT_CNT = 15;
const BUG_CNT = 10;

const game = new Game(GAME_DURATION_SEC, CARROT_CNT, BUG_CNT);
const gameStopBanner = new PopUp();
/***********************************************
 * 이벤트
 ***********************************************/
//게임이 멈춰지는 경우 팝업 띄우기
game.setGameStopListener((msgKey) => {
  gameStopBanner.showWithText(msgKey);
});

//시작 버튼 클릭 이벤트
gameStopBanner.setClickEventListener(() => {
  if (!game.isPaused) {
    game.init();
    game.start();
  } else {
    game.start('NONE');
  }
  gameStopBanner.hide();
});

//load Event
window.addEventListener('load', () => {
  game.init('LOAD');
  gameStopBanner.showWithText('LOAD');
});
