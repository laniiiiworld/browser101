'use-strict';

const CARROT_BUG_SIZE = 80; //당근과 벌레 이미지 사이즈(px)

export default class GameField {
  constructor() {
    this.gameField = document.querySelector('.game__field');
    this.gameField.addEventListener('click', (event) => {
      this.onClick && this.onClick(event);
    });
  }

  setClickEventListener(onClick) {
    this.onClick = onClick;
  }

  //게임 필드에 당근과 벌레 그리기
  drawCarrotAndBug(carrotCnt, bugCnt) {
    let gameFieldHtml = '';
    gameFieldHtml += this._makeItem('carrot', carrotCnt, 'img/carrot.png');
    gameFieldHtml += this._makeItem('bug', bugCnt, 'img/bug.png');
    this.gameField.innerHTML = gameFieldHtml;
  }

  //아이템(당근과 벌레) 만들기
  _makeItem(dataId, count, imgPath) {
    let html = '';
    const rect = this.gameField.getBoundingClientRect();
    while (count > 0) {
      const x = getRandomIntInclusive(0, rect.width);
      const y = getRandomIntInclusive(0, rect.height);
      const itemStyle = `top:${y}px;left:${x}px;`;
      html += `<img src="${imgPath}" alt="${dataId}" data-id='${dataId}' class='game__field__img' style='${itemStyle}' />`;
      count--;
    }
    return html;
  }
}

//주어진 두 값 사이의 난수를 생성
function getRandomIntInclusive(min, max) {
  max = max - CARROT_BUG_SIZE;
  return Math.random() * (max - min) + min;
}
