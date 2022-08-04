{
  const items = document.querySelector('.items');
  const inputBox = document.querySelector('.footer__input');
  const btnAdd = document.querySelector('.footer__btn');

  //쇼핑 리스트를 추가하는 함수
  function onAddItemList() {
    const text = inputBox.value;
    if (text.trim().length === 0) return;

    const item = createItemRow(text);
    items.appendChild(item);
    item.scrollIntoView({ block: 'center' });
    inputBox.value = '';
    inputBox.focus();
  }

  //item row 생성하는 함수
  function createItemRow(text) {
    //item row
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'item__row');

    //입력 텍스트
    const newSpan = document.createElement('span');
    const newText = document.createTextNode(`${text}`);
    newSpan.appendChild(newText);
    newSpan.setAttribute('class', 'item__name');
    newLi.appendChild(newSpan);

    //삭제 버튼
    const newBtn = document.createElement('button');
    newBtn.setAttribute('class', 'item__delete');
    newBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    newLi.appendChild(newBtn);

    return newLi;
  }

  //쇼핑 리스트 입력란 이벤트
  inputBox.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      onAddItemList();
    }
  });

  //하단 추가 버튼 클릭 이벤트
  btnAdd.addEventListener('click', () => {
    onAddItemList();
  });

  //쇼핑 리스트 아이템 삭제 이벤트
  items.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'I') items.removeChild(event.target.parentNode.parentNode);
    if (target.tagName === 'BUTTON') items.removeChild(event.target.parentNode);
  });
}
