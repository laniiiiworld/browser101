{
  let nIntervId;
  let isStopped = false;
  const popupMsg = { INIT: 'Are you ready?', WIN: 'You win!🥳', LOSE: 'You lose.🥲', PAUSE: 'Game stopped.⛔️' };
  const btnStop = document.querySelector('.btn__stop i');
  const btnReplay = document.querySelector('.btn__replay i');
  const btnPlay = document.querySelector('.btn__play i');
  const gameTimer = document.querySelector('.game__timer');
  const gameScore = document.querySelector('.game__score');
  const gameField = document.querySelector('.game__field');
  const popupBackground = document.querySelector('.popup__background');
  const popup = document.querySelector('.popup');
  const popup__message = document.querySelector('.popup__message');

  /***********************************************
   * 초기설정
   ***********************************************/
  //시작, replay버튼 클릭시 옵션 초기화
  function fnInitOption() {
    const carrotCnt = 15;
    const bugCnt = 10;
    fnDisplayRandomeCarrotAndBug(carrotCnt, bugCnt);
    fnSetTimer(30);
    gameScore.innerText = carrotCnt;
  }

  /***********************************************
   * 당근과 벌레 그리기
   ***********************************************/
  //당근과 벌레 랜덤으로 화면에 display
  function fnDisplayRandomeCarrotAndBug(carrotCnt, bugCnt) {
    let gameFieldHtml = '';
    const rect = gameField.getBoundingClientRect();
    while (carrotCnt > 0) {
      const x = getRandomIntInclusive(rect.top, rect.bottom);
      const y = getRandomIntInclusive(rect.left, rect.right);
      gameFieldHtml += `<img src="img/carrot.png" alt="당근" data-id='carrot' class='game__field__img' style='top:${x}px;left:${y}px;' />`;
      carrotCnt--;
    }
    while (bugCnt > 0) {
      const x = getRandomIntInclusive(rect.top, rect.bottom);
      const y = getRandomIntInclusive(rect.left, rect.right);
      gameFieldHtml += `<img src="img/bug.png" alt="벌레" data-id='bug' class='game__field__img' style='top:${x}px;left:${y}px;' />`;
      bugCnt--;
    }
    gameField.innerHTML = gameFieldHtml;
  }
  //주어진 두 값 사이의 난수를 생성
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) - 80;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    isStopped = false;
    let time = gameTimer.innerText.split(':');
    time = Number(time[0]) * 60 + Number(time[1]);

    nIntervId = setInterval(() => {
      time--;
      fnSetTimer(time);
      if (time < 1) fnStopTimer(nIntervId, 'LOSE');
    }, 1000);
  }
  //timer를 멈추는 함수
  function fnStopTimer(nIntervId, msgKey) {
    clearInterval(nIntervId);
    fnShowPopup(msgKey);
  }
  /***********************************************
   * 팝업
   ***********************************************/

  //popup을 보여주는 함수
  function fnShowPopup(msgKey) {
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
   * 이벤트
   ***********************************************/
  //당근, 벌레 클릭 이벤트
  gameField.addEventListener('click', (event) => {
    const targetId = event.target.dataset.id;
    if (targetId === 'carrot') {
      event.target.remove();
      gameScore.innerText = Number(gameScore.textContent) - 1;
      if (Number(gameScore.textContent) === 0) fnStopTimer(nIntervId, 'WIN');
    } else if (targetId === 'bug') {
      event.target.remove();
      fnStopTimer(nIntervId, 'LOSE');
    }
  });
  //멈춤 버튼 클릭 이벤트
  btnStop.addEventListener('click', () => {
    isStopped = true;
    fnStopTimer(nIntervId, 'PAUSE');
  });
  //시작 버튼 클릭 이벤트
  btnPlay.addEventListener('click', () => {
    if (!isStopped) fnInitOption();
    popupBackground.classList.add('hide');
    fnStartTimer();
  });
  //replay 버튼 클릭 이벤트
  btnReplay.addEventListener('click', () => {
    fnInitOption();
    popupBackground.classList.add('hide');
    fnStartTimer();
  });
  //load Event
  window.addEventListener('load', () => {
    fnSetTimer(30);
    gameScore.innerText = 10;
    fnShowPopup('INIT');
  });
}
