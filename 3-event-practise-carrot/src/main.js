'use-strict';

import GameBuilder from './game.js';
import { PopUp, Reason } from './popup.js';

const game = new GameBuilder() //
  .withGameDuration(30)
  .withCarrotCount(15)
  .withBugCount(10)
  .build();
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
  game.init(Reason.LOAD);
  gameStopBanner.showWithText(Reason.LOAD);
});
