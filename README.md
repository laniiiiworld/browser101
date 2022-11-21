# browser101

드림코딩 아카데미 강의노트 정리 공간 (브라우저, Web APIs, DOM, 이벤트, Event Loop 등)

### 실전 프로젝트 & 중요 개념

- 좌표 007 : https://github.com/laniiiiworld/browser101/tree/main/1-webAPIs-practise-007
  - 관련 내용 : Web APIs, 브라우저 좌표, 브라우저 렌더링
- 토끼를 찾아라 : https://github.com/laniiiiworld/browser101/tree/main/1-webAPIs-practise-rabbits
  - 관련 내용 : Web APIs, 윈도우 스크롤링
- 쇼핑 목록앱 : https://github.com/laniiiiworld/browser101/tree/main/2-dom-practise-todo-list
  - 관련 내용 : DOM, 이벤트, 이벤트 Bubbling & capturing, 이벤트 위임, Keyup과 keydown, Web Form
- 게임 만들기(당근을 찾아라) : https://github.com/laniiiiworld/browser101/tree/main/3-event-practise-carrot
  - 관련 내용 : 리팩토링, 모듈화, 빌더 패턴, 자바스크립트로 타입 보장 하는법
- Event Loop : https://github.com/laniiiiworld/browser101/tree/main/4-eventLoop
  - 프로세스와 쓰레드
  - 자바스크립트 런타임 환경
    - MultiThreading처럼 구현이 가능한 이유
    - 자바스크립트 엔진, Memory Heap, Call Stack
  - 브라우저 런타임 환경
    - Render(RAF,Render Tree, Layout, Paint)
    - Microtask queue와 Task queue
    - 브라우저가 죽는 경우 VS 죽지 않는 경우(while, setTimeout, Promise)

### 새롭게 알게 된 내용

- Event Loop

  - Event Loop에 기반하여 Call Stack, Render, MicroTask Queue, Task Queue 등을 순회하며 이벤트가 처리되는 방식
  - 무한루프처럼 보여도 setTimeout()의 콜백은 화면이 멈추지 않는 이유
  - 개발자도구에서 Scope와 Call Stack을 보는 방법

- 중요 렌더링 경로 (Critical Rendering Path)

  - 개발자도구 Layers 탭과 Perfomance 탭 사용법
  - layout부터 다시 그려지는 CSS 속성을 고려해야 하는 이유
  - [CSS Triggers](https://www.lmame-geek.com/css-triggers/)

- 리팩토링

  - 코드의 재사용성을 고려한 모듈화
  - 빌더 패턴의 사용법

### 수강한 강의

- 드림코딩 아카데미 : https://academy.dream-coding.com/courses/browser101
