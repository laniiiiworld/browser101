{
  const icon = document.querySelector('.icon');
  const lineX = document.querySelector('.lineX');
  const lineY = document.querySelector('.lineY');
  const coordinates = document.querySelector('.coordinates');

  //마우스 이동시 이벤트 함수
  function mousemove(event) {
    const x = event.clientX;
    const y = event.clientY;

    //좌표
    coordinates.style.left = `${x}px`;
    coordinates.style.top = `${y}px`;
    coordinates.innerText = `${x}, ${y}`;
    //라인
    lineX.style.top = `${y}px`;
    lineY.style.left = `${x}px`;
    //아이콘
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
  }

  window.addEventListener('mousemove', mousemove);
  //window.addEventListener('load', () => {});
}
