{
  let id = 0; //item row별 고유 id. project가 커진다면 UUID로 변경 필요

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
    newLi.setAttribute('data-id', id);

    newLi.innerHTML = `<span class="item__name">${text}</span>
                       <button class="item__delete">
                         <i class="fa-regular fa-trash-can" data-target-id=${id}></i>
                       </button>`;
    id++;
    return newLi;
  }

  //쇼핑 리스트 입력란 이벤트
  inputBox.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) onAddItemList();
  });

  //하단 추가 버튼 클릭 이벤트
  btnAdd.addEventListener('click', () => {
    onAddItemList();
  });

  //쇼핑 리스트 아이템 삭제 이벤트
  items.addEventListener('click', (event) => {
    const deletedId = event.target.dataset.targetId;
    if (deletedId) {
      const tobeDeletedItem = document.querySelector(`.item__row[data-id="${deletedId}"]`);
      tobeDeletedItem.remove();
    }
  });
}
