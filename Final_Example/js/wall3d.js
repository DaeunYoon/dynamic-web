(function () {
  const stageElem = document.querySelector(".stage");
  const probarElem = document.querySelector(".progress-bar");
  const houseElem = document.querySelector(".house");
  const mousePos = { x: 0, y: 0 };
  const selectCharElem = document.querySelector(".select-character");

  let maxScrollHeight = 0;

  function resizeHandler() {
    maxScrollHeight = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    const scrollPer = window.pageYOffset / maxScrollHeight;
    const zMove = scrollPer * 975 - 490;
    houseElem.style.transform = "translateZ(" + zMove + "vw)";
    probarElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform =
      "rotateX(" + mousePos.y * 5 + "deg) rotateY(" + mousePos.x * 5 + "deg)";
  });

  stageElem.addEventListener("click", function (e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      /* 최소 speed: 0.2, 속도 차이 너무 많이 나지 않도록 0.5 곱해줌 */
      speed: Math.random() * 0.5 + 0.2,
    });
  });

  selectCharElem.addEventListener("click", function (e) {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  /* resize 핸들러 안 넣으면 실행 중 화면 크기가 변했을 때, 끝까지 스크롤 되지 않는 문제 발생 
  Javascript가 쎄게 들어가는 코드의 경우 resize핸들러 꼭 체크하기!  */
  window.addEventListener("resize", resizeHandler);

  resizeHandler();
})();
