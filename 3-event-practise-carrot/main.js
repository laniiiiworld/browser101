{
  ('use-strict');

  const popupMsg = { LOAD: 'Are you ready?', WIN: 'You won!🥳', LOSE: 'You lost.🥲', PAUSE: 'Game stopped.⛔️' };
  const CARROT_BUG_SIZE = 80; //당근과 벌레 이미지 사이즈(px)
  const GAME_DURATION_SEC = 30; //타이머 제한 시간(초)
  const CARROT_CNT = 15;
  const BUG_CNT = 10;

  let nIntervId; //타이머
  let showedPopup = true; //팝업이 떠있는지 여부
  let isPaused = false; //중지버튼 클릭여부

  const btnStop = document.querySelector('.btn__stop i');
  const btnReplay = document.querySelector('.btn__replay i');
  const btnPlay = document.querySelector('.btn__play i');
  const gameTimer = document.querySelector('.game__timer');
  const gameScore = document.querySelector('.game__score');
  const gameField = document.querySelector('.game__field');
  const popupBackground = document.querySelector('.popup__background');
  const popup = document.querySelector('.popup');
  const popup__message = document.querySelector('.popup__message');

  const alert_sound = new Audio('sound/alert.wav');
  const carrot_sound = new Audio('sound/carrot_pull.mp3');
  const win_sound = new Audio('sound/game_win.mp3');
  const bug_sound = new Audio('sound/bug_pull.mp3');
  const bg_sound = new Audio('sound/bg.mp3');
  bg_sound.loop = true; // 반복재생

  /***********************************************
   * 게임 초기설정, 시작, 멈춤
   ***********************************************/
  //게임 시작 준비
  function fnInitGame(msgKey) {
    if (msgKey !== 'LOAD') {
      let gameFieldHtml = '';
      gameFieldHtml += fnMakeItem('carrot', CARROT_CNT, 'img/carrot.png');
      gameFieldHtml += fnMakeItem('bug', BUG_CNT, 'img/bug.png');
      gameField.innerHTML = gameFieldHtml;
    }

    fnSetTimer(GAME_DURATION_SEC);
    gameScore.innerText = CARROT_CNT;
  }
  //게임 시작
  function fnStartGame(currentTime) {
    playSound(alert_sound);

    showedPopup = false;
    popupBackground.classList.add('hide');
    fnStartTimer();

    playSound(bg_sound, currentTime);
  }
  //게임 멈춤
  function fnStopGame(msgKey) {
    if (msgKey === 'PAUSE') {
      isPaused = true;
      playSound(alert_sound);
    } else if (msgKey === 'LOSE') {
      playSound(bug_sound);
    } else if (msgKey === 'WIN') {
      playSound(win_sound);
    }
    bg_sound.pause();

    fnStopTimer(nIntervId);
    fnShowPopup(msgKey);
  }
  /***********************************************
   * 당근과 벌레 그리기
   ***********************************************/
  //아이템(당근과 벌레) 들판에 추가하기
  function fnMakeItem(dataId, count, imgPath) {
    let html = '';
    const rect = gameField.getBoundingClientRect();
    while (count > 0) {
      const x = getRandomIntInclusive(0, rect.width);
      const y = getRandomIntInclusive(0, rect.height);
      const itemStyle = `top:${y}px;left:${x}px;`;
      html += `<img src="${imgPath}" alt="${dataId}" data-id='${dataId}' class='game__field__img' style='${itemStyle}' />`;
      count--;
    }
    return html;
  }
  //주어진 두 값 사이의 난수를 생성
  function getRandomIntInclusive(min, max) {
    max = max - CARROT_BUG_SIZE;
    return Math.random() * (max - min) + min;
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
   * 팝업
   ***********************************************/
  //popup을 보여주는 함수
  function fnShowPopup(msgKey) {
    showedPopup = true;

    if (msgKey === 'WIN' || msgKey === 'LOSE') {
      btnReplay.parentNode.classList.remove('hide');
      btnPlay.parentNode.classList.add('hide');
    } else {
      btnReplay.parentNode.classList.add('hide');
      btnPlay.parentNode.classList.remove('hide');
    }
    popup__message.innerText = popupMsg[`${msgKey}`];
    popupBackground.classList.remove('hide');
  }
  /***********************************************
   * 오디오
   ***********************************************/
  //오디오 실행
  function playSound(sound, currentTime) {
    if (!currentTime) sound.currentTime = 0;
    sound.play();
  }
  /***********************************************
   * 이벤트
   ***********************************************/
  //당근, 벌레 클릭 이벤트
  gameField.addEventListener('click', (event) => {
    if (showedPopup) return;

    const targetId = event.target.dataset.id;

    if (targetId === 'carrot') {
      playSound(carrot_sound);
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
  btnPlay.addEventListener('click', () => {
    if (!isPaused) {
      fnInitGame();
      fnStartGame();
    } else {
      fnStartGame('NONE');
    }
  });
  //replay 버튼 클릭 이벤트
  btnReplay.addEventListener('click', () => {
    fnInitGame();
    fnStartGame();
  });
  //load Event
  window.addEventListener('load', () => {
    fnInitGame('LOAD');
    fnShowPopup('LOAD');
  });
}
