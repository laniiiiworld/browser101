'use-strict';

const popupMsg = { LOAD: 'Are you ready?', WIN: 'You won!🥳', LOSE: 'You lost.🥲', PAUSE: 'Game stopped.⛔️' };

export default class PopUp {
  constructor() {
    this.popupBackground = document.querySelector('.popup__background');
    this.popup = document.querySelector('.popup');
    this.popup__message = document.querySelector('.popup__message');
    this.btnPlay = document.querySelector('.btn__play i');
    this.btnPlay.addEventListener('click', () => {
      this.onClick && this.onClick();
    });
  }
  setClickEventListener(onClick) {
    this.onClick = onClick;
  }
  showWithText(msgKey) {
    if (msgKey === 'WIN' || msgKey === 'LOSE') {
      this.btnPlay.classList.remove('.fa-play');
      this.btnPlay.classList.add('.fa-reply');
    } else {
      this.btnPlay.classList.remove('.fa-reply');
      this.btnPlay.classList.add('.fa-play');
    }
    this.popup__message.innerText = popupMsg[`${msgKey}`];
    this.popupBackground.classList.remove('hide');
  }
  hide() {
    this.popupBackground.classList.add('hide');
  }
}
