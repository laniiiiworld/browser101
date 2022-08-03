{
  const icon = document.querySelector('.icon');
  const lineX = document.querySelector('.lineX');
  const lineY = document.querySelector('.lineY');
  const coordinates = document.querySelector('.coordinates');

  window.addEventListener('load', () => {
    const iconRect = icon.getBoundingClientRect();
    //마우스 이동시 이벤트 함수
    window.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;

      //좌표
      coordinates.style.transform = `translate(${x}px, ${y}px)`;
      coordinates.innerText = `${x}, ${y}`;
      //라인
      lineX.style.transform = `translateY(${y}px)`;
      lineY.style.transform = `translateX(${x}px)`;
      //아이콘
      icon.style.transform = `translate(${x - iconRect.width / 2}px, ${y - iconRect.height / 2}px)`;
    });
  });
}
